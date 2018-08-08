import User from '../../../schemas/genres';
import { UserType, UserInputType } from '../../types/genres';
import * as graphql from 'graphql';

export default {
    type : UserType,
    args : {
        id : {
            name : 'ID',
            type : new graphql.GraphQLNonNull(graphql.GraphQLID)
        },
        data : {
            name : 'data',
            type : new graphql.GraphQLNonNull(UserInputType)
        }
    },
    resolve(root, params) {
        return User.findByIdAndUpdate(params.id, {$set:{...params.data}})
                        .then((user) => User.findById(user.id).exec())
                        .catch((err) => new Error('Couldn\'t update User data', err))
        
    }
}