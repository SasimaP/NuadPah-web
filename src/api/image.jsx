import api from "../axios";

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

export { deleteSingleMassage };
