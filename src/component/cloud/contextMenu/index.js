import React from "react";
import { ContextMenuParam } from "../model.js";
import "./index.css";

var ContextMenu = React.createClass({
    render(){
        if(ContextMenuParam.get("display")){
            const x = ContextMenuParam.get("x");
            const y = ContextMenuParam.get("y");
            if(ContextMenuParam.get("isBlank")){
                return (
                    <ul className="context-menu" style={{left:x+"px",top:y+"px"}}>
                        <li>新建文件夹</li>
                        <li>粘贴</li>
                    </ul>
                );
            }else{
                return (
                    <ul className="context-menu" style={{left:x+"px",top:y+"px"}}>
                        <li>重命名</li>
                        <li>复制</li>
                        <li>删除</li>
                    </ul>
                );
            }
        }else{
            return null;
        }
    }
});

export default ContextMenu;
