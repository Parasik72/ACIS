import { combineReducers } from "redux";
import { roleReducer } from "./role.reducer";
import { tableReducer } from "./table.reducer";

export const rootReducer = combineReducers({
    table: tableReducer,
    role: roleReducer
});

export type RootState = ReturnType<typeof rootReducer>;