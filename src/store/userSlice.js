import { createSlice } from "@reduxjs/toolkit"
const initState = {
    name: "",
    email: "",
    image: null,
    imageUrl: "",
    token: localStorage.getItem('access_token'),
    friend:[],
    cover:null,
    coverHundle:false,
    coverUrl:"",
}

const userSlice = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        data: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.imageUrl = action.payload.imageUrl;
            state.image = action.payload.image;
            state.cover = action.payload.cover;
            state.coverUrl = action.payload.coverUrl;
            state.coverHundle = action.payload.coverHundle;
            state.friend = action.payload.friend
        },
    },

})
export const { data } = userSlice.actions
export default userSlice.reducer
