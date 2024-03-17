// Import dependencies from external libraries and modules
import axios from "axios";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";

//Exporting function for handling the New Collab Page
export default function NewCollabPage() {
  const [redirect, setRedirect] = useState(false);
  const [owner, setOwner] = useState("");
  const { subpage } = useParams([]);

  //function used to add a collaborator
  async function AddCollab(ev) {
    ev.preventDefault();

    axios.put("/newcollab/" + subpage, {
      owner,
    });

    setRedirect(true);
  }

  //If redirect is true the following navigate will be carried out
  if (redirect) {
    return <Navigate to={"/collaborations/" + subpage} />;
  }

  //return elements responsible of data on screen for delete collaborator page
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60 border animate-fade animate-once animate-duration-[100ms] animate-normal rounded-xl border-stone-400 p-8 mt-16 py-20 bg-neutral-900">
        <h1 className="text-3xl text-center mb-4 text-stone-400 ">
          Add Collaborator
        </h1>
        <form className="max-w-md mx-auto " onSubmit={AddCollab}>
          <input
            type="email"
            placeholder="Email..."
            value={owner}
            onChange={(ev) => setOwner(ev.target.value)}
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
