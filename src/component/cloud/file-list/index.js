import React from "react";
import {
    Icon,
    message
} from "antd";
import {
    CloudFiles,
    CloudPaths,
    LoadingParam,
    ActiveParam,
    ContextMenuParam,
    RenameParam,
    CopyItem
} from "../model.js";
import _ from "underscore";
import fileType from "./fileType.js";
import Loading from "../loading";
import "./index.css"
import { hashHistory } from "react-router";
import {
    getPath,
    doAction
} from "../api.js";
// import $ from "jquery";

var FileItem = React.createClass({
    getInitialState(){
        return {
            renameValue: this.props.name
        }
    },
    render(){
        const {
            name,
            ext,
            isFolder,
            path
        } = this.props;
        var cutTag = CopyItem.get("type") === "cut" && name === CopyItem.get("item").name && path === CopyItem.get("item").path && isFolder === CopyItem.get("item").isFolder;
        var activeTag = name === ActiveParam.get("item").name && isFolder === ActiveParam.get("item").isFolder;
        var renameTag = RenameParam.get("item").name === name && RenameParam.get("item").isFolder === isFolder;
        const type = fileType(ext,isFolder);
        return (
            <li className={activeTag ? "file-item active" : "file-item"} onDoubleClick={this.handleDoubleClick} onMouseDown={this.mousedown}>
                <span className={cutTag ? "file-item-icon file-item-cut" : "file-item-icon"}>
                    <Icon type={type}/>
                </span>
                {
                    renameTag ?
                    <input className="file-item-input" ref="fileItemInput" type="text" value={this.state.renameValue} onBlur={(e)=>this.handleRenameBlur(e)} onChange={this.handleChangeRename} onMouseDown={this.handleRenameMouseDown} />
                    :
                    <p className={cutTag ? "file-item-name file-item-cut" : "file-item-name"}>{name}</p>
                }
            </li>
        );
    },
    handleRenameMouseDown(e){
        e.stopPropagation();
    },
    handleChangeRename(e){
        this.setState({
            renameValue: e.target.value
        });
    },
    handleRenameBlur(){
        this.handleRename();
        RenameParam.set("item",{});
    },
    handleRename(){
        var newName = this.state.renameValue;
        var oldName = RenameParam.get("item").name;
        if(newName !== "" && oldName !== newName){
            doAction("rename",{
                name: newName,
                path: getPath(oldName)
            },function(data){
                var fileList = [];
                _.map(CloudFiles.toJSON(),function(obj){
                    if(obj.name === oldName){
                        fileList.push(data);
                    }else{
                        fileList.push(obj);
                    }
                });
                CloudFiles.reset(fileList);
                message.success("成功将 " + oldName + " 重命名为 " + newName + "]");
                ActiveParam.set("item",data);
            },function(error){
                console.log(error);
            });
        }
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
            name,
            isFolder
        } = this.props;
        _.map(CloudFiles.toJSON(),function(obj){
            if(obj.name === name && obj.isFolder === isFolder){
                ActiveParam.set("item",obj);
            }
        });
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
