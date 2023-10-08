import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit"

import { isDev } from "../../config"
import { loginFetchFunction, logoutFetchFunction, registerFetchFunction, website, localhost } from "../../utils/apiCallFunctions"

export const loginThunk = createAsyncThunk('api/login', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    try {
        const response = await loginFetchFunction(body, url)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    }
})
export const logoutThunk = createAsyncThunk('api/logout', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    try {
        const response = await logoutFetchFunction(url)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    }
})
export const registerThunk = createAsyncThunk('api/register', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    try {
        const response = await registerFetchFunction(body, url)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    }
})

const initialState = {
    loginStatus: "idle",
    loginResponse: {},
    logoutStatus: "idle",
    logoutResponse: {},
    registerStatus: "idle",
    registerResponse: {}
}

const LandingPageSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginStatus = "fulfilled"
                state.loginResponse = action.payload
                console.log(action.payload)
            })
            .addCase(loginThunk.pending, (state, action) => {
                state.loginStatus = "pending"
                console.log("login pending")
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loginStatus = "rejected"
                state.loginResponse = action.payload
                console.log("error page", action.payload)
            })

            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.loginStatus = "idle"
                state.logoutStatus = "fulfilled"
                state.logoutResponse = action.payload
                console.log(action.payload)
            })
            .addCase(logoutThunk.pending, (state, action) => {
                state.logoutStatus = "pending"
                console.log("logoutStatus pending")
            })
            .addCase(logoutThunk.rejected, (state, action) => {
                state.logoutStatus = "rejected"
                state.logoutResponse = action.payload
                console.log("error page", action.payload)
            })

            .addCase(registerThunk.fulfilled, (state, action) => {
                state.registerStatus = "idle"
                state.registerResponse = action.payload
                console.log(action.payload)
            })
            .addCase(registerThunk.pending, (state, action) => {
                state.registerStatus = "pending"
                console.log("register pending")
            })
            .addCase(registerThunk.rejected, (state, action) => {
                state.registerStatus = "rejected"
                state.registerResponse = action.payload
                console.log("error page", action.payload)
            })
    }
})

export default LandingPageSlice.reducer
//export const { updateTodos, updateNews } = LandingPageSlice.actions