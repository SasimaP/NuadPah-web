import React, { useEffect, useState } from "react";
import IconCom from "../components/IconCom";
import Nav from "../components/Nav";

import { Link } from "react-router-dom";

import { fetchSetMassageList, deleteSetMassage } from "../api/massage";

function SetofManage() {
  const [massagedata, setMassagedata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const eventPerPage = 10;
  const totalPages = Math.ceil(massagedata.length / eventPerPage);
  const indexOfLastEvent = currentPage * eventPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventPerPage;
  const currentEvents = Array.isArray(massagedata)
    ? massagedata.slice(indexOfFirstEvent, indexOfLastEvent)
    : [];

  const [showPopup, setShowPopup] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchMassage();
  }, [fetchTrigger]);

  const fetchMassage = async () => {
    try {
      const res = await fetchSetMassageList();
      console.log("Set Massage Data", res.data);
      setMassagedata(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const togglePopup = (event) => {
    setShowPopup(!showPopup);
    setSelectedEvent(event);

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
    const confirmed = window.confirm("ยืนยันที่จะลบท่านวดนี้หรือไม่ ?");
    if (confirmed) {
      try {
        await deleteSetMassage(id);
        setFetchTrigger((prev) => prev + 1);
        console.log("Massage Set deleted successfully");
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
              เซตท่านวด
            </p>
            <Link
              to="/createset"
              className="min-h-[40px] max-h-[40px] h-full px-2 bg-[#C0A172] flex justify-center items-center rounded-md text-white font-medium transition-all duration-300 hover:bg-[#C0A172]"
            >
              + เพิ่มเซตท่านวด
            </Link>
          </div>
        </div>
        <div className="block sm:hidden my-[30px]">
          <div className="flex flex-col">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] mb-[20px]">
              เซตท่านวด
            </p>
            <Link
              to="/createset"
              className="min-h-[40px] max-h-[40px] h-full min-w-[150px] max-w-[200px] w-full bg-[#C0A172] flex justify-center items-center rounded-md text-white font-medium"
            >
              + เพิ่มเซตท่านวด
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
                หน้า {currentPage} จาก {totalPages}
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
                  ชื่อเซตท่านวด
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  เวลาเรียนโดยประมาณ
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  ประเภท
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4"></th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {currentEvents.map((event, index) => (
                <React.Fragment key={index}>
                  <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row hover:bg-[#DBDBDB] transition-all duration-300">
                    <td className="max-w-[90px] sm:max-w-[130px] md:max-w-[200px] h-[110px] table-cell text-left align-middle px-4">
                      <div className="flex items-center">
                        <div className="min-h-[90px] min-w-[90px] max-h-[90px] max-w-[90px] w-full h-full bg-[#C0A172] rounded-lg justify-start items-start mr-[8px]">
                          {/* Top section (first two images) */}
                          <div className="min-h-[45px] min-w-[90px] max-h-[45px] max-w-[90px] w-full h-full bg-[#C0A172] rounded-t-lg flex justify-start items-start">
                            {event.ms_image_names
                              .slice(0, 2)
                              .map((image, index) => (
                                <img
                                  key={index}
                                  src={image}
                                  alt="Event"
                                  className="object-cover min-h-[45px] min-w-[45px] h-full w-full rounded-md"
                                />
                              ))}
                          </div>

                          {/* Bottom section (third image) */}
                          <div className="min-h-[45px] min-w-[90px] max-h-[45px] max-w-[90px] w-full h-full bg-black rounded-b-lg flex justify-center items-center">
                            {event.ms_image_names[2] && (
                              <img
                                key={2}
                                src={event.ms_image_names[2]}
                                alt="Event"
                                className="object-cover min-h-[45px] min-w-[90px] h-full w-full rounded-md"
                              />
                            )}
                          </div>
                        </div>

                        <p className="truncate overflow-hidden whitespace-nowrap">
                          {event.ms_name}
                        </p>
                      </div>
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {`${event.ms_time} minutes`}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium">
                      {event?.ms_types?.join(", ") || "N/A"}
                    </td>

                    {/* <td className="h-[70px] table-cell text-left align-middle px-4">
                      {event.formattedCreatedAt}
                    </td> */}
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex justify-end">
                        <Link
                          to={`/editset/${event.ms_id}`}
                          className="min-h-[40px] text-white min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#C0A172]"
                        >
                          <IconCom icon="edit" />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.ms_id)}
                          className="ml-4 min-h-[40px] text-white min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#FF5757] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7D1D1C]"
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
              หน้า {currentPage} จาก {totalPages}
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
      {showPopup && (
        <>
          {/* Backdrop */}
          <div
            className="fixed top-0 left-0 w-full h-full bg-opacity-50 backdrop-filter backdrop-blur z-10"
            onClick={togglePopup}
          ></div>
          {/* Popup Content */}
          <div className="fixed z-20 bottom-0 inset-x-0 flex items-center justify-center mb-5">
            <div className="px-5 py-3 w-full h-full max-w-[420px] max-h-[170px] bg-[#C0A172] rounded-md shadow-lg text-white">
              <div className="flex justify-between py-2">
                <p className="font-medium text-[20px]">เลือก</p>
                <button
                  onClick={togglePopup}
                  className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-white text-[#C0A172] hover:bg-[#FF5757]"
                >
                  <IconCom icon="x" />
                </button>
              </div>
              <Link
                to={selectedEvent ? `/editevent/${selectedEvent._id}` : "#"}
                onClick={handleEdit}
                className="transition-all duration-300 mb-2 w-full flex items-center px-4 py-3 text-sm text-left rounded-md hover:bg-[#DBDBDB]"
              >
                <IconCom icon="edit" />
                <p className="ml-[10px] text-[16px] font-medium">แก้ไข</p>
              </Link>
              <button
                onClick={() => selectedEvent && handleDelete(selectedEvent._id)}
                className="transition-all duration-300 flex w-full items-center px-4 py-3 text-sm text-left bg-[#FF5757] rounded-md hover:bg-[#FF5757]"
              >
                <IconCom icon="trash" />
                <p className="ml-[10px] text-[16px] font-medium">ลบ</p>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SetofManage;
