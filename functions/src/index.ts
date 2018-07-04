import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const softDelete = functions.database.ref('/todos/{todoId}')
  .onDelete((snapshot, context) => {
    const original = snapshot.val();
    return snapshot.ref.parent.child('deltedTodos').child(context.params.todoId).set(original);
  });
