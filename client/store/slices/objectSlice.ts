import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Object } from "../../types";

const initialState:Array<Object> = [];

export const objectSlice = createSlice({
  name: "objects",
  initialState,
  reducers: {

    createObject: (state, action) => {
      state.push(action.payload);
    },

    updateObject: (state, action) => {
      return state = action.payload;
    },

    deleteObject: (state, action) => {
      return state.filter((object) => object.objectId !== action.payload.objectId);
    }

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //   [HYDRATE]: (state, action) => {
    //     return {
    //       ...state,
    //       ...action.payload.auth,
    //     };
    //   },
    // },

  },
});

export const { createObject, updateObject, deleteObject } = objectSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default objectSlice.reducer;