import ReactDOM from 'react-dom';
import Base from './base/Base';
import {BrowserRouter} from "react-router-dom";
import React from "react";
import {Provider} from "react-redux";
import store from "./store/store";

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Base/>
        </Provider>
    </BrowserRouter>
    ,
    document.getElementById('root'),
);
