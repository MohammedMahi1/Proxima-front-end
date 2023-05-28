import { createSlice } from "@reduxjs/toolkit";
const initState = {
    like: false,
    nombreLike: 0,
    nombreComment: 0,
    posts:[],
    message:""
}
const postSlice = createSlice({
    name: 'post',
    initialState: initState ,
    reducers:{
        likeHundler : (state,action)=>{
            state.like = action.payload
            console.log(state.like);
        },
        getPosts:(state,action)=>{
            state.posts = action.payload.posts
        },
        getMessage:(state,action)=>{
            state.message = action.payload.message
        }
    }
})
export const { likeHundler, getPosts, getMessage } = postSlice.actions
export default postSlice.reducer