import React, { Component } from 'react';
import YouTube from 'react-youtube';
import { Link } from 'react-router-dom';
import watchMovie from '../../services/watch';

export default class Watch extends Component {

    state = {
        id    : this.props.match.params.id,
        youtubeID : '',
        movieData : ''
    }
    
    componentDidMount() {
        watchMovie(this.state.id).then((watchData) => {
            console.log('aqui: ' + watchData.data.data.singleMovie.url);
            this.setState({
                youtubeID : watchData.data.data.singleMovie.url,
                movieData : watchData.data.data.singleMovie
            })
        }).catch((err) => {
            console.log(err);
        })
    }

    loadMovie() {
        if (!this.state.movieData) {
            
        } else {
            let url = this.youtubeParser(this.state.movieData.url)

            const playerOptions = {
                height : '400',
                width  : '800',
                playerVars : {
                    autoplay : 1
                }
            }

            return(
                <YouTube 
                    id={this.state.youtubeID} 
                    videoId={url} 
                    opts={playerOptions} />
            )
        }
    }

    youtubeParser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);

        return (match&&match[7].length === 11) ? match[7] : false;
    }

    render(){

        return(
            <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-12">
                            You are watching: {this.state.movieData.name}
                        </div>
                        <div>
                            {this.loadMovie()}
                        </div>

                        <div className="row justify-content-md-center">
                            <Link className="btn btn-success btn-watch" to={'/home'}> Home </Link>
                            <Link className="btn btn-info btn-back" to={'/movies'}> Back </Link>
                        </div>
                    </div>
                </div>
        )
    }

}