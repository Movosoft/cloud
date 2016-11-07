import React from "react";
import { Icon } from "antd";

import fileType from "./fileType.js";
import Loading from "../loading";
import "./index.css"
import { hashHistory } from "react-router";

var FileItem = React.createClass({
    render(){
        const {
            name,
            ext,
            isFolder,
            active
        } = this.props;
        const type = fileType(ext,isFolder);
        return (
            <li className={name === active ? "file-item active" : "file-item"} onDoubleClick={this.handleDoubleClick} onMouseDown={this.mousedown}>
                <span className="file-item-icon">
                    <Icon type={type}/>
                </span>
                <p className="file-item-name">{name}</p>
            </li>
        );
    },
    handleDoubleClick(){
        const {
            path,
            isFolder
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
            name,
            onPick,
            contextMenu
        } = this.props;
        onPick(name);
        if(e.button === 2){
            contextMenu(true,false,e.clientX,e.clientY);
        }else{
            contextMenu(false);
        }
    }
});

var FileList = React.createClass({
    render(){
        const {
            file,
            path,
            loading,
            onPick,
            active,
            contextMenu
        } = this.props;
        var nodes = file.map(function(obj){
            return (
                <FileItem
                    name={obj.name}
                    ext={obj.ext}
                    isFolder={obj.isFolder}
                    key={path+"-"+obj.name}
                    path={obj.path}
                    onPick={onPick}
                    active={active}
                    contextMenu={contextMenu}
                />
            );
        });

        return (
            <div className="file-content">
                {
                    loading ?
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
