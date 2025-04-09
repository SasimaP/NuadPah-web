// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function EditReport() {
  const { id } = useParams();
  const [status, setStatus] = useState("");
  const [reportData, setReportData] = useState([]);

  const api = `${import.meta.env.VITE_API_URL}`;

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const navigate = useNavigate();

  // Mockup user data
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.post(`${api}/admin/report/${id}`);
        console.log("Report Data", res.data);
        setReportData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReport();
  }, [fetchTrigger]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedData = {
      status_index: parseInt(status), // Just send the numeric value
    };

    axios
      .put(`${api}/admin/update-report-status/${id}`, updatedData)
      .then((res) => {
        console.log("Report updated successfully", res.data);
        setFetchTrigger((prev) => !prev);
        navigate("/reportmanage");
      })
      .catch((error) => {
        console.error("Error updating report:", error);
      });
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <form
        onSubmit={handleUpdate}
        className="mt-[120px] px-2 sm:px-4 lg:px-6 max-w-[1250px] mx-auto h-full flex justify-center"
      >
        <div className="mt-[30px] h-[540px] w-[420px] flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to={"/reportmanage"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] hover:bg-[#DBDBDB] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[16px]">
                {reportData.rep_id}-{reportData.firstname} {reportData.lastname}
              </p>
              <p className="text-black font-medium text-[20px]">Edit Report</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-white w-full -h-[760px] pt-[20px] text-[14px]">
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {reportData.title}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {reportData.firstname} {reportData.lastname}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {reportData.dateTime ?? "2023-10-01 12:00:00"}
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              Detail Report
            </p>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              {reportData.detail}
            </p>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              name="eventtype"
              className="mt-[10px] h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
            >
              <option value="0">Pending</option>
              <option value="1">Processing</option>
              <option value="2">Completed</option>
              <option value="3">Cancelled</option>
            </select>
            <button
              type="submit"
              className="mt-[20px] h-[40px] w-full rounded-md bg-[#C0A172] font-medium text-white text-[16px] transition-all duration-300 hover:bg-[#C0A172]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditReport;
