import * as graphql from 'graphql';

import Ratngs from '../../schemas/ratings';

export const RatingType = new graphql.GraphQLObjectType({
    name : 'ratings',
    description : 'Ratings in MongoDB',
    fields : () => ({
        _id : {
            type : graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        name : {
            type : graphql.GraphQLString
        },
        description : {
            type : graphql.GraphQLString
        },
        age : {
            type : graphql.GraphQLInt
        }
    })
});

export const RatingInputType = new graphql.GraphQLInputObjectType({
    name : 'RatingInput',
    description : 'Insert Rating',
    fields : () => ({
        name : {
            type : graphql.GraphQLString
        },
        description : {
            type : graphql.GraphQLString
        },
        age : {
            type : graphql.GraphQLInt
        }
    })
})

