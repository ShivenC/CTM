// Import dependencies from external libraries and modules
import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

//Exporting function for handling the Login Page
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectC, setRedirectC] = useState(false);
  const { ready, setUser } = useContext(UserContext);

  //Function handling loging in users with 2FA enabled or not
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    const { data } = await axios.post("/login", { email, password });
    if (data === "not found") {
      alert("Account not found.");
    }
    if (data.action === "generateTFA") {
      const userEnteredNumber = prompt("Enter the number sent to: " + email);
      if (data.value == userEnteredNumber) {
        const response = await axios.post("/2falogin", {
          email,
          password,
          userEnteredNumber,
        });
        setUser(response.data.user);
        setRedirect(true);
        window.location.href = "/";
      } else {
        alert("Incorrect Value. Try Again");
      }
    } else {
      const { data } = await axios.post("/login", { email, password });
      console.log(data);
      setUser(data);
      alert("You are now logged in.");
      setRedirectC(true);
    }
  }
  //Handles redirection when called
  if (redirectC) {
    return <Navigate to={"/"} />;
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  //return elements responsible of data on screen for delete collaborator page
  return (
    <div>
      <div className="mt-20 grow flex items-center justify-around">
        <div className=" border h-full animate-fade animate-once animate-duration-[100ms] animate-normal rounded-xl border-stone-400 p-8 mt-8 py-20 bg-neutral-900">
          <h1 className="text-4xl text-center text-stone-400 ">Login</h1>
          <form className="max-w-md mx-auto mt-8" onSubmit={handleLoginSubmit}>
            <input
              type="email"
              placeholder={"Email Address..."}
              value={email}
              className="placeholder-stone-400 bg-neutral-950 outline-none border-stone-400 text-stone-400"
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <input
              type="password"
              placeholder={"Password..."}
              value={password}
              className="placeholder-stone-400 bg-stone-950 outline-none border border-stone-400 text-stone-400"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <button className="bg-stone-400 h-8 mt-4">Login</button>
            <div className="text-center text-stone-400 py-2">
              Don't have an account?
              <Link
                to={"/register"}
                className="font-bold py-2 text ml-3 text-lg text-stone-400"
              >
                Register Here
              </Link>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}
