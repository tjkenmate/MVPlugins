function compileDefines(aString){
    returnString = String(aString);
    var defineRegix = /^\s?(#def|#define)\s+(\S+)\s(([\S\s]*$))/i;
    var defineRegixEATALL = /^\s?(#def|#define)\s+(\S+)\s(([\S\s]*$)).*/i
    var defineAllRegix = /^\s?(#defall|#defineall)\\s+(\S+)\s(([\S\s]*$))/i;
    var defineAllRegixEATALL = /^\s?(#defall|#defineall)\\s+(\S+)\s(([\S\s]*$)).*/i;
    var defineBetweenRegix = /^\s?(#defbet|#definebetween)\s+(\S+)\s+(([\S\s]*$))/i;
    var defineBetweenRegixEATALL = /^\s?(#defbet|#definebetween)\s+(\S+)\s+(([\S\s]*$)).*/i;;
    var tempRegix = new RegExp("");
    var voidRegix = new RegExp("");
    var caps;
    var array;
    console.log(returnString);
    console.log(defineRegix.test(returnString));
    do{
        while(defineRegix.test(returnString)){
            console.log(returnString);
            array = returnString.replace(defineRegixEATALL, returnDefineArray);
            tempRegix = new RegExp(String("(^\s?)"+array[0].trim()+"(\s?$)"), "g");
            console.log(array);
            console.log(tempRegix);
            caps = returnString.replace(tempRegix, returnDefineArray);
            console.log(caps);
            returnString = returnString.replace(tempRegix, caps[0] + array[1] + caps[1]);
            console.log(returnString);
            returnString = returnString.replace(defineRegix, "");
            tempRegix = voidRegix;
        }
        while(defineAllRegix.test(returnString)){
            array = returnString.replace(defineAllRegixEATALL, returnDefineArray);
            tempRegix = new RegExp(String(array[0].trim()), "g");
            returnString = returnString.replace(tempRegix, array[1]);
            returnString = returnString.replace(defineAllRegix, "");
            tempRegix = voidRegix;
        }
        while(defineBetweenRegix.test(returnString)){
            array = returnString.replace(defineBetweenRegixEATALL, returnDefineArray);
            tempRegix = new RegExp(String("((\{|\}|\[|\]|\(|\)|\s|,|<|>))"+ array[0].trim() +"((\{|\}|\[|\]|\(|\)|\s|,|<|>))"), "g");
            caps = returnString.replace(tempRegix, returnDefineArray)
            returnString = returnString.replace(tempRegix, caps[0] + array[1] + caps[1]);
            returnString = returnString.replace(defineBetweenRegix, "");
            tempRegix = voidRegix;
        }
    } while(defineRegix.test(returnString)|| defineAllRegix.test(returnString) || defineBetweenRegix.test(returnString) || false);
    return returnString;
}

function returnDefineArray(notNeeded, notInput, input, output) {
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
    console.log(compileDefines(compileImports(replaceImports("test", "test", ""))));
}
//console.log(hash(aString));
