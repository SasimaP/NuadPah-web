import api from "../axios";

const signIn = async (email, password) => {
  try {
    const response = await api.post("/auth/signin", {
      email,
      password,
    });
    console.log("Sign in response:", response);
    return response;
  } catch (error) {
    console.error("Sign in error:", error.response || error);
    throw error;
  }
};

const getUserData = async (token) => {
  try {
    const response = await api.post(
      "/auth/userdata",
      {
        userEmail: "",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("User data response:", response);
    return response;
  } catch (error) {
    console.error("Get user data error:", error.response || error);
    throw error;
  }
};

export { signIn, getUserData };
