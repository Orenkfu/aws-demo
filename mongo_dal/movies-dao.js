const mongoose = require('mongoose');
const { Movie, validate } = require('../models/movie')

async function getMovies() {
    return await Movie.find().sort('release_date');

}

async function deleteMovie(id) {

    //first, find the movie by id
    const movie = await Movie.findById(id);

    if (!movie) return null;
    const result = await Movie.deleteOne({ _id: movie.id })
    //if a movie was deleted, return the deleted movie 
    if (result.ok == 1) return movie;
    else return null;

}
async function getMovie(id) {
    return await Movie.findById(id);
}
async function saveMovie(movie) {
    const newMovie = new Movie({
        tmdbId: movie.id,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path
    });

    return await newMovie.save();
}

//Couldnt get this to work *properly* in time.. a couple more days for a proper sorting and filtering system
//oh well!
async function getMoviesByProperty(sortAttribute) {
    switch (sortAttribute) {
        case 'title':
            return await Movie.find().sort({ title: 1 });
            break;
        case 'release_date':
            return await Movie.find().sort({ release_date: -1 });
        case '_id':
            return await Movie.find().sort({ _id: -1 });
        default:
            return await Movie.find().sort({ release_date: -1 });
    }
}
module.exports.getMoviesByProperty = getMoviesByProperty;
module.exports.saveMovie = saveMovie;
module.exports.getMovies = getMovies;
module.exports.getMovie = getMovie;
module.exports.deleteMovie = deleteMovie; 
