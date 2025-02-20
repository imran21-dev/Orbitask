

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { io } from "socket.io-client";
import { LuPenLine } from "react-icons/lu";
import { RiDeleteBin7Line } from "react-icons/ri";
import Swal from "sweetalert2";
import axios from "axios";


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

  const handleTaskEdit = (title, description) => {};

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
  

  return (
    <div className="grid grid-cols-3 md:gap-3 xl:gap-6 pt-5 justify-items-stretch">
      

      <DragDropContext onDragEnd={handleDragEnd}>
        {["todo", "progress", "done"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="overflow-auto px-1 md:px-2 xl:px-3 taskContainer min-h-[300px] max-h-[600px]  rounded"
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
                          className="relative overflow-hidden p-3 bg-gray-400/10 rounded-lg duration-300 border-gray-400/20 border mb-2"
                        >
                          <h2 className="font-semibold pt-2 md:text-base text-sm">{task.title}</h2>
                          <p className="text-xs md:text-sm">{task.description}</p>

                          <div className="absolute top-1 right-1 w-full flex justify-between">
                           {task.category === 'todo' ? <div className="animate-bounce w-2 h-2 mx-3 mt-1 rounded-full bg-red-500"></div> : task.category === 'progress' ?
                           <div className="animate-pulse w-2 h-2 mx-3 mt-1 rounded-full bg-yellow-500 "></div> :
                           <div className=" w-2 h-2 mx-3 mt-1 rounded-full bg-green-500 "></div>
                           }

                           
                            <div>
                            <button
                              onClick={() =>
                                handleTaskEdit(task.title, task.description)
                              }
                              className="hover:bg-purple-500/30 hover:text-purple-600 duration-100 p-1 rounded-full"
                            >
                              <LuPenLine className="text-xs md:text-sm opacity-50"/>
                            </button>
                            <button
                              onClick={() => handleTaskDelete(task._id)}
                              className="hover:bg-red-500/30 hover:text-red-600 duration-100 p-1 rounded-full"
                            >
                              <RiDeleteBin7Line className="text-xs md:text-sm opacity-50"/>
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
    </div>
  );
}
