import React from "react";
import {
    Router,
    Route,
    hashHistory
} from "react-router"

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
            file: [],
            path: [],
            loading: false,
            active: "",
            contextMenu: {
                isBlank: true,
                display: false,
                x: 0,
                y: 0
            }
        };
    },
    render(){
        return (
            <div className="app" onContextMenu={(e)=>e.preventDefault()} onMouseDown={this.mouseDown}>
                <h3 className="app-title">Cloud-云盘</h3>
                <Nav value={this.state.path}/>
                <FileList
                    file={this.state.file}
                    path={this.state.path}
                    loading={this.state.loading}
                    onPick={(name)=>this.setState({ active: name })}
                    active={this.state.active}
                    contextMenu={(display,isBlank,x,y)=>this.setState({
                        contextMenu:{
                            display: display,
                            isBlank: isBlank,
                            x: x,
                            y: y
                        }
                    })}
                />
                <ContextMenu
                    isBlank={this.state.contextMenu.isBlank}
                    display={this.state.contextMenu.display}
                    x={this.state.contextMenu.x}
                    y={this.state.contextMenu.y}
                />
            </div>
        );
    },
    componentDidMount(){
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
        this.setState({
            loading: true
        });
        var that = this;
        getFileList(path,function(data){
            that.setState({
                file: data.file,
                path: data.path.split("/"),
                loading: false
            });
        },function(error){
            console.log(error);
        });
    },
    mouseDown(e){
        this.setState({
            active: ""
        });
        if(e.button === 2){
            this.setState({
                contextMenu: {
                    isBlank: true,
                    display: true,
                    x: e.clientX,
                    y: e.clientY
                }
            });
        }else{
            this.setState({
                contextMenu: {
                    display: false
                }
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
