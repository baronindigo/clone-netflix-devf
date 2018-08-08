import Movie from '../../../schemas/movies';
import { MovieType } from '../../types/movies';
import * as graphql from 'graphql';

export default {
    type : MovieType,
    args : {
        data : {
            name : 'ID',
            type : new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedMovie = Movie.findByIdAndRemove(params.id).exec()
        if(!deletedMovie) throw new Error("Error on delete Movie")
        return deletedMovie
    }
}