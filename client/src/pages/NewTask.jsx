// Import dependencies from external libraries and modules
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//Exporting function for handling the New Task Page
export default function NewTaskPage() {
  const [title, setTitle] = useState("");
  const [redirect, setRedirect] = useState("");
  const { subpage } = useParams([]);

  //function used to add a task
  async function AddNewTask(ev) {
    ev.preventDefault();
    axios.post("/newtask/" + subpage, {
      title,
    });
    setRedirect(true);
  }

  //If redirect is true the following navigate will be carried out
  if (redirect) {
    return <Navigate to={"/mylists/" + subpage} />;
  }

  //return elements responsible of data on screen for new task page
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60 w-96 border animate-fade animate-once animate-duration-[100ms] animate-normal rounded-xl border-stone-400 p-8 mt-16 py-20 bg-neutral-900">
        <h1 className="text-3xl text-center mb-4 text-stone-400 ">Add Task</h1>
        <form className="max-w-md mx-auto " onSubmit={AddNewTask}>
          <input
            type="text"
            placeholder="New Task Name..."
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            required
            maxlength="42"
            className="placeholder-stone-400 bg-neutral-950 outline-none border border-stone-400 text-stone-400"
          />
          <div className="flex items-center justify-center">
            <button className="bg-stone-400 w-2/4 items-center">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
