import api from "../axios";

const fetchSingleMassageList = async () => {
  try {
    const response = await api.get("/massage/single-list");
    console.log("Single Massage List response:", response);
    return response;
  } catch (error) {
    console.error("Fetch Single Massage List error:", error.response || error);
    throw error;
  }
};

const fetchSingleMassageDetail = async (mt_id) => {
  try {
    const response = await api.post("/massage/single-detail", {
      mt_id: mt_id,
    });
    console.log("Single Massage Detail response:", response);
    return response;
  } catch (error) {
    console.error(
      "Fetch Single Massage Detail error:",
      error.response || error
    );
    throw error;
  }
};

const fetchSetMassageList = async () => {
  try {
    const response = await api.get("/massage/set-list");
    console.log("Set Massage List response:", response);
    return response;
  } catch (error) {
    console.error("Fetch Set Massage List error:", error.response || error);
    throw error;
  }
};

const fetchSetMassageDetail = async (ms_id) => {
  try {
    const response = await api.post("/massage/set-detail", {
      ms_id: ms_id,
    });
    console.log("Set Massage Detail response:", response);
    return response;
  } catch (error) {
    console.error("Fetch Set Massage Detail error:", error.response || error);
    throw error;
  }
};

export {
  fetchSingleMassageList,
  fetchSingleMassageDetail,
  fetchSetMassageList,
  fetchSetMassageDetail,
};
