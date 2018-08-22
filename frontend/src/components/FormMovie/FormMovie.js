import React, { Component } from 'react';
import allGenres from '../../services/allGenres';
import allRatings from '../../services/allRatings';
import addMovie from '../../services/addMovie';
import Firebase from '../../Firebase';
import FileUploader from 'react-firebase-file-uploader';

class FormMovie extends Component {

    state = {
        name       : "",
        synopsis   : "",
        genre      : "",
        director   : "",
        year       : "",
        url        : "",
        image      : "",
        rating     : "",
        allGenres  : [],
        allRatings : [],
        formFull   : false
    }

    componentDidMount() {
        allGenres().then((resp) => {
            this.setState({allGenres: resp.data.data.allGenres})
        }).catch((err) => {
            console.log(err);
        })

        allRatings().then((resp) => {
            this.setState({allRatings: resp.data.data.allRatings})
        }).catch((err) => {
            console.log(err);
        })
    }

    createSelector = (data, name) => {
        let options = data.map((option) => {    
            return(
                <option key={option._id} value={option._id}>{option.name}</option>
            )
        })
        return(
            <select name={name} id={name} value={this.state[name]} onChange={this.onChangeInput} className="form-control">
                <option value="" selected> --- </option>
                {options}
            </select>
        )
    }

    onChangeInput = (e) => {
        let name = e.target.name
        let value = e.target.value
        
        this.setState({
            [name] : value
        })

        console.log(this.state);
    }

    handleSubmit = (e) => {
        e.preventDefault()
        addMovie(this.state).then((resp) => {
            console.log(resp.data.data)
            if (resp.data.data.addMovie._id) {
                console.log(resp.data.data.addMovie);


            }
        }).catch((err) => {
            console.log(err);
        })
    }

    andlerUploadSuccess = (filename) => {
        console.log(filename);
        Firebase.storage().ref('images').child(filename)
            .getDownloadURL(). then((url) => {
                console.log(url);
                this.setState({image:url})
                console.log(this.state);
            })
    }

    loadForm = () => {
        if (this.state.allGenres !== "" && this.state.allRatings !== "") {
            return(
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name: </label>
                        <input type="text" value={this.state.name}
                            className="form-control" name="name"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis: </label>
                        <input type="text" value={this.state.synopsis}
                            className="form-control" name="synopsis"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image: </label>
                        <input type="text" value={this.state.image}
                            className="form-control" name="image"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="director">Director: </label>
                        <input type="text" value={this.state.director}
                            className="form-control" name="director"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year: </label>
                        <input type="text" value={this.state.year}
                            className="form-control" name="year"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis: </label>
                        <input type="text" value={this.state.synopsis}
                            className="form-control" name="synopsis"
                            onChange={this.onChangeInput} />
                    </div>

                    <div className="form-group">
                        Add Poster
                        <FileUploader 
                            
                            accept="image/*"
                            randomizeFilename
                            storageRef={Firebase.storage().ref('images')}
                            onUploadError={error => console.log(error)}
                            unUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre: </label>
                        {this.createSelector(this.state.allGenres, "genre")}
                    </div>

                    <div className="form-group">
                        <label htmlFor="ratings">Rating: </label>
                        {this.createSelector(this.state.allRatings, "ratings")}
                    </div>

                    <button type="submit" className="btn btn--info">Save</button>
                </form>
            )
        }
    }

    render() {
        return(
            <div>
                {this.loadForm()}
            </div>
        )
    }
}

export default FormMovie;