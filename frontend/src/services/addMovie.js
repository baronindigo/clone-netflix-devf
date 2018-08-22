import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default (data) => {
    let newMovie = `{
        name     : "${data.name}}",
        synopsis : "${data.synopsis}}",
        genre    : "${data.genre}}",
        url      : "${data.url}}",
        director : "${data.director}}",
        year     : "${data.year}}",
        image    : "${data.image}}",
        rating   : "${data.rating}}",
    }`;

    return axios({
        url : constantes.local + 'graphql',
        method : 'post',
        data : {
            query : 
                `mutation {
                    addMovie(data:${newMovie}){
                        _id,
                        name,
                    }
                }`
        }, 
        headers : {
            "Authorization" : 'JWT ' + getToken()
        }
    })
}