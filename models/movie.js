const Joi = require('joi');
const mongoose = require('mongoose');

const Movie = mongoose.model('Movies', new mongoose.Schema({
    tmdbId:
        {
            type: Number,
            required: true,
        },
    title:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 55,
            trim: true
        },
    overview:
        {
            type: String,
            required: true,
            trim: true,
            minlength: 15
        },
    release_date: {
        type: Date,
    },
    poster_path: String
}));

function validateMovie(movie) {
    const schema = {
        tmdbId: Joi.number(),
        title: Joi.string().min(1).max(55).required(),
        overview: Joi.string().required().min(15),
        poster_path: Joi.string().max(255),
        release_date: Joi.date().required()
    };
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validateMovie;