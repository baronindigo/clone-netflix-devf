import Rating from '../../../schemas/ratings';
import { RatingType } from '../../types/rating';
import * as graphql from 'graphql';

export default {
    type : RatingType,
    args : {
        data : {
            name : 'ID',
            type : new graphql.GraphQLNonNull(graphql.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedRating = Rating.findByIdAndRemove(params.id).exec()
        if(!deletedRating) throw new Error("Error on delete Rating")
        return deletedRating
    }
}