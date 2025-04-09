import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Nav from "../components/Nav";

import { useDispatch } from "react-redux";

import { signInHandler } from "../api/auth";

function SignIn() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleInput = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { email, password } = userData;

      const res = await signInHandler(email, password);

      dispatch({
        type: "SIGNIN",
        payload: res.data,
      });
      // // Mock SignIn logic
      // if (values.ำทฟรส === "admin" && values.password === "password") {
      //   alert("SignIn successful!");
      //   navigate("/singlemanage");
      // } else {
      //   alert("Invalid email or password");
      // }}
    } catch (error) {
      console.error("Error sign in:", error);
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div className="bg-[#C0A172] w-full h-full min-h-dvh font-kanit">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[1250px] bg-[#C0A172] pt-[80px]"
      >
        <div className="mx-auto rounded-md bg-white h-[420px] w-[420px] flex flex-col items-center">
          <p className="text-[#C0A172] font-semibold text-[35px] mt-[45px]">
            เข้าสู่ระบบ
          </p>

          <input
            type="text"
            className="h-[40px] w-[340px] mt-[20px] rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            placeholder="กรุณากรอก Gmail"
            onChange={handleInput}
            name="email"
          />
          <input
            type="password"
            className="h-[40px] w-[340px] mt-[20px] rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            placeholder="กรุณากรอกรหัสผ่าน"
            onChange={handleInput}
            name="password"
          />
          <button
            type="submit"
            className="h-[40px] w-[340px] rounded-3xl mt-[40px] bg-[#C0A172] text-center font-medium text-white"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
