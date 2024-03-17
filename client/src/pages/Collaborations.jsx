// Import dependencies from external libraries and modules
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//Exporting function for handling the Collaborations Page
export default function Collaborations() {
  const [lists, setLists] = useState([]);
  const [taskss, setTaskss] = useState([]);
  const { subpage } = useParams([]);
  let type = undefined;

  //useEffect used to retrieve data of lists
  useEffect(() => {
    axios.get("/lists").then(({ data }) => {
      setLists(data);
    });
  }, []);

  //useEffect used to retrieve data of tasks
  useEffect(() => {
    if (subpage != undefined) {
      axios.get("/listss/" + subpage + "/tasks").then(({ data }) => {
        setTaskss(data);
      });
    }
  }, [subpage]);

  //Function used to link detailing
  function linkClassCollab(type = null) {
    let classes =
      "flex p-2 p-2 rounded-md brightness-75 grow lg:ml-5 text-xs lg:text-lg mb-2 max-w-md max-h-md hover:bg-stone-800";

    if (type === subpage) {
      classes =
        "flex p-2 p-2 rounded-md brightness-75 bg-stone-900 text-xs lg:text-lg grow lg:ml-5 text-base mb-2 max-w-lg max-h-md ";
    }
    return classes;
  }

  //function used to return the ability to select a list
  function AddTask(type = null) {
    if (type != undefined) {
      return (
        <Link
          to={"/newcollab/" + subpage}
          className="border ml-auto mt-auto ml-5 mr-2 mb-2 rounded-full p-2 text-base group cursor-pointer outline-none hover:rotate-90 duration-300 border-4 "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="lg:w-6 lg:h-6 w-4 h-4"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </Link>
      );
    } else {
      return (
        <div className="border text-xs ml-auto mt-auto ml-5 mr-2 mb-2 rounded-full p-2 text-base group cursor-pointer outline-none duration-300 border-4 ">
          Select List to Add Collaborator
        </div>
      );
    }
  }

  //return elements responsible of data on screen for collaborations page.
  return (
    <div className="h-screen w-full mt-4 overflow-y-hidden animate-fade animate-once animate-duration-[100ms] animate-normal">
      <div className="justify-items flex h-5/6 w-full text-white">
        <div className="bg-stone-900 rounded-tl-xl rounded-bl-xl flex flex-col w-2/6">
          <h1 className="p-8 lg:text-2xl text-xl brightness-75 text-center max-h-auto">
            Lists
          </h1>
          <div className="max-w-lg max-h-full overflow-y-scroll">
            {lists.length > 0 &&
              lists.map((list) => (
                <Link
                  to={"/collaborations/" + list._id}
                  className={linkClassCollab(list._id)}
                  key={list._id}
                >
                  {list.title}
                </Link>
              ))}
          </div>
          {AddTask(subpage)}
        </div>
        <div className="bg-stone-800 rounded-tr-xl rounded-br-xl flex flex-col w-4/6">
          <h1 className=" p-8 text-2xl brightness-75 text-center">
            Collaborators
          </h1>
          <div className="ml-2 text-base gap-2">
            <div className="max-w-screen">
              {taskss.length > 0 &&
                taskss.map((task) => (
                  <div className="flex-col" key={task._id}>
                    {task.owner.slice(1).map((owner, index) => (
                      <h1
                        key={index}
                        className=" h-fit w-fit rounded-xl p-2 flex p-2 p-2 h-fit rounded-tl-md rounded-bl-md brightness-75 w-full text-xs lg:text-lg bg-stone-700 text-base mt-2"
                      >
                        <div className="flex-grow">{owner}</div>
                        <div className="flex items-right justify-right mr-2">
                          <Link
                            to={"/deletecollab" + "/" + subpage + "/" + owner}
                            className="bg-transparent hover:rotate-45 duration-300"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              class="lg:w-6 lg:h-6 w-4 h-4"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </Link>
                        </div>
                      </h1>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
