import { IoCheckmark } from "react-icons/io5";

function AddButton({ todos, setTodos, todo, setTodo, editingId, setEditingId }) {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const hourFormatted =
    currentHour <= 23 && currentHour > 12
      ? currentHour - 12
      : currentHour === 0
      ? currentHour + 12
      : currentHour;
  const currentMinutes = currentTime.getMinutes();
  const minutesUpdate =
    currentMinutes >= 0 && currentMinutes < 10
      ? "0" + currentMinutes
      : currentMinutes;
  const minutesFormatted =
    currentHour >= 0 && currentHour < 12
      ? minutesUpdate + " " + "am"
      : minutesUpdate + " " + "pm";

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = (e) => {  
    if (editingId) {
      const updatedTodos = todos.map((item) => 
        item.id === editingId ? { ...item, todo, time: `${hourFormatted}:${minutesFormatted}` } : item
      );
      setTodos(updatedTodos);
      saveToLS(updatedTodos)
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        todo,
        time: `${hourFormatted}:${minutesFormatted}`,
        isCompleted: false,
      };
      const updatedTodos = [...todos, newTodo];
      setTodos(updatedTodos);
      saveToLS(updatedTodos);
    }
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <form
        onSubmit={handleAdd}
        className="flex justify-between gap-2 px-4 -mt-7"
      >
        <input
          onChange={(e) => handleChange(e)}
          value={todo}
          type="text"
          placeholder="Enter your todo....."
          className="border-gray-400 border-2 rounded-md w-full p-2 outline-none"
        />
        <button
          onClick={handleAdd}
          disabled={todo.length <= 3}
          type="submit"
          className="border-none bg-red-400 hover:bg-red-500 px-[10px] rounded-3xl"
        >
          <IoCheckmark className="text-white size-6" />
        </button>
      </form>
    </>
  );
}

export default AddButton;
