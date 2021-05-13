const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const mongoose = require('mongoose');
const PokemonModel = require('./models/Pokemon.js');

const mongoDb = 'mongodb://127.0.0.1:27017/pokemon';

const PORT = 5000;

mongoose
    .connect(mongoDb, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
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

            let cached = null;
            await PokemonModel.findOne(
                { name: pokemonName },
                function (err, pokemon) {
                    if (err || !pokemon) {
                        console.error('FIND ERR', err);
                        return;
                    }
                    cached = pokemon;
                }
            );

            if (cached) {
                res.send(cached);
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
                            pokemonId: id,
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

                        PokemonModel.create(response, function (err, _) {
                            console.error('Create error', err);
                        });

                        res.send(response);
                    })
                    .catch((err) => {
                        res.sendStatus(err.response.status);
                    });
            }
        });

        app.listen(PORT, () => {
            console.log('Server running');
        });
    });
