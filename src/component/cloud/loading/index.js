import React from "react";
import { Icon } from "antd"

import "./index.css";

var Loading = React.createClass({
    render(){
        return (
            <div className="loading">
                <span className="loading-icon">
                    <Icon type="loading" />
                </span>
                <p>正在加载...</p>
            </div>
        );
    }
});

export default Loading;
