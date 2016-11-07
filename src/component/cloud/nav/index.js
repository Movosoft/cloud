import React from "react";
import {
    Breadcrumb,
    Icon
} from "antd";
import { Link } from "react-router";

var Nav = React.createClass({
    render(){
        const {
            value
        } = this.props;
        var to = "";
        const nodes = value.map(function(o,i){
            to += "/" + o;
            return (
                <Breadcrumb.Item key={i}>
                    <Link to={to}>{o}</Link>
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
