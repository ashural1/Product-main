// react imports
import { useRef } from "react";

// axios
import axiosClient from "../utils/axios";

// slices
import { login as loginAction } from "../features/userSlice";

// react redux
import { useDispatch } from "react-redux";

// rrd imports
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const login = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/auth/login", {
        username: login.current.value,
        password: password.current.value,
      })
      .then((data) => dispatch(loginAction(data.data)))
      .catch((error) => console.log(error));
  };

  return (
    <div className="grid w-full ">
<div className="  bg-center  bg-no-repeat lg:bg-none grid place-items-center min-h-screen">


 <form onSubmit={handleSubmit} className="flex flex-col bg-[#fff] items-center gap-5 card   w-96 p-5">
 <h2 className="text-4xl font-bold text-center ">
 Login
 </h2>
 <div>
  <label className="block ">Username</label>
   <input
    className=" w-[250px] p-3 border rounded-lg focus:outline-none bg-[#fff]  "
    type="text"
    ref={login}
    placeholder=" username"
  />
</div>
<div>
  <label className="block ">Password</label>
  <input
    className=" w-[250px] p-3 border  rounded-lg focus:outline-none focus:ring-2 bg-[#fff] "
    type="password"
    ref={password}
    placeholder=" password"
  />
</div>
<button className="aycon w-[250px] bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out">
  Submit
</button>
<p className="text-center  mt-4">
Don't have an account?{" "}
<Link to="/register" className="text-purple-600 hover:underline">
  Sign up
</Link>
</p>
</form>

</div>
</div>
  );
}

export default Login;



 


{/* <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
Welcome Back
</h2>
<form onSubmit={handleSubmit} className="space-y-6">
<div>
  <label className="block text-gray-700">Username</label>
  <input
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    type="text"
    ref={login}
    placeholder="Enter your username"
  />
</div>
<div>
  <label className="block text-gray-700">Password</label>
  <input
    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    type="password"
    ref={password}
    placeholder="Enter your password"
  />
</div>
<button className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 ease-in-out">
  Submit
</button>
</form>
<p className="text-center text-gray-600 mt-4">
Don't have an account?{" "}
<Link to="/register" className="text-purple-600 hover:underline">
  Sign up
</Link>
</p> */}