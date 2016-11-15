import $ from "jquery";

const HOST = "http://101.200.129.112:9527";
const GET_FILE = HOST + "/file/get/";
const NEW_FOLDER = HOST + "/file/mkdir/";

export function getFileList(path,successCb,errorCb){
    $.ajax({
        url: GET_FILE,
        data: {
            path: path
        },
        dataType: "json",
        success: function(data, textStatus){
            // console.info(data);
            successCb(data);
        },
        error: function(xhr, textStatus, errorThrown){
            errorCb(textStatus+errorThrown);
        }
    });
};

export function newFolder(params,successCb,errorCb){
    $.ajax({
        url: NEW_FOLDER,
        data: {
            name: params.name,
            path: params.path
        },
        dataType: "json",
        success: function(data, textStatus){
            successCb(data);
        },
        error: function(xhr, textStatus, errorThrown){
            errorCb(textStatus+errorThrown);
        }
    });
};
