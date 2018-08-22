import React, { Component } from 'react';
import Rate from 'rc-rate';
import calculateRank from './calculateRank';

class CardMovie extends Component {

    state = {
        movie : this.props.movie,
        rank  : calculateRank(this.props.movie.rank),
    }

    render() {
        return(
            <div className="card">
                <h5 className="card-title" onClick={() => this.props.redirect(this.state.movie._id)}>{this.state.movie.name}</h5>
                <img src={this.state.movie.image} alt="Poster" />
                <div className="card-body">
                    {/*<p className="card-text">{this.state.movie.synopsis}</p>*/}
                    <Rate 
                        defaultValue={parseFloat(this.state.rank)} 
                        allowHalf
                        onChange={(rank) => this.props.getRank(this.state.movie._id, rank)} />
                    <p>{this.state.rank}</p>
                </div>
                
            </div>
        )
    }
}

export default CardMovie;