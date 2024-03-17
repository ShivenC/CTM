import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

function Login() {
  return (
    <Link to={"/login"}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="animate-fade animate-duration-[400ms] w-6 h-6"
      >
        <path
          fillRule="evenodd"
          d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
          clipRule="evenodd"
        />
      </svg>
    </Link>
  );
}
function Bar() {
  return <div className="border border-l border-stone-400 h-6"></div>;
}

export default function () {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Link
        to={"/"}
        className="flex justify-between animate-fade animate-duration-[400ms]"
      >
        <a
          href=""
          className="flex items-center gap-1 text-stone-400 animate-fade animate-duration-[400ms]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-stone-400 animate-fade animate-duration-[400ms]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
          <span className="font-bold text-xl text-stone-400 animate-fade animate-duration-[400ms]">
            CTM
          </span>
        </a>
        <Link
          className="ml-4 border text-stone-400 rounded-xl mt-1 p-2 hover:bg-stone-400 hover:text-zinc-900"
          to={"/mylists"}
        >
          My Lists
        </Link>
        <div className="flex items-center gap-3 border border-stone-400 rounded-full py-2 px-3 text-stone-400">
          {!user && (
            <div className="flex items-center gap-3 text-stone-400">
              {Login()} {Bar()}
            </div>
          )}
          {!!user && (
            <Link
              to={"/account"}
              className="font-bold ml-1 text-md text-stone-400 animate-ease-linear animate-alternate animate-fade animate-duration-[400ms]"
            >
              {user.name}
            </Link>
          )}
          <Link to={"/account"} className="div text-stone-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 animate-fade animate-duration-[400ms]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Link>
        </div>
      </Link>
    </div>
  );
}
