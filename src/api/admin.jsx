import api from "../axios";

const addSingleMassageDetail = async (data) => {
  try {
    const response = await api.post("/admin/add-single-massage", {
      mt_name: data["mt_name"],
      mt_type: data["mt_type"],
      mt_round: data["mt_round"],
      mt_time: data["mt_time"],
      mt_detail: data["mt_detail"],
      mt_image_name: data["mt_image_name"],
    });
    console.log("Add Single Massage response:", response);
    return response;
  } catch (error) {
    console.error("Add Single Massage Detail error:", error.response || error);
    throw error;
  }
};

const deleteSingleMassage = async (mt_id) => {
  try {
    const response = await api.delete(`/admin/delete-single-massage/:${mt_id}`);
    console.log("Delete Single Massage response:", response);
    return response;
  } catch (error) {
    console.error("Delete Single Massage error:", error.response || error);
    throw error;
  }
};

export { addSingleMassageDetail, deleteSingleMassage };
