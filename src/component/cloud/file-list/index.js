import React from "react";
import { Icon } from "antd";

import {
    CloudFiles,
    CloudPaths,
    LoadingParam,
    ActiveParam,
    ContextMenuParam
} from "../model.js";
import _ from "underscore";
import fileType from "./fileType.js";
import Loading from "../loading";
import "./index.css"
import { hashHistory } from "react-router";

var FileItem = React.createClass({
    render(){
        const {
            name,
            ext,
            isFolder
        } = this.props;
        const type = fileType(ext,isFolder);
        return (
            <li className={name === ActiveParam.get("val") ? "file-item active" : "file-item"} onDoubleClick={this.handleDoubleClick} onMouseDown={this.mousedown}>
                <span className="file-item-icon">
                    <Icon type={type}/>
                </span>
                <p className="file-item-name">{name}</p>
            </li>
        );
    },
    handleDoubleClick(){
        const {
            isFolder,
            path
        } = this.props;
        if(isFolder){
            hashHistory.push(path);
        }else{
            const host = "http://101.200.129.112:9527/static/";
            window.open(host+path);
        }
    },
    mousedown(e){
        e.stopPropagation();
        const {
            name
        } = this.props;
        ActiveParam.set("val",name);
        if(e.button === 2){
            ContextMenuParam.set({
                display: true,
                isBlank: false,
                x: e.clientX,
                y: e.clientY
            });
        }else{
            ContextMenuParam.set({
                display: false
            });
        }
    }
});

var FileList = React.createClass({
    render(){
        var nodes = _.map(CloudFiles.toJSON(),function(obj){
            return (
                <FileItem
                    name={obj.name}
                    ext={obj.ext}
                    isFolder={obj.isFolder}
                    key={CloudPaths.toJSON()+"-"+obj.name}
                    path={obj.path}
                />
            );
        });
        return (
            <div className="file-content">
                {
                    LoadingParam.get("val") ?
                    (
                        <Loading />
                    )
                    :
                    (
                        <ul className="file-list">
                            {nodes}
                        </ul>
                    )
                }
                
            </div>
        );
    }
});

export default FileList;
