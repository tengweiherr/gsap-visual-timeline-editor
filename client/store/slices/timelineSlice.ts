import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Timeline } from "../../types";

const initialState:Timeline = {
    name: "default",
    duration: 15,
    delay: 0,
    repeat: false,
    repeatTimes: undefined,
    repeatDelay: undefined,
    reversed: false,
    yoyo: false,
    yoyoEase: undefined,
    timeScale: 1,
    defaults: false,
    defaultsDuration: 1,
    defaultsEase: undefined,
    parentId: undefined
};

export const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {

    // createTimeline: (state, action) => {
    //     return action.payload;
    // },

    updateTimeline: (state, action) => {
      return state = action.payload;
    },

    // deleteObject: (state, action) => {
    //   return state.filter((object) => object.objectId !== action.payload.objectId);
    // }

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

export const { updateTimeline } = timelineSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default timelineSlice.reducer;