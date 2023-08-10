import { createSlice, nanoid, createAsyncThunk, current } from "@reduxjs/toolkit"
import axios from "axios"

import { todos } from "../../data/todos"
import { news } from "../../data/news"

export const getTodosAsync = createAsyncThunk('actions/getTodos', async () => {
    let spellListNames = []
    let spellList = []
    try {
        let response = await axios.get("https://www.dnd5eapi.co/api/classes/fighter")
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return []
    }
})

const getTodos = () => {
    return todos
}
const getNews = () => {
    return news
}

const initialState = {
    todos: {
        big: [],
        medium: [],
        small: []
    },
    todosUpdated: "Never",
    news: [
    ],
    newsUpdated: "Never"
}

const LandingPageSlice = createSlice({
    name: "landingPage",
    initialState,
    reducers: {
        updateTodos(state, action) {
            state.todos = getTodos()
            let test = new Date()
            state.todosUpdated = test.toLocaleTimeString() + " " + test.toLocaleDateString()
        },
        updateNews(state, action) {
            state.news = getNews()
            let test = new Date()
            state.newsUpdated = test.toLocaleTimeString() + " " + test.toLocaleDateString("en-GB", {day: "numeric", month: "long", year:"numeric"})
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                console.log(action.payload)
            })
    }
})

export default LandingPageSlice.reducer
export const { updateTodos, updateNews } = LandingPageSlice.actions