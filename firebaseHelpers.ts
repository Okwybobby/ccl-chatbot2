import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
// import { db } from "../path/to/your/firebase-config"; // Import your Firebase configuration

// Define a function to add a message to Firestore
export const addMessageToFirestore = async (text: string) => {
  try {
    // Add a new document with a generated ID to the "messages" collection
    await addDoc(collection(db, "messages"), {
      text: text,
      createdAt: new Date(),
    });
    console.log("Message added to Firestore successfully");
  } catch (error) {
    console.error("Error adding message to Firestore: ", error);
    throw error; // Rethrow the error to handle it in the component
  }
};
