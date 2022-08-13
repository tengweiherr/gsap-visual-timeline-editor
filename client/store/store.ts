import { configureStore, ThunkAction, Action, AnyAction, combineReducers} from "@reduxjs/toolkit";
import objectSlice from "./slices/objectSlice";
import selectedSlice from "./slices/selectedSlice";
import timelineSlice from "./slices/timelineSlice";
import { createWrapper, HYDRATE } from "next-redux-wrapper";

const combinedReducer = combineReducers({
    objects: objectSlice,
    selected: selectedSlice,
    timeline: timelineSlice
});

const reducer: typeof combinedReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return combinedReducer(state, action);
    }
};

const makeStore = () =>
  configureStore({
    reducer,
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);