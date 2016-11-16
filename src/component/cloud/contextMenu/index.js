import React from "react";
import {
    ContextMenuParam,
    CopyItem,
    CloudFiles,
    ActiveParam,
    LoadingParam,
    CloudPaths,
    RenameParam
} from "../model.js";
import _ from "underscore";
import Backbone from "backbone";
import {
    getPath,
    doAction,
    getFileList
} from "../api.js";
import "./index.css";
import {
    message,
    Modal
} from "antd";

var ContextMenu = React.createClass({
    render(){
        if(ContextMenuParam.get("display")){
            const x = ContextMenuParam.get("x");
            const y = ContextMenuParam.get("y");
            if(ContextMenuParam.get("isBlank")){
                return (
                    <ul className="context-menu" style={{left:x+"px",top:y+"px"}}>
                        <li onMouseDown={(e)=>this.mouseDown(e,"refresh")}>刷新</li>
                        <li onMouseDown={(e)=>this.mouseDown(e,"newFolder")}>新建文件夹</li>
                        {
                            _.keys(CopyItem.get("item")).length ?
                            <li onMouseDown={(e)=>this.mouseDown(e,"paste")}>粘贴</li>
                            :
                            ""
                        }
                    </ul>
                );
            }else{
                return (
                    <ul className="context-menu" style={{left:x+"px",top:y+"px"}}>
                        <li onMouseDown={(e)=>this.mouseDown(e,"refresh")}>刷新</li>
                        <li onMouseDown={(e)=>this.mouseDown(e,"rename")}>重命名</li>
                        <li onMouseDown={(e)=>this.mouseDown(e,"copy")}>复制</li>
                        <li onMouseDown={(e)=>this.mouseDown(e,"cut")}>剪切</li>
                        <li onMouseDown={(e)=>this.mouseDown(e,"delete")}>删除</li>
                    </ul>
                );
            }
        }else{
            return null;
        }
    },
    mouseDown(e,actionType){
        e.preventDefault();
        e.stopPropagation();
        console.info(actionType);
        if(actionType === "newFolder"){
            var baseName = "new folder";
            var fileName = baseName;
            var end = true;
            for(var i=1;end;i++){
                var has = _.findWhere(CloudFiles.toJSON(),{name: fileName});

                if(has){
                    fileName = baseName + i;
                }else{
                    end = false;
                }
            }
            var path = getPath();
            doAction(actionType,{
                name: fileName,
                path: path
            },function(data){
                CloudFiles.add(data);
                ContextMenuParam.set({
                    display: false
                });
                ActiveParam.set("item",data);
                message.success("成功新建文件夹[" + fileName + "]");
            },function(error){
                console.log(error);
            });
        }else if(actionType === "delete"){
            ContextMenuParam.set({
                display: false
            });
            var removeObj = ActiveParam.get("item");
            var removePath = getPath(removeObj.name);
            Modal.confirm({
                title: "是否确认删除[" + removeObj.name +"]",
                content: "删除后数据不可恢复,请确认操作!",
                onOk: function(){
                    doAction(actionType,{
                        path: removePath
                    },function(data){
                        var fileList = [];
                        _.map(CloudFiles.toJSON(),function(obj){
                            if(obj.name !== removeObj.name || obj.isFolder !== removeObj.isFolder){
                                fileList.push(obj);
                            }
                        });
                        CloudFiles.reset(fileList);
                        message.success("成功删除[" + removePath + "]");
                    },function(error){
                        console.log(error);
                    });
                }
            });
        }else if(actionType === "refresh"){
            ContextMenuParam.set({
                display: false
            });
            var currentPath = getPath();
            LoadingParam.set("val",true);
            getFileList(currentPath,function(data){
                CloudFiles.reset(data.file);
                var pathArray = data.path.split("/");
                var pathModeArray = pathArray.map(function(o){
                    return new Backbone.Model({
                        path: o
                    });
                });
                CloudPaths.reset(pathModeArray);
                LoadingParam.set("val",false);
            },function(error){
                console.log(error);
            });
        }else if(actionType === "rename"){
            RenameParam.set("item",ActiveParam.get("item"));
            ContextMenuParam.set({
                display: false
            });
        }else if(actionType === "copy" || actionType === "cut"){
            var copyName = ActiveParam.get("item").name;
            _.map(CloudFiles.toJSON(),function(obj){
                if(copyName === obj.name){
                    CopyItem.set("type",actionType);
                    CopyItem.set("item",obj);
                }
            });
            ContextMenuParam.set({
                display: false
            });
            message.success("已经复制"+copyName+"到剪切板");
        }else if(actionType === "paste"){
            var oldPath = CopyItem.get("item").path;
            var newPath = getPath(CopyItem.get("item").name);
            if(newPath !== oldPath){
                var exist = false;
                _.map(CloudFiles.toJSON(),function(obj){
                    if(obj.name === CopyItem.get("item").name && obj.isFolder === CopyItem.get("item").isFolder){
                        exist = true;
                    }
                });
                if(exist){
                    message.warning("有同名项目,不允许粘贴");
                }else{
                    var type = CopyItem.get("type");
                    doAction(actionType,{
                        type: type,
                        old_path: oldPath,
                        new_path: newPath
                    },function(data){
                        CloudFiles.add(data);
                        message.success("成功粘贴 "+CopyItem.get("item").name);
                        CopyItem.set("item",{});
                        CopyItem.set("type","");
                    },function(error){
                        console.log(error);
                    });
                }
            }else{
                message.warning("复制目录不能与粘贴目录相同");
            }
            ContextMenuParam.set({
                display: false
            });
        }
    }
});

export default ContextMenu;
