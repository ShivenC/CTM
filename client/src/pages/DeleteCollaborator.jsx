// Import dependencies from external libraries and modules
import { Navigate, useParams, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

//Exporting function for handling the Delete Collaborator Page
export default function DeleteCollaborator() {
  const [redirect, setRedirect] = useState("");
  const { subpage } = useParams([]);
  const { owner } = useParams([]);

  //Function tasked with deleting a collaborator
  async function DeleteCollaborator(ev) {
    ev.preventDefault();
    try {
      await axios.delete("/removecollab/" + subpage, {
        data: {
          owner,
        },
      });
      setRedirect(true);
    } catch (e) {
      alert("Error. Please try again.");
    }
  }

  //If redirect is true the following navigate will be carried out
  if (redirect) {
    return <Navigate to={"/collaborations/" + subpage} />;
  }

  //return elements responsible of data on screen for delete collaborator page
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-60 w-96 border animate-fade animate-once animate-duration-[100ms] animate-normal rounded-xl border-stone-400 p-8 mt-16 py-20 bg-neutral-900">
        <h1 className="text-3xl text-center mb-4 text-stone-400 ">
          Delete List
        </h1>
        <form className="max-w-md mx-auto ">
          <div className="flex">
            <div className="w-full flex items-center text-center justify-center">
              <Link
                to={"/collaborations"}
                className="mr-6 w-full border rounded-xl bg-gray-300 text-black "
              >
                Cancel
              </Link>
              <button className="bg-stone-400" onClick={DeleteCollaborator}>
                Delete
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
