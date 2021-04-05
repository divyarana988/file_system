let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archieves: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xyz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', 'deb']
}

function dirCreator(dirpath) {
    if (fs.existsSync(dirpath) == false) {
        fs.mkdirSync(dirpath);
    }
}

function fileChecker(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}

function readcontent(dirpath) {
    return fs.readdirSync(dirpath);
}

function getDirectoryName(dirpath) {
    let strArr = dirpath.split(".");
    let ext = strArr.pop();
    // this function will extensions of files.

    for (let key in types) {
        for (let i = 0; i < types[key].length; i++){
            if (types[key][i] == ext) {
                return key;
            }
        }
    }
    return "others";
}

function copyFiletoFolder(dirpath, destFolder) {
    let orgFileName = path.basename(dirpath);
    let destFilePath = path.join(destFolder, orgFileName);
    fs.copyFileSync(dirpath, destFilePath);
}

function OrganisedDir(dirpath, orgFilePath) {
    let isFile = fileChecker(dirpath);
    //let orgFilePath = path.join(dirpath, "organised_files");
    if (isFile == true) {
        let folderName = getDirectoryName(dirpath);
        console.log(dirpath, "->", folderName);
        let destinationFolder = path.join(orgFilePath, folderName);
        copyFiletoFolder(dirpath, destinationFolder);

    } else {
        let children = readcontent(dirpath);

        for (let i = 0; i < children.length; i++){
            let childPath = path.join(dirpath, children[i]);
            OrganisedDir(childPath, orgFilePath);
        }
    }
}

function organise(dirpath) {
    let orgFilePath = path.join(dirpath, "organised_files");
    dirCreator(orgFilePath);
    //this is create a folder - mkdirSync is used to create folders.
    for (let key in types) {
        let innerPath = path.join(orgFilePath, key);
        dirCreator(innerPath);
    }

    let otherPath = path.join(orgFilePath, "others");
    dirCreator(otherPath);
    OrganisedDir(dirpath, orgFilePath);
}

module.exports = {
    organise: organise
}