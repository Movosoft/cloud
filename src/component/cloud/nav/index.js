import React from "react";
import { CloudPaths } from "../model.js";
import _ from "underscore";
import {
    Breadcrumb,
    Icon
} from "antd";
import { Link } from "react-router";

var Nav = React.createClass({
    render(){
        var to = "";
        const nodes = _.map(CloudPaths.toJSON(),function(o,i){
            to += "/" + o.path;
            return (
                <Breadcrumb.Item key={i}>
                    <Link to={to}>{o.path}</Link>
                </Breadcrumb.Item>
            );
        });
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item key="0">
                        <Link to={"/"}>
                            <Icon type="home" />root
                        </Link>
                    </Breadcrumb.Item>
                    {nodes}
                </Breadcrumb>
            </div>
        );
    }
});

export default Nav;
