import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";

function Login() {
  const [values, setValue] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Mock login logic
    if (values.username === "admin" && values.password === "password") {
      alert("Login successful!");
      navigate("/singlemanage");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="bg-[#C0A172] w-full h-full min-h-dvh font-kanit">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[1250px] bg-[#C0A172] pt-[80px]"
      >
        <div className="mx-auto rounded-md bg-white h-[420px] w-[420px] flex flex-col items-center">
          <p className="text-[#C0A172] font-semibold text-[35px] mt-[45px]">Login</p>
          
          <input
            type="text"
            className="h-[40px] w-[340px] mt-[20px] rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            placeholder="Your username"
            onChange={handleInput}
            name="username"
          />
          <input
            type="password"
            className="h-[40px] w-[340px] mt-[20px] rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            placeholder="Your password"
            onChange={handleInput}
            name="password"
          />
          <button
            type="submit"
            className="h-[40px] w-[340px] rounded-3xl mt-[40px] bg-[#C0A172] text-center font-medium text-white"
          >
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
