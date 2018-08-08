import users from './users';
import movies from './movies';
import genres from './genres';
import ratings from './ratings';

export default {
    ...users,
    ...movies,
    ...genres,
    ...ratings
}