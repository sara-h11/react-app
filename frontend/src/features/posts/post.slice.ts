import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from 'store'
import { PostProps } from './PostProps'
import { api } from 'utils/api'

// Define a type for the slice state
interface PostState {
  page: number,
  pageSize : number,
  total : number ,
  loading : boolean,
  data : PostProps[]
}

// Define the initial state using that type
const initialState: PostState = {
  page: 1,
  pageSize : 10,
  total : 0,
  loading : false,
  data : []
}

export const fetchData = createAsyncThunk('posts/fetchData' ,
async ({page , pageSize} : {page :number , pageSize :number} , thunkApi) => {
  // const {page , pageSize} = thunkApi.getState() as any;
  const resp = await api.get<PostProps[]>(`posts?_page=${page}&_limit=${pageSize}`);
  
    return {data : resp.data , total : resp.headers["x-total-count"] , page , pageSize};
    
})
export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers : {
  },
  extraReducers : (builder) => {
      builder.addCase( fetchData.pending , (state) => {
        state.loading = true;
      });
      builder.addCase(fetchData.fulfilled , (state , action) => {
        state.loading = false ;
        state.data = action.payload.data;
        state.total = +action.payload.total!;
        state.page = action.payload.page;
        state.pageSize = action.payload.pageSize;
      });
      builder.addCase(fetchData.rejected , (state , action) => {
        state.loading = true;
        console.log(action.error);
      })
  },
    // Use the PayloadAction type to declare the contents of `action.payload`
   
 
})

// export const { setPage , setPageSize  } = postSlice.actions

// Other code such as selectors can use the imported `RootState` type

export default postSlice.reducer;
export const postSelector = (state : RootState) => state.posts;