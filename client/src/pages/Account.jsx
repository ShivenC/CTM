// Import dependencies from external libraries and modules
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";
import axios from "axios";

//Exporting function for handling the Account Page
export default function AccountPage() {
  const [HP, setHP] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const { subpage } = useParams();

  //Function used for logging out of user'ss account
  async function LogOut() {
    await axios.post("/logout");
    setHP("/");
    setUser(null);
  }

  //Function used to link detailing
  function linkClass(type = null) {
    let classes = "py-2 px-4 text-stone-500";
    if (type === subpage) {
      classes = "py-2 px-4 bg-stone-500 rounded-full ";
    }
    return classes;
  }

  //Lets user have collaborators
  async function EnableTFA(ev) {
    ev.preventDefault();
    try {
      await axios.patch("/enablecollaborator/" + subpage, {});
      alert("2FA Enabled");
      window.location.reload();
    } catch (e) {
      alert("Error. Please try again.");
    }
  }

  //Disables user's ability to have collaborators
  async function DisableTFA(ev) {
    ev.preventDefault();
    try {
      await axios.patch("/disablecollaborator/" + subpage, {});
      alert("2FA Disabled");
      window.location.reload();
    } catch (e) {
      alert("Error. Please try again.");
    }
  }

  //if statements that redirect
  if (!ready) {
    return "Loading...";
  }
  if (ready && !user && !HP) {
    return <Navigate to={"/login"} />;
  }
  if (HP) {
    return <Navigate to={HP} />;
  }

  //return elements responsible of data on screen for account page.
  return (
    <div>
      <nav className="w-full flex mt-16 justify-center animate-fade animate-once animate-duration-[100ms] animate-normal">
        <div className="w-fit">
          <Link className={linkClass("profile")} to={"/account/profile"}>
            Profile
          </Link>
          <Link className={linkClass("collaborationss")} to={"/collaborations"}>
            Collaboration
          </Link>
          <Link
            className={linkClass(user._id)}
            to={"/account/security/" + user._id}
          >
            Security
          </Link>
        </div>
      </nav>
      {subpage === "profile" && (
        <div className="w-full flex justify-center items-center ">
          <div className="w-fit border rounded-xl p-3 mt-32 border-stone-400 text-center text-stone-400 text-3xl mt-8 animate-fade animate-once animate-duration-[100ms] animate-normal">
            Profile
            <br />
            <div className="mt-12 text-xl">
              Name: {user.name} <br /> Email Address: {user.email} <br />{" "}
            </div>
            <div className="w-full justify-center flex items-center">
              <button
                onClick={LogOut}
                className=" w-32 text-md mt-10 p-2  text-xl text-black bg-stone-500 mb-2 animate-fade animate-once animate-duration-[100ms] animate-normal"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      {subpage === user._id && (
        <div className="w-full rounded-xl border-stone-400 text-center text-stone-400 text-3xl mt-8 animate-fade animate-once animate-duration-[100ms] animate-normal">
          2FA With Email Verification
          <div className="w-full h-48">
            <div className="mt-4 w-full h-fit p-1 text-center  flex justify-center items-center">
              <div className="w-fit border rounded-xl p-4">
                This is currently
                <div className="font-bold italic">{user.TFA}</div>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <button
              onClick={EnableTFA}
              className="w-fit h-fit p-1 border-lg ml-1"
            >
              Enable Email 2FA
            </button>
            <button
              onClick={DisableTFA}
              className="w-fit h-fit p-1 border-lg ml-1"
            >
              Disable Email 2FA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
