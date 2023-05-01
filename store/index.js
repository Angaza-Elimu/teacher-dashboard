import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { profileReducer } from "./features";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  // storage,
  storage: new CookieStorage(Cookies),
};

const reducers = combineReducers({
  profile: profileReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  middleware: [thunk],
  reducer: persistedReducer,
});
