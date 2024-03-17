// Import dependencies from external libraries and modules
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";

//Function tasked with deleting a collaborator
function AnimationData() {
  return (
    <div className=" w-full mt-6 ml-4 flex">
      <div className="w-5 h-5 bg-white rounded-full dark:bg-stone-600 justify-items items-center text-center animate-fade-up animate-once animate-duration-1000 animate-delay-[1000ms] animate-normal "></div>
      <div className="w-8/12 md:w-11/12 ml-3 h-3 bg-white rounded-full dark:bg-stone-500 mt-1 animate-fade-up animate-once animate-duration-1000 animate-delay-[1000ms] animate-normal animate-once "></div>
    </div>
  );
}

//Exporting function for handling the Index Page
export default function IndexPage() {
  return (
    <body className="overflow:hidden">
      <div className="h-max w-full flex text-center flex-col mt-10 text-stone-400 overflow-hidden">
        <div className="h-24 md:h-max">
          <TypeAnimation
            sequence={[
              "Collaborative Task Manager",
              2000,
              "",
              1000,
              "Collaborative Task Manager",
              2000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "31px", display: "inline-block" }}
            repeat={Infinity}
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="italic mt-4 w-80 lg:text-xl text-md font-semibold animate-fade-down animate-duration-1000 animate-normal text-stone-400">
            "Tomorrow's success starts with today's plan"
          </div>
        </div>
        <div className="h-max mt-4 items-center justify-center flex-col overflow-hidden">
          <div className="rounded-lg w-full h-full ">
            <div className="border rounded-xl border-stone-400 border-4 animate-fade-up animate-once animate-duration-700 animate-normal animate-once">
              <div className=" rounded-md mb-2 animate-fade-up animate-once animate-duration-1000 animate-normal animate-once"></div>
              <div className=" h-8 w-full animate-pulse flex items-center justify-center">
                <div className="bg-stone-400 rounded-full mt-8 h-6 w-2/12 animate-fade-up animate-once animate-duration-1000 animate-normal text-black"></div>
              </div>
              <div className="h-full w-full ml-4 block "></div>
              <div className="animate-pulse p-4">
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
                {AnimationData()}
              </div>
            </div>
          </div>
          <div className="w-full h-full flex justify-center items-center">
            <Link
              to={"/register"}
              className="border text-center w-32 h-fit p-3 mt-6 text-stone-400 rounded-lg animate-fade animate-duration-1000 animate-delay-[1800ms] animate-ease-out animate-normal"
            >
              Register Now
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
}
