export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "SIGNIN":
      return action.payload;
    case "SIGNOUT":
      return null;
    default:
      return state;
  }
}