import { createSlice } from "@reduxjs/toolkit";
// import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";
import { Object } from "../../types";

const initialState:Object|null = null;

export const selectedSlice = createSlice({
  name: "selected",
  initialState,
  reducers: {

    updateSelected: (state, action) => {
      return action.payload;
    },

    updateSelectedInput: (state, action) => {
      // const name = action.payload.name;
      // switch (name) {
      //   case "classname":
      //     if(state){
      //       let temp:Object = state;
      //       temp.classname = action.payload.value;
      //       return temp;
      //     }
      //     break;
      
      //   default:
      //     break;
      // }
      // return state = action.payload;
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

export const { updateSelected, updateSelectedInput } = selectedSlice.actions;

// export const getObject = (state: AppState) => state.object;

export default selectedSlice.reducer;