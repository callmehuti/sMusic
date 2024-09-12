import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { post } from '../../api/index.api'
import { AxiosResponse, isAxiosError } from 'axios'
import { errorMessages } from '../../constants/error.constant'
import { setLocalStorage } from '../../utils/localStorage'
import { token } from '../../constants'

interface IBody {
  email: string
  password: string
}
interface ILoginResponse {
  accessToken: string
  userInfo: {
    id: string
    username: string
    fullName: string
    createdAt: string
  }
  error?: string
}

export const signIn = createAsyncThunk<ILoginResponse, IBody, { rejectValue: string }>(
  'user/login',
  async (body: IBody, { rejectWithValue }) => {
    try {
      const res = await post('/login', body)
      if (!res?.data?.result?.accessToken) throw new Error(res?.data?.error)
      return res.data.result
    } catch (error: any) {
      const errorMessage = error.message || 'An error occurred'
      return rejectWithValue(errorMessage)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      id: '',
      username: '',
      fullName: '',
      createdAt: ''
    },
    error: ''
  },
  reducers: {
    clearError: (state) => {
      state.error = ''
    }
    // updateUserInfo: (state, action) => {
    //   const { payload } = action;
    //   state.userInfo.username = payload.username;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action)
      const { payload } = action
      const { accessToken, userInfo } = payload

      // save to localStorage
      setLocalStorage(token.ACT, accessToken)
      // setLocalStorage(token.RFT, refreshToken);
      // save to state
      state.userInfo = userInfo
      state.error = ''
    }),
      builder.addCase(signIn.rejected, (state, action) => {
        const { payload } = action
        if (payload) state.error = payload
      })
  }
})

const { reducer, actions } = userSlice
export const { clearError } = actions
export default reducer
