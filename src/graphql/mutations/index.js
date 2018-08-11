import genres from './genres';
import movies from './movies';
import ratings from './ratings';
import users from './users';

export default {
    ...genres,
    ...movies,
    ...ratings,
    ...users
}