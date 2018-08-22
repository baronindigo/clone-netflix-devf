import React, { Component } from 'react';
import singleMovie from '../../services/singleMovie';
import { Link } from 'react-router-dom';
import './Movie.css';

class Movie extends Component {

    state = {
        id    : this.props.match.params.id,
        movie : '',
    }

    componentDidMount() {
        singleMovie(this.state.id).then((movie) => {
            console.log(movie.data);
            this.setState({
                movie : movie.data.data.singleMovie
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    loadMovie() {
        const {
            _id,
            name,
            image,
            synopsis,
            //director,
            //genre,
            //rating,
            year,
            //url,
            language,
            duration
        } = this.state.movie

        if ( !this.state.movie ) {
            return(
                <div><h1>Loading...</h1></div>
            )
        } else {
            return(
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={image} alt={name} />
                        </div>
                        <div className="col movie-info">
                            <h1><strong>{name}</strong>{language | {year}}</h1>
                            <span><small>Runtime: {duration}</small></span>
                            <h2>Plot: </h2>
                            <h3>{synopsis}</h3>
                        </div>
                        <div className="row justify-content-md-center">
                            <Link className="btn btn-success btn-watch" to={`/watch/${_id}`}> Watch </Link>
                            <Link className="btn btn-info btn-back" to={'/movies'}> Back </Link>
                        
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        console.log(this.props);

        return(
            <div>
                {this.loadMovie()}
            </div>
        )
    }
}

export default Movie;