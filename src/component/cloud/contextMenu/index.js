import React from "react";
import "./index.css";

var ContextMenu = React.createClass({
    render(){
        var {
            isBlank,
            display,
            x,
            y
        } = this.props;
        if(display){
            if(isBlank){
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
