var Imported = Imported || {};
Imported.TjKenMate_NoteTagEX = true;

var TjKenMate = TjKenMate || {};
TjKenMate.NoteTagEx = TjKenMate.NoteTagEx || {};

function regExpEscape(s) {
    return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1').
        replace(/\x08/g, '\\x08');
};

function compileDefines(aString){
    returnString = String(aString);
    var defineRegix = /\s?(#def|#define)\s+(\S+)\s+([^\n]*)/i;
    var defineAllRegix = /\s?(#defall|#defineall)\s+(\S+)\s+([^\n]*)/i;
    do{
        while(defineRegix.test(returnString)) {
            var match = returnString.match(defineRegix);
            returnString = returnString.replace(new RegExp(regExpEscape(match[0])+"\\n?"), "");
            returnString = returnString.replace(new RegExp("\\b"+regExpEscape(match[2])+"\\b", "g"), match[3]);
        }
        while(defineAllRegix.test(returnString)) {
            var match = returnString.match(defineAllRegix);
            returnString = returnString.replace(new RegExp(regExpEscape(match[0])+"\\n?"), "");
            returnString = returnString.replace(new RegExp(regExpEscape(match[2]), "g"), match[3]);
        }
    } while(defineRegix.test(returnString) || defineAllRegix.test(returnString) || false);
    return returnString;
}



function compileImports(aString){
    returnString = String(aString);
    var importRegex = /#import\s+((\w+|".*"))/i;
    while(importRegex.test(returnString)){
        returnString = returnString.replace(importRegex, replaceImports);
    }
    return returnString;
}


function replaceImports(notNeeded, match) {
    var xhr = new XMLHttpRequest();
    var file = String(match).replace(/^"?(.*)?"$/, "$1");
    xhr.open("GET","tjken/notetagex/" + match + ".rmvnh",false);
    try {
        xhr.send(null);
    }
    catch (err) {
        console.log("Error file expected: " + " at statnent " + notNeeded);
        return "";
    } 
    var fileContent = xhr.responseText;

    return fileContent;
}

function tjNoteTagloadFile(filename) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","tjken/notetagex/" + filename, false);
    try {
        xhr.send(null);
    }
    catch (err) {
        console.log(err);
        return "";
    } 
    var fileContent = xhr.responseText;
    return fileContent;
}

function tjDJB2Hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}

function TjmakeDirectory(SubDirctory) {
    var fs = require('fs');
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/');
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path)
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/'+SubDirctory);
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path);
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
        return true;
    }
    return false;
}

function makeHashFile(info){
    var fs = require('fs');
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/notetagex/');
    if (path.match(/^\/([A-Z]\:)/)) {
          path = path.slice(1);
    }
    path = decodeURIComponent(path);
    path = path + "hash.rmvnmh";
    fs.writeFileSync(path,info);
}

function writeCompiledFile(info, name){
    var fs = require('fs');
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/notetagex/');
    if (path.match(/^\/([A-Z]\:)/)) {
          path = path.slice(1);
    }
    path = decodeURIComponent(path);
    path = path + name;
    fs.writeFileSync(path,info);
}

function TjmakeNoteTagDataDirectory() {
    var fs = require('fs');
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/notetagex/');
    if (path.match(/^\/([A-Z]\:)/)) {
        path = path.slice(1);
    }
    path = decodeURIComponent(path)
    if(!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}


function tjCompileNoteTags(){
    var fs = require('fs');
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/notetagex/');
    if (path.match(/^\/([A-Z]\:)/)) {
          path = path.slice(1);
    }
    path = decodeURIComponent(path);
    var fileArray = fs.readdirSync(path);
    var hasher = tjNoteTagloadFile("hash.rmvnmh");
    var tempArray = [""];
    var resetupDatafolder = false;
    for(var i = 0; i < fileArray.length; i++){
        if(fileArray[i].match(/.*\.rmvns/)){
            var notetag = tjNoteTagloadFile(fileArray[i]);
            var hash = tjDJB2Hash(notetag);
            if(tempArray = hasher.match(new RegExp(regExpEscape(fileArray[i])+":\\s(\\d*)"))) {
                if(Number(tempArray[1]) != hash) {
                    notetag = compileDefines(compileImports(notetag));
                    writeCompiledFile(notetag, fileArray[i].replace(".rmvns",".rmvn"));
                    resetupDatafolder = true;
                    hasher = hasher.replace(tempArray[0], fileArray[i]+": " + hash);
                }
            } else {
                notetag = compileDefines(compileImports(notetag));
                writeCompiledFile(notetag, fileArray[i].replace(".rmvns",".rmvn"));
                resetupDatafolder = true;
                hasher = hasher + "  " + fileArray[i]+": " + hash;
            }
        }
    }
    if(resetupDatafolder){
        makeHashFile(hasher);
        path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/notetagex/');
        if (path.match(/^\/([A-Z]\:)/)) {
              path = path.slice(1);
        }
        path = decodeURIComponent(path);
        fileArray = fs.readdirSync(path);
        writeCompiledFile(fileArray, "master.rmv");
    }
}

var Tj_NoteTagEX_Scene_Boot = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Tj_NoteTagEX_Scene_Boot.call(this);
    if(Utils.isOptionValid('test')){
        TjmakeNoteTagDataDirectory()
        if(TjmakeDirectory('notetagex')) {makeHashFile("Ouchie_Ouch___DO_NOT_TOUCH_OR_YOU_MAY_BREAK_THE_FILE______________   ");}
        tjCompileNoteTags();
    }
}