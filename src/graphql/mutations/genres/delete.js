import Genre from '../../../schemas/genres';
import { GenreType } from '../../types/genres';
import * as graphql from 'graphql';

export default {
    type : GenreType,
    args : {
        data : {
            name : 'ID',
            type : new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedGenre = Genre.findByIdAndRemove(params.id).exec()
        if(!deletedGenre) throw new Error("Error on delete")
        return deletedGenre
    }
}