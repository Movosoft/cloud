import React from "react";
import {
    ContextMenuParam,
    CopyItem,
    CloudFiles,
    CloudPaths,
    ActiveParam
} from "../model.js";
import _ from "underscore";
import {
    newFolder
} from "../api.js";
import "./index.css";
import {
    message
} from "antd";

var ContextMenu = React.createClass({
    render(){
        if(ContextMenuParam.get("display")){
            const x = ContextMenuParam.get("x");
            const y = ContextMenuParam.get("y");
            if(ContextMenuParam.get("isBlank")){
                return (
                    <ul className="context-menu" style={{left:x+"px",top:y+"px"}}>
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
            var path = "";
            _.map(CloudPaths.toJSON(),function(o){
                if(o.path !== ""){
                    path += "/" + o.path;
                }
            });
            console.info(path);
            newFolder({
                name: fileName,
                path: path
            },function(data){
                CloudFiles.add(data);
                ContextMenuParam.set({
                    display: false
                });
                ActiveParam.set("val",fileName);
                message.success("成功新建文件夹["+fileName+"]");
            },function(error){
                console.log(error);
            });
            console.info(fileName);
        }
    }
});

export default ContextMenu;
