// firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // need to fix this ↓
  databaseURL: 'game-7b666-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGEING_SENDING_ID,
  appId: process.env.REACT_APP_APP_ID,
};

export default firebaseConfig;
