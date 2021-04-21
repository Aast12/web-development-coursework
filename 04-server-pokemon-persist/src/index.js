const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/queryForm', express.static('public'));
app.use(cors());

const cache = new Map();

app.route('/recent').get((req, res) => {
    const limit = req.query?.limit ?? 5;

    res.send({
        pokemon: Array.from(cache.keys()).slice(-limit),
    });
});

app.route('/get-pokemon').get(async (req, res) => {
    const pokemonName = req.query.name;

    if (cache.has(pokemonName)) {
        res.send(cache.get(pokemonName));
    } else {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((res_) => {
                const { data } = res_;
                const {
                    abilities,
                    height,
                    id,
                    name,
                    stats,
                    types,
                    weight,
                } = data;
                const response = {
                    id,
                    name,
                    abilities,
                    height,
                    weight,
                    stats: stats.map((st) => ({
                        name: st.stat.name,
                        base_stat: st.base_stat,
                    })),
                    types: types.map((t) => ({
                        name: t.type.name,
                        src: `https://veekun.com/dex/media/types/en/${t.type.name}.png`,
                    })),
                };
                cache.set(pokemonName, response);

                res.send(response);
            })
            .catch((err) => {
                res.sendStatus(err.response.status);
            });
    }
});

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log('Server running');
});
