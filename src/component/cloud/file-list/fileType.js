export default function fileType(ext,isFolder){
    if(isFolder){
        return "folder";
    }

    function has(arr,value){
        return arr.indexOf(value) !== -1;
    };

    const code = [
        ".txt",
        ".js",
        ".css",
        ".less",
        ".scss",
        ".html",
        ".sh",
        ".py"
    ];

    if(has(code,ext)){
        return "code";
    }

    const img = [
        ".jpg",
        ".png",
        ".gif"
    ];

    if(has(img,ext)){
        return "code";
    }

    const unknow = "question-circle-o";

    return unknow;
};