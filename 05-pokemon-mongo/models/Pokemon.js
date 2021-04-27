const mongoose = require('mongoose');
const { Schema } = mongoose;

const PokemonSchema = new Schema({
    pokemonId: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
    },
    abilities: [
        {
            ability: {
                name: String,
                url: String,
            },
            is_hidden: Boolean,
            slot: Number,
        },
    ],
    height: Number,
    weight: Number,
    stats: [
        {
            name: String,
            base_stat: Number,
        },
    ],

    types: [
        {
            name: String,
            src: String,
        },
    ],
});

module.exports = mongoose.model('Pokemon', PokemonSchema);
