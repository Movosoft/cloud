import model from "./model.js";

export default {
    setSingleDataFlow(modelName,stateName){
        var that = this;
        model[modelName].on("reset add remove change",function(){
            var obj = {};
            obj[stateName] = model[modelName].toJSON();
            that.setState(obj);
        });
    }
};