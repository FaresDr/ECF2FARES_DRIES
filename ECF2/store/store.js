
import { configureStore } from "@reduxjs/toolkit";
import pokeSlice from "./data";



export default store = configureStore({
    reducer: {
        pokemon: pokeSlice,


    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    }),

});