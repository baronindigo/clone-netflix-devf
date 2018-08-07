import User from '../schemas/users';
import jwt from 'jsonwebtoken';
import { resolve } from 'url';

const prefixToken = 'JWT';
const secret = 'sample2018'; // Secret Key

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
}