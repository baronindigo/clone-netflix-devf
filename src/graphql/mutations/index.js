import genres from './genres';
import movies from './movies';
import ratings from './genres';
import users from './users';

export default {
    ...genres,
    ...movies,
    ...ratings,
    ...users
}