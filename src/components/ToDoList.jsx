import { useState } from "react";
import { IoTrash } from "react-icons/io5";
import { IoCreateOutline } from "react-icons/io5";

function ToDoList({
  todos,
  setTodos,
  setTodo,
  setEditingId,
  setVisibility,
}) {
  const [filter, setFilter] = useState("All");

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    let edit = todos.find((i) => i.id === id);
    setTodo(edit.todo);
    setEditingId(id);
    setVisibility(true);
  };

  const handleDelete = (e, id) => {
    let newToDos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newToDos);
    saveToLS(newToDos);
  };

  const handleCheckbox = (e) => {
    let id = Number(e.target.name);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    console.log(newTodos[index].isCompleted);
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const filteredTodos = todos.filter((item) => {
    if (filter === "Incomplete") {
      return !item.isCompleted;
    }
    if (filter === "Complete") {
      return item.isCompleted;
    }
    return filter === "All";
  });

  return (
    <>
      <div className="flex xs:gap-6 gap-4 px-5 py-3">
        <button
          className={
            "text-gray-500 hover:border-b-2 hover:border-indigo-500 transition-all duration-100 xs:text-base text-sm" +
            (filter === "All" ? " border-b-2 border-red-400" : "")
          }
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          className={
            "text-gray-500 hover:border-b-2 hover:border-indigo-500 transition-all duration-100 xs:text-base text-sm" +
            (filter === "Complete" ? " border-b-2 border-red-400" : "")
          }
          onClick={() => setFilter("Complete")}
        >
          Complete Tasks
        </button>
        <button
          className={
            "text-gray-500 hover:border-b-2 hover:border-indigo-500 transition-all duration-100 xs:text-base text-sm" +
            (filter === "Incomplete" ? " border-b-2 border-red-400" : "")
          }
          onClick={() => setFilter("Incomplete")}
        >
          Incomplete Tasks
        </button>
      </div>
      {filteredTodos.length === 0 && (
        <p className="px-5 py-3 text-indigo-600">No todos to display!</p>
      )}
        <div className="to-do-list overflow-x-hidden overflow-y-auto max-h-[50vh] w-full">
        {filteredTodos.map((item) => (  
          <div
            key={item.id}
            className="flex justify-between items-center px-5 py-3 gap-5 hover:border-l-indigo-600 hover:border-l-4 border-b-2 cursor-pointer transition-all duration-75 ease-in"
          >
            <div className="flex items-center gap-3">
              <input
                name={item.id}
                onChange={(e) => handleCheckbox(e)}
                type="checkbox"
                checked={item.isCompleted}
                className="accent-red-500"
              />
              <p className={`text-justify break-words max-w-[120px] sm:max-w-[250px] xs:text-base text-sm ${item.isCompleted ? "line-through text-gray-400" : ""}`}>
                {item.todo}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-gray-400 text-sm w-[57px]">{item.time}</span>
              <button
                onClick={(e) => {
                  handleDelete(e, item.id);
                }}
              >
                <IoTrash className="text-red-400 hover:text-red-500" />
              </button>
              <button
                onClick={(e) => {
                  handleEdit(e, item.id);
                }}
              >
                <IoCreateOutline className="text-red-400 hover:text-red-500" />
              </button>
            </div>
        </div>
        ))}
        </div>
    </>
  );
}

export default ToDoList;
