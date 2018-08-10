import User from '../schemas/users';
import jwt from 'jsonwebtoken';

const prefixToken = 'JWT';
const secret = 'sample2018'; // Secret Key


export const verifyToken = (token) => {
    const [prefix, payload] = token.split(' ')

    let user = null;
    
    if (!payload) {
        throw new Error('No TOKEN provided')
    }

    if (prefix !== prefixToken) {
        throw new Error('Invalid HEADER format')
    }

    jwt.verify(payload, secret, (err, data) => {
        if (err) {
            throw new Error('invalid token')
        } else {
            user = User.findOne({'_id':data.id}).exec()
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    return rejects(err);
                })
        }
    })

    if (!user) {
        throw new Error('User doesn\'t exist in DataBase')
    }
}

/*
export const verifyToken = async(token) => {
    return new Promise((resolve, reject) => {
        const [prefix, payload] = token.split(' ');

        if (!payload) return reject('No token provided');
        if (prefix !== prefixToken) return reject('Invalid Header Format');
        
        jwt.verify(payload, secret, (err, data) => {
            if (err) {
                return reject(err);
            }

            User.findOne({'_id':data.id}).exec()
                .then(res => {
                    return resolve(res);
                })
                .catch(err => {
                    return reject(err);
                })
        })
    })
}*/