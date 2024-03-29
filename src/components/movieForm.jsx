import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import Input from './common/input';
import { getMovie, saveMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Select from './common/selecte';

// const MovieFrom = ({ match, history }) => {
//     return (
//         <div>
//             <h1>MovieFrom {match.params.id}</h1>
//             <button className="bt btn-primary" onClick={() => history.push('/movies')}>Save</button>
//         </div >
//     );

// };

// export default MovieFrom;

class MovieForm extends Form {
    state = {
        data: {
            title: '',
            genreId: '',
            numberInStock: '',
            dailyRentalRate: ''
        },
        genres: [],
        errors: {}
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label("Title"),
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    };

    componentDidMount() {
        const genres = getGenres();
        this.setState({ genres });

        const movieId = this.props.match.params.id;
        if (movieId === 'new') return;

        const movies = getMovie(movieId);
        if (!movies) return this.props.history.replace("/not-found")

        this.setState({ data: this.mapToViewModel(movies) });

    }

    mapToViewModel(movie) {
        return {
            _id: movie.id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    }

    doSubmit = () => {
        saveMovie(this.state.data);

        this.props.history.push("/movies");
    };


    render() {
        return (
            <div>
                <h1>Movie Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInputs('title', 'Title')}
                    {this.renderSelect("genreId", "Genre", this.state.genres)}
                    {this.renderInputs('numberInStock', 'Number in Stock', 'number')}
                    {this.renderInputs('dailyRentalRate', 'Rate')}
                    {this.renderButton("Save")}
                </form>
            </div>
        );
    }
}

export default MovieForm;