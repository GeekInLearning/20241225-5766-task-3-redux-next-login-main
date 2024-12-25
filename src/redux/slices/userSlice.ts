import { createSlice } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}
const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    loggedInUser: null,
    status: "loggedOut",
  },
  reducers: {
    register: () => {
      // Implement user registration logic here
    },
    login: (state, action) => {
      const user = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      }
    },
    logout: () => {
      // Implement user logout logic here
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: any) => state.user.loggedInUser;
export const selectUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;
