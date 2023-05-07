import {configureStore} from "@reduxjs/toolkit"
import todoSlice from "./todoSlice"
import { imageApi } from "./apiSlice"

const store = configureStore({
    reducer:{
        todo: todoSlice,
        [imageApi.reducerPath]: imageApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(imageApi.middleware)
})

export default store