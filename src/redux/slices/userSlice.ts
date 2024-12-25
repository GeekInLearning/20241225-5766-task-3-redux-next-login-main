import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name?: string;
  email: string;
  password: string;
  status?: USER_STATUS;
}

export const enum USER_STATUS {
  LOGGED_IN = "loggedIn",
  LOGGED_OUT = "loggedOut",
  REGISTERED = "registered",
  LOGIN_FAILED = "loginFailed",
  REGISTER_FAILED = "registerFailed",
}

export interface IStateUserSlice {
  users: User[];
  loggedInUser?: User;
  status: USER_STATUS;
}

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    status: USER_STATUS.LOGGED_OUT,
  } as IStateUserSlice,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      // Implement user registration logic here
      const user = state.users.find(
        (user: User) => user.email === action.payload.email
      );
      if (user) {
        state.loggedInUser = undefined;
        state.status = USER_STATUS.REGISTER_FAILED;
      } else {
        const newUser: User = {
          ...action.payload,
        };
        state.users.push(newUser);
        state.status = USER_STATUS.REGISTERED;
      }
    },
    login: (state, action: PayloadAction<User>) => {
      const user = state.users.find(
        (user: User) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = USER_STATUS.LOGGED_IN;
      } else {
        state.loggedInUser = undefined;
        state.status = USER_STATUS.LOGIN_FAILED;
      }
    },
    logout: (state) => {
      // Implement user logout logic here
      state.loggedInUser = undefined;
      state.status = USER_STATUS.LOGGED_OUT;
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: { user: IStateUserSlice }) =>
  state.user.loggedInUser;
export const selectUserStatus = (state: { user: IStateUserSlice }) =>
  state.user.status;

export default userSlice.reducer;
