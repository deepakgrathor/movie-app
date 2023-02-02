import axios from "axios";
import React, { useState } from "react";
import { Baseurl } from "../Baseurl";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [change, setChange] = useState(false);
  const Register = async () => {
    try {
      const res = await axios.post(`${Baseurl}register`, input);

      res.data.message
        ? alert(res.data.message)
        : alert("User Successfully Registered");
      if (!res.data.message) {
        setInput({
          email: "",
          password: "",
        });
      }
    } catch (error) {}
  };
  const LoginFunc = async () => {
    try {
      const res = await axios.post(`${Baseurl}login`, input);
      console.log(res.data, "lol")
      if (res.data.message) {
        localStorage.setItem("token", res.data.userGet.token);
        navigate("/");
      } else {
        alert(res.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div class="flex justify-start">
        <div class=" min-h-screen mx-auto w-full flex justify-center items-center">
          <div className="bg-white m-2 md:m-0 p-5 w-full lg:w-[400px] shadow-xl border border-[#1825724f] rounded-xl">
            <div>
              <div>
                <span class="text-sm text-gray-900">Welcome Back...</span>
                <h2 className="text-2xl font-semibold">
                  {change ? "Register Here" : "Login Here"}
                </h2>
              </div>

              <div className="">
                <div className="">
                  <div class="my-3">
                    <label class="block text-sm text-md mb-1" for="email">
                      Email
                    </label>
                    <input
                      class="px-4 w-full border-2 py-1 rounded-md text-sm placeholder:text-xs outline-none"
                      type="email"
                      name="password"
                      value={input.email}
                      onChange={(e) =>
                        setInput({ ...input, email: e.target.value })
                      }
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div class="my-3">
                    <label class="block text-sm text-md mb-1" for="email">
                      Password
                    </label>
                    <input
                      class="px-4 w-full border-2 py-1 rounded-md text-sm placeholder:text-xs outline-none"
                      type="password"
                      name="password"
                      value={input.password}
                      onChange={(e) =>
                        setInput({ ...input, password: e.target.value })
                      }
                      placeholder="Enter Your Password"
                    />
                  </div>
                </div>
              </div>

              <div class="">
                <button
                  onClick={change ? Register : LoginFunc}
                  class="mt-4 mb-3 w-full bg-blue-500 hover:bg-green-400 text-white py-2 text-xs rounded-md transition duration-100"
                >
                  {change ? "Register" : "Login"}
                </button>
                <h2 className="text-center">or</h2>
                <button
                  onClick={() => setChange(!change)}
                  class="mt-4 mb-3 w-full bg-red-500 hover:bg-green-400 text-white py-2 text-xs rounded-md transition duration-100"
                >
                  {change ? "Login" : "Register"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
