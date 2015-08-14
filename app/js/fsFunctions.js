var fs = require("fs");
var Path = require('path');

function getUserDataPath() {  
    
    return Path.dirname(process.execPath);
    
}