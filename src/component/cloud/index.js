import React from "react";
import {
    Router,
    Route,
    hashHistory
} from "react-router"

import {
    CloudFiles,
    CloudPaths,
    LoadingParam,
    ActiveParam,
    ContextMenuParam,
    CopyItem,
    RenameParam
} from "./model.js";
import bindModel from "./bindModel.js";
import Backbone from "backbone";
import {
    getFileList
} from "./api.js";
import FileList from "./file-list";
import Nav from "./nav";
import ContextMenu from "./contextMenu";
import "antd/dist/antd.css"
import "./index.css";

var Cloud = React.createClass({
    getInitialState: function(){
        return {
            file: CloudFiles,
            path: CloudPaths,
            loading: LoadingParam,
            active: ActiveParam,
            contextMenu: ContextMenuParam,
            copyItem: CopyItem,
            renameParam: RenameParam
        };
    },
    mixins: [bindModel],
    render(){
        return (
            <div className="app" onContextMenu={(e)=>e.preventDefault()} onMouseDown={this.mouseDown}>
                <h3 className="app-title">Cloud-云盘</h3>
                <Nav />
                <FileList />
                <ContextMenu />
            </div>
        );
    },
    componentDidMount(){
        this.setSingleDataFlow("CloudFiles","file");
        this.setSingleDataFlow("CloudPaths","path");
        this.setSingleDataFlow("LoadingParam","loading");
        this.setSingleDataFlow("ActiveParam","active");
        this.setSingleDataFlow("ContextMenuParam","contextMenu");
        this.setSingleDataFlow("CopyItem","copyItem");
        this.setSingleDataFlow("RenameParam","renameParam");
        const {params} = this.props;
        const {splat} = params;
        // console.info("componentDidMount",splat);
        this.getFile(splat);
    },
    componentWillReceiveProps(nextProps){
        const {params} = nextProps;
        const {splat} = params;
        // console.info("componentWillReceiveProps",splat);
        this.getFile(splat);
    },
    getFile(path){
        ContextMenuParam.set({
            display: false
        });
        LoadingParam.set("val",true);
        getFileList(path,function(data){
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
    },
    mouseDown(e){
        ActiveParam.set("val","");
        if(e.button === 2){
            ContextMenuParam.set({
                isBlank: true,
                display: true,
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

var CloudRouter = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="*" component={Cloud} />
            </Router>
        );
    }
});

export default CloudRouter;
