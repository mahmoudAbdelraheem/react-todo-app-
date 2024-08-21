import {
  doc,
  collection,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { myDB } from "../../data/firebaseConfig";

// Function to add a new todo
export const addTodo = async (userId, todo) => {
  try {
    // Reference to the user's document
    const userDocRef = doc(myDB, "users", userId);

    // Reference to the "todos" subcollection
    const todosCollectionRef = collection(userDocRef, "todos");

    await addDoc(todosCollectionRef, todo);

    console.log("Todo added successfully!");
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

// Function to get todos
export const getTodos = async (userId) => {
  try {
    // Reference to the user's todos subcollection
    const todosCollectionRef = collection(myDB, "users", userId, "todos");

    // Get all todos
    const querySnapshot = await getDocs(todosCollectionRef);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Todos:", todos);
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};
//! update and soft delete todo
export const updateTodo = async (userId, todoId, updatedTodo) => {
  try {
    const todoDocRef = doc(myDB, "users", userId, "todos", todoId);
    await updateDoc(todoDocRef, updatedTodo);

    console.log("Todo updated successfully!");
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};
