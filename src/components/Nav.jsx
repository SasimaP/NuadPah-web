// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import IconCom from "./IconCom";
import { useNavigate, Link } from "react-router-dom";

function Nav() {
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const mockUserData = {
    valid: true,
    username: "JohnDoe",
    role: "admin", // Can change to "user" to test different roles
  };

  useEffect(() => {
    // Simulating API response with setTimeout
    setTimeout(() => {
      if (mockUserData.valid) {
        setName(mockUserData.username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 500); // Mocking network delay
  }, []);

  const handleLogout = () => {
    // Resetting user state
    setName("");
    setIsLoggedIn(false);
    navigate("/");
  };

  const hundleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div
      className={`w-full min-h-[60px] bg-[#C0A172] font-kanit text-white top-0 z-50 ${
        open ? "sticky mb-[-60px] !important" : "fixed"
      }`}
    >
      <div className="max-w-[1440px] mx-auto h-full bg-[#C0A172] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <a href="/">
            <img src="/images/logo.png" className="w-[50px]" alt="" />
          </a>
          <div className="flex items-center">
            <Link
              to="/singlemanage"
              className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/singlemanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"
              }`}
            >
              จัดการท่านวดเดี่ยว
            </Link>
            <Link
              to="/setofmanage"
              className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/setofmanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"
              }`}
            >
              จัดการเซตท่านวด
            </Link>
            <Link
              to="/usermanage"
              className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/usermanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"
              }`}
            >
              จัดการผู้ใช้
            </Link>
            <Link
              to="/reportmanage"
              className={`h-full ml-[20px] transition-all duration-100 px-3 py-2 text-[12px] sm:text-[14px] md:text-[18px] ${
                location.pathname === "/reportmanage"
                  ? "border-b-4 border-white"
                  : "hover:border-b-4"
              }`}
            >
              จัดการรายงาน
            </Link>
          </div>
          {/* nav-link */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {isLoggedIn ? (
                <>
                  <p className="text-slate-200 text-[20px] font-medium px-3 py-2">
                    ยินต้อนรับ, {name.toUpperCase()}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="transition-all duration-500 bg-[#942423] text-slate-200 hover:bg-[#7D1D1C] hover:text-white px-3 py-2 rounded-md text-[20px] font-medium"
                  >
                    ออกจากระบบ
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/signup"
                    className="transition-all duration-500 bg-black text-slate-200 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-md text-[20px] font-medium"
                  >
                    สมัครบัญชี
                  </a>
                  <a
                    href="/login"
                    className="transition-all duration-500 text-slate-200 hover:bg-[#C0A172] hover:text-white px-3 py-2 rounded-md text-[20px] font-medium"
                  >
                    เข้าสู่ระบบ
                  </a>
                </>
              )}
            </div>
          </div>
          {/* humburger button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={hundleMenu}
              className="inline-flex items-center justify-center p-2 
                        rounded-md text-slate-200 hover:text-white hover:bg-[#C0A172] focus:outline-none 
                        focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#C0A172] focus:ring-white"
            >
              <span className="sr-only">หน้าหลัก</span>
              {open ? (
                <IconCom icon="x" size="25" />
              ) : (
                <IconCom icon="bars" size="25" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* mobile-menu */}
      {open && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isLoggedIn ? (
              <>
                <p className="text-slate-200 text-[20px] font-medium block px-3 py-2 text-start">
                  {name.toUpperCase()}
                </p>
                <a
                  onClick={handleLogout}
                  className="text-slate-200 hover:bg-[#FF5757] bg-[#FF5757]
                  hover:text-white block px-3 py-2 rounded-md text-[20px] font-medium text-start"
                >
                  ออกจากระบบ
                </a>
              </>
            ) : (
              <>
                <a
                  href="/signup"
                  className="transition-all duration-500 bg-black block text-slate-200 hover:bg-slate-900 hover:text-white px-3 py-2 rounded-md text-[20px] font-medium text-start"
                >
                  สมัครบัญชี
                </a>
                <a
                  href="/login"
                  className="transition-all duration-500 block text-slate-200 hover:bg-[#C0A172] hover:text-white px-3 py-2 rounded-md text-[20px] font-medium text-start"
                >
                  เข้าสู่ระบบ
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
export default Nav;
