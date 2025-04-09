// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";

import { signIn } from "../api/auth";

function SignIn() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const userReducer = useSelector((state) => state.user);

  const handleInput = (event) => {
    setUserData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSignIn = async () => {
    try {
      const { email, password } = userData;

      const res = await signIn(email, password);

      const token = res.data;

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error sign in:", error);
      alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleSignIn();

      const userRole = await userReducer?.userData?.role;
      console.log(`User Role from Redux : ${userRole}`);

      if (userRole === "admin") {
        navigate("/singlemanage");
        alert("เข้าสู่ระบบสำเร็จ");
      } else {
        alert("ระบบนี้สำหรับผู้ดูแลระบบเท่านั้น กรุณาติดต่อผู้ดูแลระบบ");
      }
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
