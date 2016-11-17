import $ from "jquery";
import _ from "underscore";
import {
    CloudPaths
} from "./model.js";

const HOST = "http://101.200.129.112:9527";
const GET_FILE = HOST + "/file/get";
const NEW_FOLDER = HOST + "/file/mkdir";
const REMOVE = HOST + "/file/remove";
const RENAME_FILE = HOST + "/file/rename";
const PASTE_FOR_COPY = HOST + "/file/copy";
const PASTE_FOR_CUT = HOST + "/file/move";
// const UPLOAD_FILE = HOST + "/file/upload";

export function getPath(itemName){
    var path = "";
    _.map(CloudPaths.toJSON(),function(o){
        if(path !== ""){
            path += "/";
        }
        path += o.path;
    });
    if(arguments.length > 0 && itemName != null){
        if(path !== ""){
            path += "/";
        }
        path += itemName;
    }
    return path;
};

export function getFileList(path,successCb,errorCb){
    // console.info(path);
    $.ajax({
        url: GET_FILE,
        data: {
            path: path
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

export function doAction(actionType,params,successCb,errorCb){
    var url = null;
    if(actionType === "newFolder"){
        url = NEW_FOLDER;
    }else if(actionType === "delete"){
        url = REMOVE;
    }else if(actionType === "rename"){
        url = RENAME_FILE;
    }else if(actionType === "paste"){
        if(params.type === "copy"){
            url = PASTE_FOR_COPY;
        }else if(params.type === "cut"){
            url = PASTE_FOR_CUT;
        }
    }
    $.ajax({
        url: url,
        data: params,
        dataType: "json",
        success: function(data, textStatus){
            successCb(data);
        },
        error: function(xhr, textStatus, errorThrown){
            errorCb(textStatus+errorThrown);
        }
    });
};
