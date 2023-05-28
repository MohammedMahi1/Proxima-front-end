import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initState = {
    email: '',
    password: '',
    token: localStorage.getItem("access_token"),
}
const authSlice = createSlice({
    name: 'auth',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            axios({
                method: 'POST',
                data: {
                    email: action.payload.email,
                    password: action.payload.password,
                },
                url: "http://127.0.0.1:8000/api/user/login",
                headers: {
                    "Accept": "application/json"
                }
            }).then((res) => {
                localStorage.setItem("access_token", res.data.token)
                window.location.reload(true)
            }).catch((err) => {
                console.log(err.message);
            })
        },
        logout: (state,action) => {
            axios({
                method: 'DELETE',
                url: "http://127.0.0.1:8000/api/user/logout",
                headers: {
                    'Authorization': 'Bearer ' + state.token
                }
            }).then(() => {
                localStorage.removeItem('access_token');
                window.location.reload(true);
            })
        },
    },
})
export const { login, logout } = authSlice.actions
export default authSlice.reducer