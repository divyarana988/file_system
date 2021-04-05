let fs = require("fs");
let path = require("path");


function fileChecker(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function readcontent(dirpath) {
    return fs.readdirSync(dirpath);
}

function viewFlat(dirpath, toprint) {
    let isfile = fileChecker(dirpath);
    if (isfile == true) {
        console.log(toprint + "*");
    } else {
        console.log(toprint);

        let children = readcontent(dirpath);
        for (let i = 0; i < children.length; i++){
            let childpath = dirpath + "\\" + children[i];
            viewFlat(childpath, toprint + "\\" + children[i]);
        }
       // console.log(children);
    }
}
let input = process.argv.slice(2);
let strArr = input[0].split("\\");
let toprint = strArr.pop();
viewFlat(input[0], toprint);




/*function viewFlat(dirPath) {

    let isFile = fileChecker(dirPath);
    if (isFile == true) {
        console.log(dirPath + "*");
    } else {
        
        //directory console.log(print path + get childrens)
        console.log(dirPath);
        //to get children 
        let childrens = readcontent(dirPath);
        //call for viewFlat 
        for (let i = 0; i < childrens.length; i++){
            viewFlat(dirPath + "/" + childrens[i]);
        }
        //console.log("childrens: ", childrens)
    }
}
viewFlat("d10");
*/