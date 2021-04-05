function help() {
    console.log(`List of all the commands 
    1. node myOrder.js view <dirName> tree
    2. node myOrder.js view <dirName> flat
    3. node myOrder.js organise <dirName>
    4. node myOrder.js help
    `);
}

module.exports = {
    help: help
}