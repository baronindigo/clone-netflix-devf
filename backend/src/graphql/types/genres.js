import * as graphql from 'graphql';

export const GenreType = new graphql.GraphQLObjectType({
    name : 'Genres',
    description : 'Types of Genre',
    fields : () => ({
        _id : {
            type : graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        name : {
            type : graphql.GraphQLString
        },
        description : {
            type : graphql.GraphQLString
        }
    })
})

export const GenreInputType = new graphql.GraphQLInputObjectType({
    name : 'add_genres',
    description : 'Add Genres',
    fields : () => ({
        name : {
            type : graphql.GraphQLString
        },
        description : {
            type : graphql.GraphQLString
        }
    })
})