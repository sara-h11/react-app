import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import { api } from 'utils/api'

// Define a type for the slice state
interface AuthState {
  
  loading : boolean,
  token : string,
  email : string
}

// Define the initial state using that type
const initialState: AuthState = {
  
  loading : false,
  token :localStorage.getItem('token') || '',
  email : ""
}

export const login = createAsyncThunk('auth/login' ,
async (dataLogin : any) => {
  // const {page , pageSize} = thunkApi.getState() as any;
  const resp = await api.post<{token :string}>(`auth/login` , dataLogin);
  localStorage.setItem('token' , resp.data.token);
    return {
        data : resp.data,
        email : dataLogin.email
    };
    
})
export const authSlice = createSlice({
  name: 'login',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers : {
    logout : (state) => {
      state.token = "";
      state.email ="";
      localStorage.removeItem('token');
    }
  },
  extraReducers : (builder) => {
      builder.addCase( login.pending , (state) => {
        state.loading = true;
      });
      builder.addCase(login.fulfilled , (state , action) => {
        state.loading = false ;
        state.token = action.payload.data.token;
        state.email = action.payload.email
      });
      builder.addCase(login.rejected , (state , action) => {
        state.loading = true;
        console.log(action.error);
      })
  },
    // Use the PayloadAction type to declare the contents of `action.payload`
   
 
})

export const {logout } = authSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
export const authSelector = (state : RootState) => state.auth;