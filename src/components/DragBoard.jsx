import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { io } from "socket.io-client";
import { LuPenLine } from "react-icons/lu";
import { RiCloseCircleLine, RiDeleteBin7Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import Modal from "@mui/material/Modal";

const socket = io("http://localhost:5000");

export default function DragBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();

    socket.on("taskUpdated", fetchTasks);

    return () => socket.off("taskUpdated");
  }, []);

  const fetchTasks = () => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.order - b.order);
        setTasks(data);
      });
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const updatedTasks = [...tasks];

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const categoryTasks = updatedTasks.filter(
        (task) => task.category === source.droppableId
      );

      const [movedTask] = categoryTasks.splice(source.index, 1);
      categoryTasks.splice(destination.index, 0, movedTask);

      // Update order field
      categoryTasks.forEach((task, index) => (task.order = index));

      setTasks(updatedTasks);

      await fetch("http://localhost:5000/update-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: source.droppableId,
          tasks: categoryTasks,
        }),
      });
    } else {
      // Move task to a different column
      const taskToMove = updatedTasks.find(
        (task) => task._id === result.draggableId
      );
      taskToMove.category = destination.droppableId;

      setTasks(updatedTasks);

      await fetch("http://localhost:5000/update-task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _id: taskToMove._id,
          category: destination.droppableId,
        }),
      });
    }
  };

  const handleTaskDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/task?id=${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const desc = e.target.desc.value;
    const task = { title, description: desc, id };
    axios.patch("http://localhost:5000/task", task).then((res) => {
      if (res.data.modifiedCount) {
        e.target.reset()
        setOpen(false)
      }
    });
  };

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [id, setId] = useState(null);
  const handleOpen = (title, desc, id) => {
    setOpen(true);
    setTitle(title);
    setDesc(desc);
    setId(id);
  };
  const handleClose = () => {
    setOpen(false);
    setTitle(null);
    setDesc(null);
    setId(null);
  };



  return (
    <div className="grid grid-cols-3 md:gap-3 xl:gap-6 pt-5 justify-items-stretch taskParent">
      <DragDropContext onDragEnd={handleDragEnd}>
        {["todo", "progress", "done"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="overflow-auto px-1 md:px-2 xl:px-3 h-[700px] md:h-[600px] xl:h-[700px] taskContainer rounded"
              >
                {tasks
                  .filter((task) => task.category === category)
                  .sort((a, b) => a.order - b.order)
                  .map((task, index) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="relative task  p-3 bg-gray-400/10 rounded-lg duration-300 border-gray-400/20 border mb-2"
                        >
                          <div className="task-details flex items-center pt-3">
                            <div className="flex pr-1 md:pr-2 xl:pr-3 justify-start items-center">
                              <PiDotsSixVerticalBold className="text-sm md:text-base opacity-50" />
                            </div>
                            <div className=" w-full">
                              <h2 className="font-semibold title md:text-base text-sm">
                                {task.title}
                              </h2>
                              <p className="text-xs desc md:text-sm">
                                {task.description}
                              </p>
                            </div>
                          </div>

                          <div className="absolute top-1 right-1 w-full flex justify-between">
                            {task.category === "todo" ? (
                              <div className="animate-bounce w-2 h-2 mx-3 mt-1 rounded-full bg-red-500"></div>
                            ) : task.category === "progress" ? (
                              <div className="animate-pulse w-2 h-2 mx-3 mt-1 rounded-full bg-yellow-500 "></div>
                            ) : (
                              <div className=" w-2 h-2 mx-3 mt-1 rounded-full bg-green-500 "></div>
                            )}

                            <div>
                              <button
                                onClick={() =>
                                  handleOpen(
                                    task.title,
                                    task.description,
                                    task._id
                                  )
                                }
                                className="hover:bg-purple-500/30 hover:text-purple-400 duration-100 p-1 rounded-full"
                              >
                                <LuPenLine className="text-xs md:text-sm opacity-50" />
                              </button>
                              <button
                                onClick={() => handleTaskDelete(task._id)}
                                className="hover:bg-red-500/30 hover:text-red-400 duration-100 p-1 rounded-full"
                              >
                                <RiDeleteBin7Line className="text-xs md:text-sm opacity-50" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <div className="absolute w-full h-screen flex justify-center items-center border-none">
          <form
            onSubmit={handleUpdate}
            className="border shadow-2xl relative border-gray-400/20 text-white backdrop-blur-2xl rounded-md w-4/12 p-5"
          >
            <h2
              onClick={handleClose}
              className="hover:bg-red-400/20 rounded-full p-1 opacity-80  absolute right-2 top-2 hover:text-red-500"
            >
              <RiCloseCircleLine />
            </h2>
            <h1 className="text-lg font-semibold pb-3">Edit this task</h1>

            <label htmlFor="title" className="text-xs md:text-sm">
              Title
            </label>
            <input
              name="title"
              type="text"
              defaultValue={title}
              className="focus:outline-none border px-2 rounded-sm border-gray-400/20 py-1 w-full mb-2"
            />

            <label htmlFor="title" className="text-xs md:text-sm">
              Description
            </label>
            <textarea
              name="desc"
              defaultValue={desc}
              className="focus:outline-none overflow-auto taskContainer border px-2 rounded-sm border-gray-400/20 py-1 w-full mb-2 h-44"
            ></textarea>
            <button className="bg-purple-600 text-white hover:bg-purple-700 cursor-pointer px-4 py-2 rounded-lg font-bold md:text-sm text-xs">
              Update
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
