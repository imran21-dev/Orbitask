import axios from "axios";
import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import Swal from "sweetalert2";
import DragBoard from "../components/DragBoard";





const HomePage = () => {

  const [taskForm, setTaskForm] = useState("");
  const hanldeTaskForm = (category) => {
    setTaskForm(category);
  };

  const handleFormData = (e, category) => {
    e.preventDefault();
    const title = e.target.name.value;
    const description = e.target.desc.value;
    const task = {
      title,
      description,
      category: category,
      addedDate: new Date().toISOString(),
    };
    axios.post("http://localhost:5000/tasks", task).then((res) => {
      if (res.data.insertedId) {
        e.target.reset();
        setTaskForm("");
        Swal.fire({
          icon: "success",
          title: "Task added!",
         
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something went wrong!",
          text: "Try again",
        });
      }
    });
  };


  return (
    <div className=" h-32">
      <h1 className="font-semibold text-center pt-3 pb-4 text-xl">
        Manage your tasks
      </h1>
      <div className="grid grid-cols-3 md:gap-3 xl:gap-6">
        <div className="mx-1 md:mx-2 xl:mx-3 relative">
          <h3 className="font-bold text-sm pb-1">To Do</h3>
          <IoIosAdd
            onClick={() => hanldeTaskForm("todo")}
            className="text-4xl border border-gray-400/20 bg-gray-400/10 hover:bg-gray-400/15 duration-200 w-full py-2 px-2 rounded-lg"
          />
          <form
            onSubmit={() => handleFormData(event, "todo")}
            className={taskForm === "todo" ? "block absolute z-10 p-3 top-16 w-full rounded-lg left-0 border border-gray-400/20  backdrop-blur-3xl " : "hidden"}
          >
            <div className="flex flex-col my-3">
              <input
                required
                placeholder="Task Name"
                type="text"
                name="name"
                className="border border-gray-400/30 px-3 focus:outline-none py-1 rounded-md "
              />
            </div>

            <div className="flex flex-col my-3">
              <textarea
                name="desc"
                placeholder="Description"
                className="border border-gray-400/30 px-3 focus:outline-none py-1 rounded-md "
              ></textarea>
            </div>
            <button className="text-xs text-white md:text-sm bg-purple-600 px-4 py-1 rounded-lg font-bold hover:bg-purple-700 duration-200">
              Add
            </button>
            <span onClick={() => setTaskForm("")} className="text-xs cursor-pointer md:text-sm mx-2 px-4 py-1 rounded-lg font-bold hover:bg-purple-500/20 duration-200">
              Cancel
            </span>
          </form>
        </div>

        <div className="mx-1 md:mx-2 xl:mx-3 relative">
          <h3 className="font-bold text-sm pb-1">In Progress</h3>
          <IoIosAdd
            onClick={() => hanldeTaskForm("progress")}
            className="text-4xl border border-gray-400/20 bg-gray-400/10 hover:bg-gray-400/15 duration-200 w-full py-2 px-2 rounded-lg"
          />
          <form
            onSubmit={() => handleFormData(event, "progress")}
            className={taskForm === "progress" ? "block absolute z-10 p-3 top-16 w-full rounded-lg left-0 border border-gray-400/20  backdrop-blur-3xl" : "hidden"}
          >
            <div className="flex flex-col my-3">
              <input
                required
                placeholder="Task Name"
                type="text"
                name="name"
                className="border border-gray-400/30  px-3 focus:outline-none py-1 rounded-md "
              />
            </div>

            <div className="flex flex-col my-3">
              <textarea
                name="desc"
                placeholder="Description"
                className="border border-gray-400/30 px-3 focus:outline-none py-1 rounded-md "
              ></textarea>
            </div>
            <button className="text-xs text-white md:text-sm bg-purple-600 px-4 py-1 rounded-lg font-bold hover:bg-purple-700 duration-200">
              Add
            </button>
            <span onClick={() => setTaskForm("")} className="text-xs cursor-pointer md:text-sm mx-2 px-4 py-1 rounded-lg font-bold hover:bg-purple-500/20 duration-200">
              Cancel
            </span>
          </form>
        </div>

        <div className="mx-1 md:mx-2 xl:mx-3 relative">
          <h3 className="font-bold text-sm pb-1">Done</h3>
          <IoIosAdd
            onClick={() => hanldeTaskForm("done")}
            className="text-4xl bg-gray-400/10 border border-gray-400/20 hover:bg-gray-400/15 duration-200 w-full py-2 px-2 rounded-lg"
          />
          <form
            onSubmit={() => handleFormData(event, "done")}
            className={taskForm === "done" ? "block absolute z-10 p-3 top-16 w-full rounded-lg left-0 border border-gray-400/20  backdrop-blur-3xl " : "hidden"}
          >
            <div className="flex flex-col my-3">
              <input
                required
                placeholder="Task Name"
                type="text"
                name="name"
                className="border border-gray-400/30 px-3 focus:outline-none py-1 rounded-md "
              />
            </div>

            <div className="flex flex-col my-3">
              <textarea
                name="desc"
                placeholder="Description"
                className="border border-gray-400/30 px-3 focus:outline-none py-1 rounded-md "
              ></textarea>
            </div>
            <button className="text-xs text-white md:text-sm bg-purple-600 px-4 py-1 rounded-lg font-bold hover:bg-purple-700 duration-200">
              Add
            </button>
            <span onClick={() => setTaskForm("")} className="text-xs cursor-pointer md:text-sm mx-2 px-4 py-1 rounded-lg font-bold hover:bg-purple-500/20 duration-200">
              Cancel
            </span>
          </form>
        </div>
      </div>
      <DragBoard></DragBoard>
        
    </div>
  );
};

export default HomePage;
