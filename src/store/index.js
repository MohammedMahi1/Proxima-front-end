import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import authSlice from "./authSlice"
import postSlice from "./postSlice"


const store = configureStore({
    reducer: {
        user: userSlice,
        auth: authSlice,
        post: postSlice,
    }
})

export default store