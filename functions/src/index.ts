import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const fcmSend = functions.database.ref('/messages/{userId}/{messageId}').onCreate((snapshot, context) => {
  const message = snapshot.val();
  const userId  = context.params.userId;

  const payload = {
    notification: {
      title: message.title,
      body: message.body,
      icon: ""
    }
  };


  admin.database()
    .ref(`/fcmTokens/${userId}`)
    .once('value')
    .then(token => token.val() )
    .then(userFcmToken => {
      return admin.messaging().sendToDevice(userFcmToken, payload)
    })
    .then(res => {
      console.log("Sent Successfully", res);
    })
    .catch(err => {
      console.log(err);
    });

});
