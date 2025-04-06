import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}

function EditSetOfMassage() {
  const [setData, setSetData] = useState({ ms_name: "", ms_detail: "" });

  const [updateMassage, setUpdateMassage] = useState([]);
  const [onToggleMT, setToggleMT] = useState([false, false, false]);
  const [singleMassages, setSingleMassages] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchSingleList();
    editSetOfMassage();
  }, []);

  const getAvailableOptions = (upmassage = null) => {
    const current_mt_ids = updateMassage
      .filter((item) => item !== null)
      .map((item) => item.mt_id);

    const available = singleMassages.filter(
      (item) => !current_mt_ids.includes(item.mt_id)
    );
    // console.log("Available Options:", result);
    if (upmassage == null) return available;

    return [upmassage].concat(available);
  };

  const removeOptions = (index) => {
    setUpdateMassage((prev) =>
      prev.map((item, i) => (i === index ? null : item))
    );
  };

  const fetchSingleList = async () => {
    try {
      const res = await axios.get(`${api}/massage/single-list`);
      const data = res.data;

      setSingleMassages(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const editSetOfMassage = async () => {
    try {
      const res = await axios.post(`${api}/massage/set-detail`, {
        ms_id: id,
      });
      const dataInSet = res.data.massageTechniqueDetails;

      while (dataInSet.length < 3) {
        dataInSet.push(null);
      }

      setSetData({
        ...setData,
        ms_name: res.data.ms_name,
        ms_detail: res.data.ms_detail,
      });

      setUpdateMassage(dataInSet);
      // console.log("Data in Set:", dataInSet);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure we are sending the correct selected values
    const allID = updateMassage
      .filter((massage) => massage !== null)
      .map((massage) => massage.mt_id);
    const allType = updateMassage
      .filter((massage) => massage !== null)
      .map((massage) => massage.mt_type);
    const allTime = updateMassage
      .filter((massage) => massage !== null)
      .reduce((total, massage) => total + massage.mt_time, 0);
    const allImage = updateMassage
      .filter((massage) => massage !== null)
      .map((massage) => massage.mt_image_name);

    // Prepare data to send
    const formData = {
      mt_ids: allID,
      ms_name: setData.ms_name,
      ms_types: allType,
      ms_time: allTime,
      ms_detail: setData.ms_detail,
      ms_image_names: allImage,
    };

    // console.log("Submit Data:", formData);
    try {
      const response = await axios.put(
        `${api}/admin/edit-set-massage/${id}`,
        formData
      );
      console.log("Data submitted successfully:", response.data);
      navigate("/setofmanage");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="bg-white w-full h-full min-h-dvh font-kanit">
      <Nav />
      <div className="mt-[120px] px-2 sm:px-4 md:px-6 lg:px-16 max-w-[1250px] mx-auto h-full flex justify-center">
        <div className="mt-[30px] w-full flex flex-col items-center">
          <div className="h-[70px] w-full flex flex-row items-center">
            <Link
              to="/setofmanage"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] transition-all duration-300 hover:bg-[#DBDBDB]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[20px]">
                Edit Set of Massage
              </p>
            </div>
          </div>
          <form
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px]"
            onSubmit={handleSubmit}
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-black text-[14px] font-medium">
                <p className="mb-[10px]">Select Single Massage</p>

                {updateMassage.map((upmassage, index) => {
                  return (
                    <div key={index} className="w-full">
                      <div
                        className="border-2 border-dashed border-[#DBDBDB] rounded-lg px-4 py-5 flex justify-between items-center cursor-pointer"
                        onClick={() =>
                          setToggleMT((prev) =>
                            prev.map((toggle, i) =>
                              i === index ? !toggle : toggle
                            )
                          )
                        }
                      >
                        {upmassage ? (
                          <div className="flex items-center gap-2">
                            <img
                              src={upmassage.mt_image_name}
                              alt={upmassage.name}
                              className="w-8 h-8 rounded"
                            />
                            <span>{upmassage.mt_name}</span>
                          </div>
                        ) : (
                          <span className="text-black">
                            Select single massage
                          </span>
                        )}
                        <ChevronDown className="w-5 h-5 text-black" />
                      </div>
                      {onToggleMT[index] && (
                        <div className="border border-[#DBDBDB] mt-2 rounded-lg shadow-lg bg-white">
                          {getAvailableOptions(upmassage).map(
                            (avlMassage, i) => (
                              <div
                                key={i}
                                className="p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100"
                                onClick={() => {
                                  if (avlMassage == upmassage) {
                                    // remove selected option
                                    removeOptions(index);
                                    setToggleMT((prev) =>
                                      prev.map((toggle, i) =>
                                        i === index ? false : toggle
                                      )
                                    );
                                    return;
                                  }
                                  const dataToBeUpdated = [...updateMassage];
                                  dataToBeUpdated[index] = avlMassage;

                                  setUpdateMassage(dataToBeUpdated);

                                  setToggleMT((prev) =>
                                    prev.map((toggle, i) =>
                                      i === index ? false : toggle
                                    )
                                  );
                                }}
                              >
                                <img
                                  src={avlMassage.mt_image_name}
                                  alt={avlMassage.mt_name}
                                  className="w-8 h-8 rounded"
                                />
                                <span>{avlMassage.mt_name}</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px] text-black">Name Set of Massage</p>
                <input
                  type="text"
                  value={setData.ms_name}
                  onChange={(e) =>
                    setSetData((prevState) => ({
                      ...prevState,
                      ms_name: e.target.value,
                    }))
                  }
                  name="ms_name"
                  placeholder="Name Massage"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
                <p className="mt-[15px] mb-[10px] text-black">Detail</p>
                <textarea
                  type="text"
                  value={setData.ms_detail}
                  onChange={(e) =>
                    setSetData((prevState) => ({
                      ...prevState,
                      ms_detail: e.target.value,
                    }))
                  }
                  name="ms_detail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                  focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                  id=""
                  rows="8"
                  placeholder="Tell about massage"
                ></textarea>

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSetOfMassage;
