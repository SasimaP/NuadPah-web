import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import IconCom from "../components/IconCom";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}

function EditUser() {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.post(`${api}/admin/get-user`, {
          id: id,
        });
        const data = res.data;
        console.log(data);

        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
        setImage(data.image_name);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUser();
  }, [id]);

  const onInputChange1 = async (e) => {
    const file = e.target.files[0]; // Declare once
    if (file) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", file);

      try {
        const upload_response = await axios.post(
          `${api}/image/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(upload_response.data);

        setUploadedImage(upload_response.data);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      // Preview image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const updateData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      image_name: uploadedImage ? uploadedImage : imagemassage,
    };

    console.log(updateData);

    axios
      .put(`${api}/admin/edit-user/${id}`, updateData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));

    navigate("/usermanage");
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
              to={"/usermanage"}
              className="flex px-3 py-2 rounded-lg items-center border-2 border-solid border-[#C0A172] text-[#C0A172] hover:bg-[#DBDBDB] transition-all duration-300"
            >
              <IconCom icon="left" size="18" />
              <p className="ml-[2px] text-[14px]">Back</p>
            </Link>
            <div className="ml-[15px] flex flex-col justify-evenly h-full">
              <p className="text-[#C0A172] font-medium text-[16px]">
                1-{firstname}
              </p>
              <p className="text-black font-medium text-[20px]">Edit User</p>
            </div>
          </div>
          <div className="mt-[10px] rounded-md bg-white w-full -h-[760px] pt-[20px] text-[14px]">
            <p className="mb-[10px] text-black font-medium text-[14px]">
              Image
            </p>
            <div className="w-full rounded-md aspect-square bg-[#DBDBDB] my-[10px] relative">
              {!image && (
                <div className="w-full h-full flex items-center justify-center absolute z-10">
                  <p className="text-[30px] font-medium text-black">
                    500 x 500
                  </p>
                </div>
              )}
              {image && (
                <img
                  src={image}
                  alt="Preview 1"
                  className="object-cover h-full w-full rounded-md absolute z-20"
                />
              )}
              {previewImage && (
                <img
                  src={previewImage}
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
            <div className="mt-[15px] mb-[10px] flex">
              <div className="w-1/2 pr-[5px]">
                <p className="mb-[10px] text-black font-medium text-[14px]">
                  Firstname
                </p>
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  name="firstname"
                  placeholder="First Name"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
              </div>
              <div className="pl-[5px] w-1/2">
                <p className="mb-[10px] text-black font-medium text-[14px]">
                  Lastname
                </p>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  name="Last Name"
                  placeholder="Last Name"
                  className="h-[40px] w-full rounded-md pl-2 bg-[#DBDBDB] text-black focus:outline-none
                      focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
                />
              </div>
            </div>
            <p className="mt-[10px] text-black font-medium text-[14px]">
              Email
            </p>
            <input
              type="text"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#DBDBDB] text-black
              focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="mt-[10px] text-black font-medium text-[14px]">
              Change Password
            </p>
            <input
              type="password"
              className="h-[40px] w-full rounded-md my-[10px] pl-2 focus:outline-none bg-[#DBDBDB] text-black
              focus:ring-0 focus:ring-[#DBDBDB] focus:ring-offset-2 focus:ring-offset-[#C0A172]"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
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

export default EditUser;
