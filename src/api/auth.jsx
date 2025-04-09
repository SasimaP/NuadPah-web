import api from "../axios";

const signInHandler = async (email, password) =>
  await api.post("/auth/signin", {
    email,
    password,
  });

export { signInHandler };
