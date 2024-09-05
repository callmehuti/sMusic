import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { post } from "../../api/index.api";
import { isAxiosError } from "axios";
import { errorMessages } from "../../constants/error.constant";
import { setLocalStorage } from "../../utils/localStorage";
import { token } from "../../constants";

interface IBody {
  username: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "user/login",
  async (body: IBody, { rejectWithValue }) => {
    try {
      const res = await post("/login", body);
      console.log(res);
      return res?.result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: {
      id: "",
      username: "",
      fullName: "",
      createAt: "",
    },
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    // updateUserInfo: (state, action) => {
    //   const { payload } = action;
    //   state.userInfo.username = payload.username;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action);
      const { payload } = action;
      const { accessToken, userInfo } = payload;

      // save to localStorage
      setLocalStorage(token.ACT, accessToken);
      // setLocalStorage(token.RFT, refreshToken);
      // save to state
      state.userInfo = userInfo;
      state.error = "";
    }),
      builder.addCase(signIn.rejected, (state, action) => {
        const { payload } = action;
        console.log("payload: ", payload);
        if (isAxiosError(payload)) {
          state.error = payload?.response?.data
            ?.message as keyof typeof errorMessages;
        }
      });
  },
});

const { reducer, actions } = userSlice;
export const { clearError, updateUserInfo } = actions;
export default reducer;
