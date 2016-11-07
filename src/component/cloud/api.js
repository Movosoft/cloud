import $ from "jquery";

export function getFileList(path,successCb,errorCb){
    const HOST = "http://101.200.129.112:9527";
    const GET_FILE = HOST + "/file/get/";
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