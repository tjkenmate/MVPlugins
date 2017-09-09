/*:
 * @plugindesc
 * [v0.1b] Simple Verison Control plugin. Track your versions!
 * 
 * @author TJ (TjKenMate)
 *
 * @param ~~ Version ~~
 * @desc Version Settings
 * Default: 
 * @default 
 * 
 * @param Major Version
 * @desc The Major Version of your Game
 * Default: 0
 * @default 0
 * 
 * @param Minor Version
 * @desc The Minor Version of your Game
 * Default: 0
 * @default 0
 * 
 * @param Release Version
 * @desc The Release Version of your Game
 * Default: 0
 * @default 0
 * 
 * @param Window Text
 * @desc The Text To Display in the Version window. Key Codes : %n New line %M Major %m Minor %R Release %b build
 * Default: %M.%m.$b
 * @default %M.%m.$b
 * 
 * 
 * @param BuildIncrease
 * @desc Determines weather to increase the Build Version    JAVASCRPT EVAL
 * Default true
 * @default true
 * 
 * 
 * @param ~~ TitleScrenBox ~~
 * @desc Title Screen Settings
 * Default: 
 * @default 
 * 
 * @param Show Version Window
 * @desc Determines weather to Show the Build Version On the title screen   JAVASCRPT EVAL
 * Default true
 * @default true
 * 
 * @param x
 * @desc x Location of the box
 * Default: 0
 * @default 0
 * 
 * @param y
 * @desc y Location of the box
 * Default: 0
 * @default 0
 * 
 * @param Box Width
 * @desc The width of the box
 * Default: 100
 * @default 100
 * 
 * @param Box Hight
 * @desc The hight of the box
 * Default: 50
 * @default 50
 * 
 * @param Text Width
 * @desc Text Width in the box
 * Default: 28
 * @default 28
 */

 //CodeCoexistance Stuff
var Imported = Imported || {};
Imported.TjKenMate_VersionControl = true;

var TjKenMate = TjKenMate || {};
TjKenMate.VersionControl = TjKenMate.VersionControl || {};
TjKenMate.VersionControl.version = 0.1;

TjKenMate.Parameters = PluginManager.parameters('TJ_Version_Control');

TjKenMate.Param = TjKenMate.Param || {};

TjKenMate.Param.VersionControl = TjKenMate.Param.VersionControl || {};

TjKenMate.Param.VersionControl.majorver = Number(TjKenMate.Parameters['Major Version']);
TjKenMate.Param.VersionControl.minorver = Number(TjKenMate.Parameters['Minor Version']);
TjKenMate.Param.VersionControl.releasever = Number(TjKenMate.Parameters['Release Version']);
TjKenMate.Param.VersionControl.stringFormat = String(TjKenMate.Parameters['Window Text']);
TjKenMate.Param.VersionControl.BuildIncrease = eval(TjKenMate.Parameters['BuildIncrease']); 
TjKenMate.Param.VersionControl.show = eval(TjKenMate.Parameters['Show Version Window']); 
TjKenMate.Param.VersionControl.xw = Number(TjKenMate.Parameters['x']);
TjKenMate.Param.VersionControl.yw = Number(TjKenMate.Parameters['y']);
TjKenMate.Param.VersionControl.ww = Number(TjKenMate.Parameters['Box Width']);
TjKenMate.Param.VersionControl.hw = Number(TjKenMate.Parameters['Box Hight']);
TjKenMate.Param.VersionControl.wt = Number(TjKenMate.Parameters['Text Width']);

var Tj_BuildNumber = 0;

function writeVersion() {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
    if (path.match(/^\/([A-Z]\:)/)) {
          path = path.slice(1);
    }
    path = decodeURIComponent(path) + "buildNumber.txt";
    var fs = require('fs');
    fs.writeFile(path, TjKenMate.Param.VersionControl.majorver + " "
                        + TjKenMate.Param.VersionControl.minorver + " "
                        + TjKenMate.Param.VersionControl.releasever + " "
                        + Tj_BuildNumber,
                        function(err) {
          if(err) {
              return console.log(err);
          }
    })
}

function writeInital() {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
    if (path.match(/^\/([A-Z]\:)/)) {
          path = path.slice(1);
    }
    path = decodeURIComponent(path) + "buildNumber.txt";
    var fs = require('fs');
    fs.writeFile(path, TjKenMate.Param.VersionControl.majorver + " "
                        + TjKenMate.Param.VersionControl.minorver + " "
                        + TjKenMate.Param.VersionControl.releasever + " "
                        + 0,
                        function(err) {
          if(err) {
              return console.log(err);
          }
    })
}

function getBuildNumber() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET","data/buildNumber.txt",false);
    try {
        xhr.send(null);
    }
    catch (err) {
        writeInital();
    } 
    var fileContent = xhr.responseText;
    var array = fileContent.split(" ");
    for(i = 0; i < 4; i++)
        console.log(array[i]);
    if(shouldResetBuildNumber(array)) {
        return 0;
    } else {
        if(TjKenMate.Param.VersionControl.BuildIncrease)
            return Number(array[3]) + 1;
        return Number(array[3]);
    }
}

function shouldResetBuildNumber(array) {
     if(array[0] != null){
         if(Number(array[0]) != TjKenMate.Param.VersionControl.majorver)
            return true;
         if(Number(array[1]) != TjKenMate.Param.VersionControl.minorver)
            return true;
         if(Number(array[2]) != TjKenMate.Param.VersionControl.releasever)
            return true;
         return false;
     }
     return true;
}

function processString() {
    var original = TjKenMate.Param.VersionControl.stringFormat;
    var replacedMajor = original.replace("%M", String(TjKenMate.Param.VersionControl.majorver));
    var replacedMinor = replacedMajor.replace("%m", String(TjKenMate.Param.VersionControl.minorver));
    var replacedRelease = replacedMinor.replace("%R", String(TjKenMate.Param.VersionControl.releasever));
    var replacedBuild = replacedRelease.replace("$b", String(Tj_BuildNumber));
    var replaceNewLine = replacedBuild.replace("%n", "\n");
    return replaceNewLine;
}

function addTitleScreenVersion() {
    
}

var Tj_Version_Control_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Tj_BuildNumber = getBuildNumber();
    console.log(TjKenMate.Param.VersionControl.BuildIncrease);
    if(TjKenMate.Param.VersionControl.BuildIncrease)
        writeVersion();
    Tj_Version_Control_Scene_Boot_start.call(this);
}

var Tj_Version_Control_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    Tj_Version_Control_Scene_Title_create.call(this);
    if (TjKenMate.Param.VersionControl.show) {
        var window = new Window_Base(TjKenMate.Param.VersionControl.xw, TjKenMate.Param.VersionControl.yw, TjKenMate.Param.VersionControl.ww, TjKenMate.Param.VersionControl.hw);
        window.drawText(processString(), TjKenMate.Param.VersionControl.xw, TjKenMate.Param.VersionControl.yw, TjKenMate.Param.VersionControl.wt, "left");
        this.addWindow(window);
    }
}
