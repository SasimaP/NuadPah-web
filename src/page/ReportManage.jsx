import React, { useEffect, useState } from "react";
import IconCom from "../components/IconCom";
import Nav from "../components/Nav";
import axios from "axios";

import { Link } from "react-router-dom";

function ReportManage() {
  const [reportData, setReportData] = useState([]);

  const [fetchTrigger, setFetchTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const reportPerPage = 10;
  const totalPages = Math.ceil(reportData.length / reportPerPage);
  const indexOfLastReport = currentPage * reportPerPage;
  const indexOfFirstReport = indexOfLastReport - reportPerPage;
  const report = Array.isArray(reportData)
    ? reportData.slice(indexOfFirstReport, indexOfLastReport)
    : [];

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://senuadpahdocker-production.up.railway.app/admin/reports"
        ); // Replace with your API endpoint
        console.log("Report Data", res.data);
        setReportData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
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
        await axios.delete(
          `https://senuadpahdocker-production.up.railway.app/admin/delete-report/${id}`
        );
        setFetchTrigger((prev) => prev + 1);
        console.log("Report deleted successfully");
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
          <div className="flex justify-start items-center">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px]">
              รายงานจากผู้ใช้
            </p>
          </div>
        </div>
        <div className="block sm:hidden my-[30px]">
          <div className="flex flex-col">
            <p className="font-medium text-[#C0A172] text-[35px] md:text-[40px] mb-[20px]">
              รายงานจากผู้ใช้
            </p>
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
                  รายงานที่
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  หัวข้อรายงาน
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  ชื่อผู้รายงาน
                </th>
                <th className="h-[70px] table-cell text-left align-middle px-4 font-medium">
                  สถานะ
                </th>

                <th className="h-[70px] table-cell text-left align-middle px-4"></th>
              </tr>
            </thead>
            <tbody className="table-row-group">
              {report.map((data, index) => (
                <React.Fragment key={index}>
                  <tr className="text-black border-y border-solid border-[#C0A172] hidden md:table-row hover:bg-[#DBDBDB] transition-all duration-300">
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {data.rep_id}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {data.title}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      {data.firstname} {data.lastname}
                    </td>
                    <td className="h-[70px] table-cell text-left align-middle px-4 text-[13px] font-medium text-white">
                      {(() => {
                        switch (data.status) {
                          case "Pending":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#B1B1B1] flex items-center justify-center border border-solid border-white">
                                <p>รอดำเนินการ</p>
                              </div>
                            );
                          case "Processing":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#C0A172] flex items-center justify-center border border-solid border-white">
                                <p>กำลังเดินการ</p>
                              </div>
                            );
                          case "Completed":
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#5A7654] flex items-center justify-center border border-solid border-white">
                                <p>สำเร็จ</p>
                              </div>
                            );

                          default:
                            return (
                              <div className="px-2 py-0 rounded-2xl bg-[#54174E] flex items-center justify-center border border-solid border-white">
                                <p>{data.status}</p>
                              </div>
                            );
                        }
                      })()}
                    </td>

                    <td className="h-[70px] table-cell text-left align-middle px-4">
                      <div className="flex justify-end">
                        <Link
                          to={`/editreport/${data.rep_id}`}
                          className="text-white min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#C0A172] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#C0A172]"
                        >
                          <IconCom icon="edit" />
                        </Link>
                        <button
                          onClick={() => handleDelete(data.rep_id)}
                          className="text-white ml-4 min-h-[40px] min-w-[40px] max-h-[40px] max-w-[40px] w-full h-full bg-[#FF5757] rounded-lg flex justify-center items-center transition-all duration-300 hover:bg-[#7D1D1C]"
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
    </div>
  );
}

export default ReportManage;
