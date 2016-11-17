import React from "react";
import {
    Modal,
    Upload,
    Icon
} from "antd";
import {
    UploadParams
} from "../model.js";
import {
    getPath
} from "../api.js";

var UploadModal = React.createClass({
    render(){
        const Dragger = Upload.Dragger;
        const props = {
            name: "fileUpload",
            action: "http://101.200.129.112:9527/file/upload/",
            data: { path: getPath() },
            multiple: true,
            listType: "picture",
            onChange(info){
                if(info.file.status !== "uploading"){
                     console.log(info.file, info.fileList);
                }
                if(info.file.status === "done"){
                    console.info("done");
                }else if(info.file.status === "error"){
                    console.info("error");
                }
            }
        };
        return (
            <Modal title="上传文件" visible={UploadParams.get("visible")} onOk={this.onOk} onCancel={this.onCancel}>
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
    onOk(){
        alert("ok");
    },
    onCancel(){
        UploadParams.set("visible",false);
    }
});

export default UploadModal;
