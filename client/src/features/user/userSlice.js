import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { showToastMessage } from '../common/uiSlice'
import api from '../../utils/api'
import { initialCart } from '../cart/cartSlice'

export const loginWithEmail = createAsyncThunk(
  'user/loginWithEmail',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      sessionStorage.setItem('token', response.data.token)
      return response.data.user
    } catch (error) {
      // 실패시 생긴 에러 값을 저장
      return rejectWithValue(error.message)
    }
  }
)

export const loginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async (token, { rejectWithValue }) => {}
)

// export const logout = navigate => dispatch => {
//   dispatch(showToastMessage({ message: '로그아웃 성공', status: 'success' }))
//   sessionStorage.removeItem('token')
//   navigate(0)
// }

export const logout = createAsyncThunk('user/logout', async (_, { dispatch, rejectWithValue }) => {
  try {
    sessionStorage.removeItem('token')
    dispatch(showToastMessage({ message: '로그아웃 성공', status: 'success' }))
  } catch (error) {
    dispatch(showToastMessage({ message: '로그아웃 실패', status: 'error' }))
    return rejectWithValue(error.message)
  }
})

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password, navigate }, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post('/user', { email, name, password })
      dispatch(showToastMessage({ message: '회원가입 성공', status: 'success' }))
      navigate('/login')
      return response.data.data
    } catch (error) {
      dispatch(showToastMessage({ message: '회원가입 실패', status: 'error' }))
      return rejectWithValue(error.message)
    }
  }
)

export const loginWithToken = createAsyncThunk(
  'user/loginWithToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/user/me')
      return response.data
    } catch (error) {
      sessionStorage.removeItem('token')
      return rejectWithValue(error.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    loginError: null,
    registrationError: null,
    success: false,
  },
  reducers: {
    clearErrors: state => {
      state.loginError = null
      state.registrationError = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true
      })
      .addCase(registerUser.fulfilled, state => {
        state.loading = false
        state.registrationError = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.registrationError = action.payload
      })
      .addCase(loginWithEmail.pending, state => {
        state.loading = true
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.loginError = null
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false
        state.loginError = action.payload
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
  },
})
export const { clearErrors } = userSlice.actions
export default userSlice.reducer
