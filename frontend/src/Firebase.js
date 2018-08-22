import * as firebase from 'firebase';

const config = {
    apiKey            : "AIzaSyD4X1nrvqF8hrYhX7l4c4yO7kFG5v2sPKM",
    authDomain        : "clone-netflix.firebaseapp.com",
    databaseURL       : "https://clone-netflix.firebaseio.com",
    projectId         : "clone-netflix",
    storageBucket     : "clone-netflix.appspot.com",
    messagingSenderId : "256984879762"
}

export default firebase.initializeApp(config);