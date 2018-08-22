import axios from 'axios';
import getToken from '../resolvers/getToken';
import constantes from '../const';

export default () => {
    return axios({
        url : constantes.local + 'graphql',
        method : 'post',
        data : {
            query : 
                `query {
                    allGenres {
                        _id,
                        name
                    }
                }`
        },
        headers : {
            "Authorization" : 'JWT ' + getToken()
        }
    })
}