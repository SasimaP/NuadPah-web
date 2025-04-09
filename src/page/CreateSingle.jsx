import { useState } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import { addSingleMassageDetail } from "../api/admin";

function CreateSingle() {
  const [previewImage1, setPreviewImage1] = useState(null);
  const [values, setValue] = useState({
    mt_name: "",
    mt_detail: "",
    mt_type: "",
    mt_time: "",
    mt_round: "",
  });

  const [uploadedImage, setUploadedImage] = useState(null);

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValue((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onInputChange1 = async (e) => {
    const file = e.target.files[0];
    if (file) {
      e.preventDefault();
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        const upload_response = await axios.post(
          "https://senuadpahdocker-production.up.railway.app/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(upload_response.data);

        setUploadedImage(upload_response.data);
        // console.log(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    // Preview image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage1(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage1(null);
    }
  };

  const submitImage = async (e) => {
    e.preventDefault();

    const formData = {
      mt_image_name: uploadedImage,
      ...values,
    };

    console.log(formData);
    // Send data to API
    try {
      const response = await addSingleMassageDetail(formData);
      console.log("Image:", uploadedImage);
      console.log("Data submitted successfully:", response.data);
      navigate("/singlemanage");
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
              to="/singlemanage"
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] transition-all duration-300 hover:bg-[#DBDBDB]"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">กลับ</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[20px]">
                เพิ่มท่านวดเดี่ยว
              </p>
            </div>
          </div>
          <form
            onSubmit={submitImage}
            className="mt-[10px] rounded-md bg-white w-full h-full pt-[20px] text-[14px] "
          >
            <div className="hidden md:flex w-full h-full">
              <div className="w-1/2 h-full text-black text-[14px] font-medium">
                <p className="mb-[10px]">รูป</p>
                <div className="w-full rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
                  {!previewImage1 && (
                    <div className="w-full h-full flex items-center justify-center absolute z-10">
                      <p className="text-[30px] font-medium text-black">
                        500 x 500
                      </p>
                    </div>
                  )}
                  {previewImage1 && (
                    <img
                      src={previewImage1}
                      alt="Preview 1"
                      className="object-cover h-full w-full rounded-md absolute z-20"
                    />
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onInputChange1}
                  className="px-3 py-2 my-[10px] h-[40px] w-full rounded-md bg-[#DBDBDB] flex text-black 
                file:border-0 file:bg-[#DBDBDB] file:text-[14px] file:font-medium file:text-black"
                ></input>
              </div>
              <div className="w-1/2 h-full pl-[20px] text-white text-[14px] font-medium">
                <p className="mb-[10px] text-black">ชื่อท่านวด</p>
                <input
                  type="text"
                  onChange={handleInput}
                  name="mt_name"
                  placeholder="ระบุชื่อท่านวด"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
                <p className="mt-[15px] mb-[10px] text-black">รายละเอียด</p>
                <textarea
                  type="text"
                  onChange={handleInput}
                  name="mt_detail"
                  className="w-full pl-2 pt-2 rounded-md bg-[#DBDBDB] text-black focus:outline-none
                  focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                  id=""
                  rows="8"
                  placeholder="ระบุรายละเอียด"
                ></textarea>
                <p className="mt-[15px] mb-[10px] text-black">ประเภท</p>
                <select
                  onChange={handleInput}
                  name="mt_type"
                  className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                >
                  <option>กรุณาเลือกท่านวด</option>
                  <option value="neck">คอ</option>
                  <option value="shoulder">บ่า ไหล่</option>
                  <option value="back">หลัง</option>
                  <option value="back">แขน</option>
                  <option value="shoulder">ขา</option>
                </select>
                <p className="mt-[15px] mb-[10px] text-black">
                  เวลาเรียนโดยประมาณ
                </p>
                <select
                  onChange={handleInput}
                  name="mt_time"
                  className="h-[40px] w-full rounded-md px-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                >
                  <option>กรุณาเลือกเวลา</option>
                  <option value="5">5 นาที</option>
                  <option value="10">10 นาที</option>
                  <option value="15">15 นาที</option>
                  <option value="20">20 นาที</option>
                </select>

                <p className="mt-[15px] mb-[10px] text-black">จำนวนรอบ</p>
                <input
                  type="number"
                  onChange={handleInput}
                  name="mt_round"
                  placeholder="ระบุจำนวนรอบ"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />

                <button className="h-[40px] w-full rounded-lg mt-[40px] bg-[#C0A172] text-[18px] text-center font-medium text-white transition-all duration-300 hover:bg-[#C0A172]">
                  เพิ่ม
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSingle;
