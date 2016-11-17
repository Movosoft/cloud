import _ from "underscore";
import Backbone from "backbone";

export const CloudFiles = new Backbone.Collection();
export const CloudPaths = new Backbone.Collection();
export const LoadingParam = new Backbone.Model({
    val: false
});
// export const ActiveParam = new Backbone.Model({
//     val: ""
// });
export const ActiveParam = new Backbone.Model({
    item: {}
});
export const ContextMenuParam = new Backbone.Model({
    isBlank: true,
    display: false,
    x: 0,
    y: 0
});

export const RenameParam  = new Backbone.Model({
    item: {}
});

export const CopyItem = new Backbone.Model({
    type: "",
    item: {}
});

export const UploadParams = new Backbone.Model({
    visible: false
});

export default {
    CloudFiles,
    CloudPaths,
    LoadingParam,
    ActiveParam,
    ContextMenuParam,
    RenameParam,
    CopyItem,
    UploadParams
};
