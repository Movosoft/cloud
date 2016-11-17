import React from "react";
import {
    Modal,
    Upload,
    Icon,
    message,
    Button
} from "antd";
import {
    UploadParams,
    LoadingParam,
    CloudFiles,
    CloudPaths
} from "../model.js";
import {
    getPath,
    getFileList
} from "../api.js";
import Backbone from "backbone";

var UploadModal = React.createClass({
    render(){
        const Dragger = Upload.Dragger;
        const props = {
            name: "cloud",
            action: "http://101.200.129.112:9527/file/upload/",
            data: { path: getPath() + "/" },
            multiple: true,
            // listType: "picture-card",
            // onPreview: (file) => {
            //     console.info(file);
            // },
            // onRemove(file){
            //     console.info(file);
            // },
            onChange(info){
                if(info.file.status !== "uploading"){
                    //  console.log(info.file, info.fileList);
                }
                if(info.file.status === "done"){
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
                    message.success("上传成功");
                }else if(info.file.status === "error"){
                    // console.info("error");
                    message.error("上传出现异常，上传失败");
                }
            }
        };
        return (
            <Modal title="上传文件" 
                   visible={UploadParams.get("visible")}
                   onOk={this.onOk}
                   onCancel={this.onCancel}
                   footer={[
                        <Button key="submit" type="primary" size="large" onClick={this.onCancel}>
                            确定
                        </Button>,
                    ]}
            >
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <Icon type="inbox" />
                    </p>
                    <p className="ant-upload-text">点击或拖拽文件到这个区域进行上传</p>
                    <p className="ant-upload-hint">支持多文件上传。</p>
                </Dragger>
            </Modal>
        );
    },
    onCancel(){
        UploadParams.set("visible",false);
    }
});

export default UploadModal;
