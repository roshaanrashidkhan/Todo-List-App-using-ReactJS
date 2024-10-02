import { IoAdd } from "react-icons/io5";

function Header({ onClick, visibility }) {

  const todosStored = localStorage.getItem("todos");
  const arrayOfTodos = todosStored ? JSON.parse(todosStored) : [];
  const storedTodos = arrayOfTodos.length;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = [];

  for (let index = 0; index < 31; index++) {
    date.push(index);
  }

  const currentDay = days[new Date().getDay()];
  const currentDate = date[new Date().getDate()];
  const currentMonth = months[new Date().getMonth()];

  const ordinalDate =
    (currentDate === 1 && currentDate + "st") ||
    (currentDate === 2 && currentDate + "nd") ||
    (currentDate === 3 && currentDate + "rd") ||
    currentDate + "th";

  return (
    <>
      <div className="m-auto w-full">
        <div className="flex flex-col mb-2">
          <div className={"flex justify-between items-center py-3 pb-7"}>
            <div className="px-5 flex flex-col">
              <h1 className="sm:text-2xl text-xl text-indigo-600 font-bold">
                {currentDay},{" "}
                <span className="sm:text-2xl text-xl text-indigo-600 sm:font-semibold font-normal">
                  {ordinalDate}
                </span>
              </h1>
              <h2 className="text-base text-gray-500">{currentMonth}</h2>
            </div>
            <div className="px-5">
              <h2 className="text-gray-500 text-base">{storedTodos} Tasks</h2>
            </div>
          </div>
          <div className="w-full border-[1px]"></div>
          {!visibility && (
            <div className="-mt-4 ml-[65vw] sm:ml-[23rem]">
              <button
                onClick={onClick}
                className="-my-2 p-3 rounded-3xl bg-red-400 flex justify-center items-center hover:bg-red-500"
              >
                {<IoAdd className="text-white size-5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Header;