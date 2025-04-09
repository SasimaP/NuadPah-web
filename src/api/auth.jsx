import api from "../axios";

const signInHandler = async (email, password) => {
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

export { signInHandler };
