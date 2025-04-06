import React, { useEffect, useState } from "react";
import IconCom from "../components/IconCom";
import Nav from "../components/Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SingleManage() {
  const navigate = useNavigate();

  const [massagedata, setMassagedata] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const api = `${import.meta.env.VITE_API_URL}`;

  const [currentPage, setCurrentPage] = useState(1);
  const eventPerPage = 10;
  const totalPages = Math.ceil(massagedata.length / eventPerPage);
  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvents = Array.isArray(massagedata)
    ? massagedata.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  useEffect(() => {
    const fetchMassage = async () => {
      try {
        const res = await axios.get(`${api}/massage/single-list`);
        console.log("Massage Data", res.data);
        setMassagedata(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMassage();
  }, [fetchTrigger]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure to delete this massage?");
    if (confirmed) {
      try {
        await axios.delete(`${api}/admin/delete-single-massage/${id}`);
        setFetchTrigger((prev) => prev + 1);
        console.log("Massage deleted successfully");
      } catch (error) {
        console.error("Error deleting massage:", error);
      }
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav className="z-20" />
      <div className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1440px] mx-auto h-full">
        <div className="hidden sm:block my-[30px]">
          <div className="flex justify-between items-center">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px]">
              Manage Single Massages
            </p>
            <Link
              to="/createsingle"
              className="min-h-[40px] max-h-[40px] h-full px-2 bg-[#C0A172] flex justify-center items-center rounded-md text-white font-medium transition-all duration-300"
            >
              + Create Massage
            </Link>
          </div>
        </div>
        <div className="block sm:hidden my-[30px]">
          <div className="flex flex-col">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] mb-[20px]">
              Manage Single Massages
            </p>
            <Link
              to="/createsingle"
              className="min-h-[40px] max-h-[40px] h-full min-w-[150px] max-w-[150px] w-full bg-[#C0A172] flex justify-center items-center rounded-md text-white font-medium"
            >
              + Create Massage
            </Link>
          </div>
        </div>
        <div className="min-h-[840px] max-h-[840px] min-w-[382px] max-w-[1440px] h-full w-full rounded-md flex flex-col">
          <div className="block md:hidden">
            <div className="w-full min-h-[70px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-t-md">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
              >
                <IconCom icon="left" size="22" />
              </button>
              <p className="text-[#C0A172] text-[16px] font-medium">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
              >
                <IconCom icon="right" size="22" />
              </button>
            </div>
          </div>
          <table className="table text-[#C0A172] text-[16px] min-h-[70px] max-h-[70px] h-full w-full items-center bg-white md:rounded-t-md">
            <thead className="table-header-group">
              <tr className="md:table-row hidden">
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Name
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Time
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Type
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  Round
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4"></th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentEvents.map((event, index) => (
                <React.Fragment key={index}>
                  <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row transition-all duration-300">
                    <td className="max-w-[90px] sm:max-w-[130px] md:max-w-[200px] h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex items-center">
                        <div className="min-h-[45px] min-w-[45px] max-h-[45px] max-w-[45px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center mr-[8px]">
                          <img
                            key={index}
                            src={event.mt_image_name}
                            alt="Event"
                            className="object-cover min-h-[45px] min-w-[45px] h-full w-full rounded-md"
                          />
                        </div>
                        <p className="truncate overflow-hidden whitespace-nowrap">
                          {event.mt_name}
                        </p>
                      </div>
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {`${event.mt_time} minutes`}
                    </td>
                    <td className="h-[70px] text-black table-cell text-left align-middle px-4 text-[13px] font-medium">
                      {event.mt_type}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.mt_round}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() =>
                            navigate(`/editsinglemassage/${event.mt_id}`)
                          }
                          className="ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] text-white w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7d6137] cursor-pointer"
                        >
                          <IconCom icon="edit" />
                        </button>
                        <button
                          onClick={() => handleDelete(event.mt_id)}
                          className="ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] text-white w-full h-full bg-[#FF5757] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7D1D1C] cursor-pointer"
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
          {/* Bottom content */}
          <div className="w-full min-h-[70px] min-w-[382px] max-h-[70px] h-full flex flex-row items-center px-4 text-white justify-between bg-white rounded-b-md">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
            >
              <IconCom icon="left" size="22" />
            </button>
            <p className="text-[#C0A172] text-[16px] font-medium">
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="transition-all duration-300 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full flex justify-center items-center rounded-lg bg-[#C0A172] text-[16px] hover:bg-[#C0A172]"
            >
              <IconCom icon="right" size="22" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleManage;
