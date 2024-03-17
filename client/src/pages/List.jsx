// Import dependencies from external libraries and modules
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

//Exporting function for handling the List Page
export default function ListPage() {
  const [lists, setLists] = useState([]);
  const [tasks, setTasks] = useState([]);
  const { subpage } = useParams([]);
  let type = undefined;

  //useEffects responsible for retrieving lists
  useEffect(() => {
    axios.get("/lists").then(({ data }) => {
      setLists(data);
    });
  }, []);

  //useEffects responsible for retrieving tasks of the respective lists
  useEffect(() => {
    if (subpage != undefined) {
      axios.get("/lists/" + subpage + "/tasks").then(({ data }) => {
        setTasks(data);
      });
    }
  }, [subpage]);

  //function used to return the ability to create a a new task
  function Addtask(type = null) {
    if (type != undefined) {
      return (
        <Link
          to={"/newtask/" + subpage}
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
    }
  }

  //function used to link details
  function linkClass(type = null) {
    let classes =
      "flex p-2 p-2 rounded-md brightness-75 grow lg:ml-5 text-xs lg:text-lg mb-2 max-w-md max-h-md hover:bg-stone-800";

    if (type === subpage) {
      classes =
        "flex p-2 p-2 rounded-md brightness-75 bg-stone-900 text-xs lg:text-lg grow lg:ml-5 text-base mb-2 max-w-lg max-h-md ";
    }
    return classes;
  }

  //function used to link details
  function linkClassT(type = null) {
    let classes =
      "p-2 p-2 rounded-tl-md rounded-bl-md brightness-75 w-full text-xs lg:text-lg bg-stone-700 flex max-h-40 text-base mt-2 ";

    return classes;
  }

  //return elements responsible of data on screen for list page
  return (
    <div className="h-screen w-full mt-4 overflow-y-hidden animate-fade animate-once animate-duration-[100ms] animate-normal">
      <div className="justify-items h-5/6 flex h-full w-full text-white">
        <div className="bg-stone-900 rounded-tl-xl rounded-bl-xl flex flex-col w-2/6">
          <h1 className="p-8 lg:text-2xl text-xl brightness-75 text-center max-h-auto">
            Lists
          </h1>
          <div className="max-w-md max-h-full overflow-y-scroll">
            {lists.length > 0 &&
              lists.map((list) => (
                <Link
                  to={"/mylists/" + list._id}
                  className={linkClass(list._id)}
                  key={list._id}
                >
                  {list.title}
                  <div className="h-auto max-w-lg max-h-auto ms-auto flex ">
                    <Link
                      to={"/updatelist/" + list._id}
                      className="hover:-rotate-45 duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 lg:w-6 lg:h-6"
                      >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                      </svg>
                    </Link>
                    <Link
                      to={"/deletelist/" + list._id}
                      className="bg-transparent hover:rotate-45 duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-4 h-4 lg:w-6 lg:h-6"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </Link>
                  </div>
                </Link>
              ))}
          </div>
          <Link
            to={"/newlist"}
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
        </div>
        <div className="bg-stone-800 rounded-tr-xl rounded-br-xl flex flex-col w-4/6">
          <h1 className=" p-8 text-2xl brightness-75 text-center">Tasks</h1>
          <div className=" ml-5 text-base mt-2 gap-2">
            <div className="max-w-screen">
              {tasks.length > 0 &&
                tasks.map((task) => (
                  <Link className={linkClassT()} key={task._id}>
                    {task.title}
                    <div className="h-auto max-w-lg max-h-auto ms-auto flex  ">
                      <Link
                        to={"/updatetask/" + task._id}
                        className="hover:-rotate-45 duration-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class="lg:w-6 lg:h-6 w-4 h-4"
                        >
                          <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                          <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                        </svg>
                      </Link>
                      <Link
                        to={"/deletetask/" + task._id}
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
                  </Link>
                ))}
            </div>
          </div>
          {Addtask(subpage)}
        </div>
      </div>
    </div>
  );
}
