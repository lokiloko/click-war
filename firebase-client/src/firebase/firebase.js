import Firebase from 'firebase'
var firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBidG57cB7IFf2ATR1dH-GDDlviJrD46Yk',
  authDomain: 'coba-firebase-e61de.firebaseapp.com',
  databaseURL: 'https://coba-firebase-e61de.firebaseio.com',
  projectId: 'coba-firebase-e61de',
  storageBucket: 'coba-firebase-e61de.appspot.com',
  messagingSenderId: '867369783820'
})
var db = firebaseApp.database()

export default db
