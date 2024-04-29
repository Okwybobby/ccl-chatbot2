// const addMessage = async (text: string) => {
//   setLoading(true);
//   try {
//     // Add message to Firestore
//     const messageRef = await adminDB
//       .collection("users")
//       .doc(session?.user?.email)
//       .collection("genchats")
//       .doc(id)
//       .collection("messages")
//       .add({
//         text,
//         createdAt: new Date(),
//       });

//     // Update messages state in Chat2 component
//     setMessages((prevMessages) => [...prevMessages, { id: messageRef.id, text, createdAt: new Date() }]);

//     // Optional: handle success or update UI
//   } catch (error) {
//     console.error('Error adding message:', error);
//     // Optional: handle error or show error message
//   } finally {
//     setLoading(false);
//   }
// };



// // // pages/api/addMessage.js

// // import { addMessageToFirestore } from '../../firebaseHelpers';

// // export default async function handler(req, res) {
// //   if (req.method === 'POST') {
// //     const { text } = req.body;
// //     // Call the function to add the message to Firestore
// //     await addMessageToFirestore(text);
// //     res.status(200).json({ success: true });
// //   } else {
// //     res.status(405).json({ message: 'Method Not Allowed' });
// //   }
// // }