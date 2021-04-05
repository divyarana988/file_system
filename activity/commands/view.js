let fs = require("fs");
let path = require("path");

function view(dirname, mode) {
    if (mode == "tree") {
        viewTree(dirname, "");
        console.log("tree view implemented");
    } else if (mode == "flat") {
        viewFlat(path);
        console.log("flat view implemented");
    } else {
        console.log("wrong mode")
    }
}

function fileChecker(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function readcontent(dirpath) {
    return fs.readdirSync(dirpath);
}

function viewFlat(dirpath, toprint) {
    let isFile = fileChecker(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let children = readcontent(dirpath);

        for (let i = 0; i < children.length; i++){
            let childPath = path.join(dirpath, children[i]);
            viewFlat(childPath, toprint + "/" + children[i]);
        }
    }
}

function viewTree(dirpath, indent) {
    let isFile = fileChecker(dirpath);
    if (isFile == true) {
        //let strArr = dirpath.split("\\");
        //let toprint = strArr.pop();
        //this work can also be done by path.basename().
        console.log(indent ,path.basename(dirpath) + "*")
    } else {
         //let strArr = dirpath.split("\\");
         //let toprint = strArr.pop();
        console.log(indent, path.basename(dirpath));
        let content = readcontent(dirpath);

        for (let i = 0; i < content.length; i++){
            //let children = dirpath + "\\" + content[i];
            //alternative of this is path.join.
            let children = path.join(dirpath , content[i]);
            viewTree(children, indent + "\t");
        }
    }
}

module.exports = {
    view: view
}