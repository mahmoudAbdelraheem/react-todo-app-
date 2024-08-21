/* eslint-disable react/no-unescaped-entities */
import { useContext, useEffect, useState } from "react";
import SingleTodo from "../single_todo/SingleTodo";
import { addTodo, getTodos, updateTodo } from "./todoConfig";
import { UserContext } from "../../context/user_context";
import { userLogOut } from "../auth/authConfig";
import { useNavigate } from "react-router-dom";
//todo get user auth id to save todos in subcollection
const Todo = () => {
  const [todos, setTodos] = useState([]);

  // State for the input value
  const [inputValue, setInputValue] = useState("");
  const { uid, setUid } = useContext(UserContext);
  console.log(uid);
  useEffect(() => {
    if (!uid) {
      return;
    }
    const fetchTodos = async () => {
      const todos = await getTodos(uid);
      setTodos(todos);
    };
    fetchTodos();
  }, []);

  // Function to handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // Function to handle adding a new to-do
  const addNewTodo = async () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        text: inputValue.trim(),
        isCompleted: false,
        isDeleted: false,
      };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue("");
      // Clear input field after adding
      await addTodo(uid, newTodo);
    }
  };

  // Custom Callback Functions to handle deleting and completing tasks
  // Passing them as props to SingleTodo
  const removeTask = async (taskIndex) => {
    const newTodos = [...todos];
    newTodos[taskIndex].isDeleted = true;
    setTodos(newTodos);
    await updateTodo(uid, newTodos[taskIndex].id, newTodos[taskIndex]);
  };

  const completeTask = async (taskIndex) => {
    const newTodos = [...todos];
    newTodos[taskIndex].isCompleted = !newTodos[taskIndex].isCompleted;
    setTodos(newTodos);
    await updateTodo(uid, newTodos[taskIndex].id, newTodos[taskIndex]);
  };

  const nav = useNavigate();

  const logout = async () => {
    setUid(null);
    await userLogOut();
    nav("/");
  };

  return (
    <>
      <div className="bg-primary text-light">
        <div className="container">
          <div className="row text-end">
            <div className="col-12 py-5">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2
                    className="text-light btn border"
                    onClick={() => logout()}
                  >
                    logout
                  </h2>
                </div>
                <div>
                  <h1>To-Do App!</h1>
                </div>
              </div>
              <p>Add new To-Do</p>

              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter New To-Do"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>
              <button
                className="btn border text-light px-5"
                onClick={addNewTodo}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* show all todos here */}
      <div className="container my-5 text-center">
        <h3 className="pb-3">Let's get some work done!</h3>

        {todos.map((task, index) =>
          task.isDeleted ? null : (
            <SingleTodo
              key={index}
              task={task}
              index={index}
              onRemove={removeTask}
              onComplete={completeTask}
            />
          )
        )}
      </div>
    </>
  );
};

export default Todo;
