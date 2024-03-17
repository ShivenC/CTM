// Import dependencies from external libraries and modules
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

//Exporting function for handling the Register Page
export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [TFA, setTFA] = useState(false);
  const [redirect, setRedirect] = useState("");

  //function used to register a user
  async function registerUser(ev) {
    ev.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        number,
        password,
        TFA: TFA ? "Enabled" : "Disabled",
      });
      alert("Registration worked. Please Log In.");
      setRedirect(true);
    } catch (e) {
      alert("Email already in use. Please try again.");
    }
  }
  //If redirect is true the following navigate will be carried out
  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  //return elements responsible of data on screen for register page
  return (
    <div className="grow flex items-center justify-around">
      <div className="mb-60 border animate-fade animate-once animate-duration-[100ms] animate-normal rounded-xl border-stone-400 p-8 mt-16 py-20 bg-neutral-900">
        <h1 className="text-4xl text-center mb-4 mb-4 text-stone-400">
          Register
        </h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder={"First and Last Name..."}
            className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder={"Email Address..."}
            className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="text"
            placeholder={"Phone Number..."}
            className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400"
            value={number}
            onChange={(ev) => setNumber(ev.target.value)}
          />
          <input
            type="password"
            placeholder={"Password..."}
            className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="placeholder-stone-400 border-none mt-1 outline-none border-stone-400 text-stone-400 border w-full p-1">
            Enable 2FA Email Verification?
            <input
              type="checkbox"
              placeholder={"Password..."}
              className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400 justify-right ml-48 flex-col"
              checked={TFA}
              onChange={() => setTFA(!TFA)}
            />
          </div>
          <button className="bg-stone-400 mt-4 p-1">Register</button>
          <div className="text-center text-stone-400 mt-4">
            Already a member?
            <Link
              to={"/login"}
              className="font-bold text ml-2 mt-4 text-lg text-stone-400"
            >
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
