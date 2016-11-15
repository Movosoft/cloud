import _ from "underscore";
import Backbone from "backbone";

export const CloudFiles = new Backbone.Collection();
export const CloudPaths = new Backbone.Collection();
export const LoadingParam = new Backbone.Model({
    val: false
});
export const ActiveParam = new Backbone.Model({
    val: ""
});
export const ContextMenuParam = new Backbone.Model({
    isBlank: true,
    display: false,
    x: 0,
    y: 0
});

export default {
    CloudFiles,
    CloudPaths,
    LoadingParam,
    ActiveParam,
    ContextMenuParam
};
