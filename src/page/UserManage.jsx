import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

function UserManage() {
  const [userData, setUserData] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const totalPages = Math.ceil(userData.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Array.isArray(userData)
    ? userData.slice(indexOfFirstUser, indexOfLastUser)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch data from the backend
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${api}/admin/get-users`);
        console.log("User Data", res.data);
        setUserData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
  }, [fetchTrigger]);

  const togglePopup = (user) => {
    setShowPopup(!showPopup);
    setSelectedUser(user);

    // Toggle body scrolling
    document.body.style.overflow = showPopup ? "auto" : "hidden";
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleEdit = () => {
    togglePopup();
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to delete this massage?");
    if (confirmed) {
      try {
        await axios.delete(`${api}/admin/delete-user/${id}`);
        setFetchTrigger((prev) => prev + 1);
        console.log("User deleted successfully");
        // Handle successful deletion
      } catch (error) {
        console.error("Error deleting massage:", error);
        // Handle error
      }
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav className="z-20" />
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto h-full">
        <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] my-[30px]">
          Manage Users
        </p>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1440px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#C0A172] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          {userData.length > 0 && (
            <table className="table text-[#C0A172] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-white md:rounded-t-md">
              <thead className="table-header-group">
                <tr className="md:table-row hidden">
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Name
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Email
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                    Role
                  </th>
                  <th className="h-[70px] table-cell text-left align-middle px-4"></th>
                </tr>
              </thead>
              <tbody className="table-row-group">
                {currentUsers.map((user, index) => (
                  <React.Fragment key={index}>
                    <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row hover:bg-[#DBDBDB] transition-all duration-300">
                      <td className="max-w-[90px] sm:max-w-[130px] md:max-w-[200px] h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex items-center">
                          <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#C0A172] rounded-full flex justify-center items-center mr-[8px]">
                            <img
                              key={index}
                              src={user.image_name}
                              alt="Event"
                              className="object-cover min-h-[45px] min-w-[45px] h-full w-full rounded-full"
                            />
                          </div>
                          <p className="truncate overflow-hidden whitespace-nowrap">
                            {user.username}
                          </p>
                        </div>
                      </td>

                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.email}
                      </td>

                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        {user.role}
                      </td>
                      <td className="h-[70px] table-cell text-left align-middle px-4">
                        <div className="flex justify-end">
                          <Link
                            to={`/edituser/${user.id}`}
                            className="transition-all text-white duration-300 hover:bg-[#7d6137] min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center"
                          >
                            <IconCom icon="edit" />
                          </Link>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="transition-all text-white duration-300 bg-[#FF5757] ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full hover:bg-[#942423] rounded-lg flex justify-center items-center"
                          >
                            <IconCom icon="trash" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#C0A172] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172] transition-all duration-300"
            >
              <IconCom icon="right" size="22" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManage;
