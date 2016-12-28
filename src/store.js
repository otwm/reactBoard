import {compose, applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";

export default (initialState = {}) => {
    const middleware = applyMiddleware(thunk);
    const store = createStore(
        reducers,
        initialState,
        middleware
    );
    return store;
};