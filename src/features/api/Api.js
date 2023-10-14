import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit"

import { isDev, httpRequestTimout } from "../../config"
import { loginFetchFunction, logoutFetchFunction, registerFetchFunction, userVerificationFetchFunction, userUpdateFetchFunction, website, localhost } from "../../utils/apiCallFunctions"
import { apiErrorParse } from "../../utils/ErrorParseFunctions.js"


export const loginThunk = createAsyncThunk('api/login', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
    try {
        const response = await loginFetchFunction(body, url, controller.signal)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    } finally {
        clearTimeout(timeoutId)
    }
})
export const logoutThunk = createAsyncThunk('api/logout', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
    try {
        const response = await logoutFetchFunction(url, controller.signal)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    } finally {
        clearTimeout(timeoutId)
    }
})
export const registerThunk = createAsyncThunk('api/register', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
    try {
        const response = await registerFetchFunction(body, url, controller.signal)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    } finally {
        clearTimeout(timeoutId)
    }
})
export const userVerificationThunk = createAsyncThunk('api/userVerification', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
    try {
        const response = await userVerificationFetchFunction(body, url, controller.signal)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    } finally {
        clearTimeout(timeoutId)
    }
})
export const userUpdateThunk = createAsyncThunk('api/userUpdate', async (body, {rejectWithValue}) => {
    let url = isDev ? localhost : website
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), httpRequestTimout)
    try {
        const response = await userUpdateFetchFunction(body, url, controller.signal)
        const responseJSON = await response.json()
        if(response.ok) {
            return responseJSON
        }
        else {
            return rejectWithValue(responseJSON)
        }
    } catch (err) {
        return rejectWithValue(err)
    } finally {
        clearTimeout(timeoutId)
    }
})

const initialState = {
    loginStatus: "idle",
    loginResponse: {},
    loggedInUser: "",
    logoutStatus: "idle",
    logoutResponse: {},
    registerStatus: "idle",
    registerResponse: {},
    userVerificationStatus: "idle",
    userVerificationResponse: {},
    userUpdateStatus: "idle",
    userUpdateResponse: {}
}

const LandingPageSlice = createSlice({
    name: "api",
    initialState,
    reducers: {
        resetUserUpdate(state, action) {
            state.userUpdateStatus = "idle"
            state.userUpdateResponse = {}
        }
    },
    extraReducers(builder) {
        builder
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.loginStatus = "fulfilled"
                state.loginResponse = {status: action.payload.status, message: action.payload.message}
                state.loggedInUser = action.payload.username
                console.log(action.payload)
            })
            .addCase(loginThunk.pending, (state, action) => {
                state.loginStatus = "pending"
                console.log("login pending")
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.loginStatus = "rejected"
                state.loginResponse = apiErrorParse(action.payload)
                console.log("error page", action.payload)
            })

            .addCase(logoutThunk.fulfilled, (state, action) => {
                state.loginStatus = "idle"
                state.loginResponse = {}
                state.loggedInUser = ""
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
                state.logoutResponse = apiErrorParse(action.payload)
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
                state.registerResponse = apiErrorParse(action.payload)
                console.log("error page", action.payload)
            })

            .addCase(userVerificationThunk.fulfilled, (state, action) => {
                state.userVerificationStatus = "idle"
            })
            .addCase(userVerificationThunk.pending, (state, action) => {
                state.userVerificationStatus = "pending"
            })
            .addCase(userVerificationThunk.rejected, (state, action) => {
                state.userVerificationStatus = "rejected"
                state.userVerificationResponse = apiErrorParse(action.payload)
            })

            .addCase(userUpdateThunk.fulfilled, (state, action) => {
                state.userUpdateStatus = "fulfilled"
                state.userUpdateResponse = action.payload
                console.log(action.payload)
            })
            .addCase(userUpdateThunk.pending, (state, action) => {
                state.userUpdateStatus = "pending"
            })
            .addCase(userUpdateThunk.rejected, (state, action) => {
                state.userUpdateStatus = "rejected"
                state.userUpdateResponse = apiErrorParse(action.payload)
            })
    }
})

export default LandingPageSlice.reducer
export const { resetUserUpdate } = LandingPageSlice.actions