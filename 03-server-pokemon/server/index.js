const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.route('/get-pokemon').get(async (req, res) => {
    const pokemonName = req.query.name;

    axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res_) => {
            const { data } = res_;
            const { abilities, height, id, name, stats, types, weight } = data;
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
            res.send(response);
        })
        .catch((err) => {
            res.sendStatus(err.response.status);
        });
});

const PORT = 5000;
const server = app.listen(PORT, () => {
    console.log('Server running');
});
