const firebaseConfig = {
  apiKey: "AIzaSyDztkELBWdGgGICqfrzcDhXWVxMp-xNIE8",
  authDomain: "jcornersbadbank.firebaseapp.com",
  projectId: "jcornersbadbank",
  storageBucket: "jcornersbadbank.appspot.com",
  messagingSenderId: "360820026498",
  appId: "1:360820026498:web:d3a97036575f79023a589b",
  measurementId: "G-WRDS10B367"
};

try {
    firebase.initializeApp(firebaseConfig);
    console.log('It works!');
  } catch (err) {
    if (!/already exists/.test(err.message)) {
      console.error('It does not work', err.stack);
    }
  }
  
  // const fire = firebase;