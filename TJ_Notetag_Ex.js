function compileDefines(aString){
    returnString = String(aString);
    var defineRegix = /(#def|#define)\s+((\w+|".*"))\s(.*$|".*")\s*/i
    var defineAllRegix = /(#defall|#defineall)\s+((\w+|".*"))\s(.*$|".*")\s*/i
    var defineBetweenRegix = /(#defbet|#definebetween)\s+((\w+|".*"))\s(.*$|".*")\s*/i
    var tempRegix = new RegExp("");
    var voidRegix = new RegExp("");
    var caps;
    var array;
    do{
        while(defineRegix.test(returnString)){
            array = returnString.replace(defineRegix, returnDefineArray);
            tempRegix = new RegExp(String("(^\s?)"+array[0]+"(\s?$)"), "g");
            caps = returnString.replace(tempRegix, returnDefineArray)
            returnString = returnString.replace(tempRegix, caps[0] + array[1] + caps[1]);
            returnString = returnString.replace(defineRegix, "");
            tempRegix = voidRegix;
        }
        while(defineAllRegix.test(returnString)){
            array = returnString.replace(defineAllRegix, returnDefineArray);
            tempRegix = new RegExp(String(array[0]), "g");
            returnString = returnString.replace(tempRegix, array[1]);
            returnString = returnString.replace(defineAllRegix, "");
            tempRegix = voidRegix;
        }
        while(defineBetweenRegix.test(returnString)){
            array = returnString.replace(defineBetweenRegix, returnDefineArray);
            tempRegix = new RegExp(String("((\{|\}|\[|\]|\(|\)|\s|,|<|>))"+ array[0] +"((\{|\}|\[|\]|\(|\)|\s|,|<|>))"), "g");
            caps = returnString.replace(tempRegix, returnDefineArray)
            returnString = returnString.replace(tempRegix, caps[0] + array[1] + caps[1]);
            returnString = returnString.replace(defineBetweenRegix, "");
            tempRegix = voidRegix;
        }
    } while(defineRegix.test(returnString)|| defineAllRegix.test(returnString) || defineBetweenRegix.test(returnString) || false);
}

function returnDefineArray(notNeeded, input, output) {
    var input2 = String(input).replace(/^"?(.*)?"$/, "$1");
    var output2 = String(output).replace(/^"?(.*)?"$/, "$1");
    return [input, output];
}

function compileImports(aString){
    returnString = String(aString);
    var importRegex = /#import\s+((\w+|".*"))/i;
    while(importRegex.test(returnString)){
        returnString = returnString.replace(importRegex, replaceImports);
        console.log(returnString);
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

function tjDJB2Hash(str) {
  var hash = 5381,
      i    = str.length;

  while(i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
   * integers. Since we want the results to be always positive, convert the
   * signed int to an unsigned by doing an unsigned bitshift. */
  return hash;
}

var Tj_NoteTagEX_Scene_Boot = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Tj_NoteTagEX_Scene_Boot.call(this);
    console.log(replaceImports("test", "test", ""));
    compileImports(replaceImports("test", "test", ""));
}
//console.log(hash(aString));
