/*:
 * @plugindesc
 * [v1.1b] Verison Control plugin. Track your versions! Backup Your database!
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
 * Default: %M.%m.%b
 * @default %M.%m.%b
 * 
 * @param BuildIncrease
 * @desc Determines weather to increase the Build Version JAVASCRPT EVAL
 * (for somereason $gameTemp.isPlaytest() doesnt work, use Utils.isOptionValid('test') instead)
 * Default Utils.isOptionValid('test')
 * @default Utils.isOptionValid('test')
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
 * Default: 150
 * @default 150
 * 
 * @param Box Hight
 * @desc The hight of the box
 * Default: 100
 * @default 100
 * 
 * @param Text Width
 * @desc Text Width in the box
 * Default: 100
 * @default 100
 * 
 * @param ~~ Backup ~~
 * @desc Backup Settings
 * Default: 
 * @default 
 * 
 * @param Version Change to Backup
 * @desc A Space Seperated array of Version Changes to back up. See Help
 * Default: Major Minor Release Build
 * @default Major Minor Release Build
 *
 * @param Data To Backup
 * @desc A Space Seperated array of Jsons in /data/ to back up. use all to backup default data files. DO NOT INCLUDE THE .JSON. See Help
 * Default: all
 * @default all
 * 
 * 
 * @param Json Suffix
 * @desc Adds this string to the end of the file name. Key Codes : %M Major %m Minor %R Release %b build
 * Default _%M_%m_%b
 * @default _%M_%m_%b
 * 
 * @help
 * 
 * Version Control
 * TjKenMate
 * Version 1.1 Beta
 * 
 * ============================================================================
 * Introduction
 * ============================================================================
 * 
 * A Simple Version Control Plugin Aimed to do two things.
 * 
 * 1. A Creates a simple Version System which has incremental builds based on 
 *    when the user launches the game in playtesting modes. 
 *    It also stores the version number in a file, and displays the version 
 *    number customizably on the title screen (if enabled)
 * 
 * 2. Uses this Version System to create incremental backups of the entries in 
 *    the Database in a seperate folder by version.
 * 
 * However this system is aimed to be fully customizable and while the default 
 * implementation (other than the title screen box) I find to be the best settings
 * it is upto you to customize and change it as you see fit.
 * 
 * ============================================================================
 * Instructions
 * ============================================================================
 * 
 * In your root directorty (aka where index.hml and the rpgmaker.project file is
 * location), create a folder named tjken. Now create an addtional folder inside
 * the tjken folder named versioncontrol. 
 * 
 * This is where the backups and the version file will be stored
 * 
 * Set up the paramaters as you see fit, and thats it!
 * 
 * ============================================================================
 * Paramater Notes
 * ============================================================================
 * 
 * DO NOT USE $gameTemp.isPlaytest() as it doesnt work if you try to use it
 * the game may crash, please use Utils.isOptionValid('test') instead.
 * I have it set up to catch if you put it in by accedent, BUT NO GARENTEES
 * YOU HAVE BEEN WARNED AND WILL GET 0 SUPPORT FROM ME.
 * 
 * ANYTHING MARKED WITH SPACE SEPERATED ARRAY MUST BE INTPUTED LIKE SO
 * - "x y z" (without qoutes)
 * 
 * SINGLE SPACE ONLY
 * 
 * The following wont work
 * - "x, y, z"
 * - "x,y,z"
 * - ect
 * 
 * As for the options for data backup, any .json file present in /data folder
 * can be backed up. Example:
 * - "Actors Animations Weapons" (without qoutes)
 * 
 * if you input "all" (without qoutes) will back up the folowing .json
 * Actors Animations Armors Classes CommonEvents DataEX Enemies Items Notes
 * Skills States System Tilesets Troops Weapons Windows
 * 
 * NOTE IF YOU USE "ALL" IT WILL OVERRIDE YOUR INPUT
 * 
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version [1.1b]:
 * - Inital Release!
 * 
 * ============================================================================
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
TjKenMate.Param.VersionControl.BuildIncrease = playtesting(String(TjKenMate.Parameters['BuildIncrease'])); 
TjKenMate.Param.VersionControl.show = eval(TjKenMate.Parameters['Show Version Window']); 
TjKenMate.Param.VersionControl.xw = Number(TjKenMate.Parameters['x']);
TjKenMate.Param.VersionControl.yw = Number(TjKenMate.Parameters['y']);
TjKenMate.Param.VersionControl.ww = Number(TjKenMate.Parameters['Box Width']);
TjKenMate.Param.VersionControl.hw = Number(TjKenMate.Parameters['Box Hight']);
TjKenMate.Param.VersionControl.wt = Number(TjKenMate.Parameters['Text Width']);
TjKenMate.Param.VersionControl.restoreBackUp = eval(TjKenMate.Parameters['Restore Backup']) || false;
TjKenMate.Param.VersionControl.backupSettings = createTjBackupConfig(String(TjKenMate.Parameters['Version Change to Backup']).split(" "))
TjKenMate.Param.VersionControl.dataToBackup = String(TjKenMate.Parameters['Data To Backup']).split(" ") || [];
TjKenMate.Param.VersionControl.jsonSuffix = String(TjKenMate.Parameters['Json Suffix']);

var TJ_FirstRun = false;

var Tj_BuildNumber = 0;
var Tj_MajorVersionChange = false;
var Tj_MinorVersionChange = false;
var Tj_ReleaseVersionChange = false;
global._Tj_JsonData = [];
global._Tj_ShouldBackup = TjKenMate.Param.VersionControl.restoreBackUp;
global._Tj_JsonDataCounter = 0;

function playtesting(string) {
    if(string === '$gameTemp.isPlaytest()')
        return Utils.isOptionValid('test');
    else
        return eval(string);
}

function createTjBackupConfig(array) {
    var major = false;
    var minor = false;
    var build = false;
    var release = false
    for(var i = 0; i < array.length; i++) {
        if(array[i].toLowerCase() === "major")
            major = true;
        if(array[i].toLowerCase() === "minor")
            minor = true;
        if(array[i].toLowerCase() === "build")
            build = true;
        if(array[i].toLowerCase() === "release")
            release = true;
    }
	var config = {
        ma: major,
        mi: minor,
        r: release,
        b: build
    };
	return config;
}

global.tj_damn_parseTjData = function(data, number) {
    jsonObject = data;
    //console.log(jsonObject);
    //console.log("I am called");
    global._Tj_JsonData[number] = jsonObject;
    //console.log(global._Tj_JsonData[global._Tj_JsonDataCounter]);
    global._Tj_JsonDataCounter = global._Tj_JsonDataCounter + 1;
}

global.tj_damn_parseTjDataRestore = function(data) {
    jsonObject = data;
    //console.log(jsonObject);
    //console.log("I am called");
    //global._Tj_JsonData[global._Tj_JsonDataCounter] = jsonObject;
    //console.log(global._Tj_JsonData[global._Tj_JsonDataCounter]);
    //global._Tj_JsonDataCounter = global._Tj_JsonDataCounter + 1;
    writeBackup(true);
}

function writeVersion() {
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/versioncontrol/');
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
    var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/versioncontrol/');
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
    xhr.open("GET","tjken/versioncontrol/buildNumber.txt",false);
    try {
        xhr.send(null);
    }
    catch (err) {
        writeInital();
    } 
    var fileContent = xhr.responseText;
    var array = fileContent.split(" ");
    //for(i = 0; i < 4; i++)
        //console.log(array[i]);
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
         if(Number(array[0]) != TjKenMate.Param.VersionControl.majorver){
            Tj_MajorVersionChange = true;
            return true;
         }
         if(Number(array[1]) != TjKenMate.Param.VersionControl.minorver) {
            Tj_MinorVersionChange = true;
            return true;
         }
         if(Number(array[2]) != TjKenMate.Param.VersionControl.releasever){
            Tj_ReleaseVersionChange = true;
            return true;
         }
         return false;
     }
     return true;
}

function processString() {
    var original = TjKenMate.Param.VersionControl.stringFormat;
    var replacedMajor = original.replace("%M", String(TjKenMate.Param.VersionControl.majorver));
    var replacedMinor = replacedMajor.replace("%m", String(TjKenMate.Param.VersionControl.minorver));
    var replacedRelease = replacedMinor.replace("%R", String(TjKenMate.Param.VersionControl.releasever));
    var replacedBuild = replacedRelease.replace("%b", String(Tj_BuildNumber));
    var replaceNewLine = replacedBuild.replace("%n", "\n");
    return replaceNewLine;
}

function processJsonSuffix() {
    var original = TjKenMate.Param.VersionControl.jsonSuffix;
    var replacedMajor = original.replace("%M", String(TjKenMate.Param.VersionControl.majorver));
    var replacedMinor = replacedMajor.replace("%m", String(TjKenMate.Param.VersionControl.minorver));
    var replacedRelease = replacedMinor.replace("%R", String(TjKenMate.Param.VersionControl.releasever));
    var replacedBuild = replacedRelease.replace("%b", String(Tj_BuildNumber));
    return replacedBuild;
}

function addTitleScreenVersion() {
    
}

function backUp(fileName) {
    var pathIn = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
    if (pathIn.match(/^\/([A-Z]\:)/)) {
        pathIn = pathIn.slice(1);
    }
    var initArray = TjKenMate.Param.VersionControl.dataToBackup;
    if(String(initArray[0]).toLowerCase() === "all")
        initArray = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "DataEX",
                     "Enemies", "Items", "Notes", "Skills", "States", "System", "Tilesets", "Troops",
                     "Weapons", "Windows"];
    pathIn = decodeURIComponent(pathIn) + String(initArray[fileName] + ".json");
    //console.log(fileName);

    var fs = require('fs');
    var json = fs.readFileSync(pathIn);
    global.tj_damn_parseTjData(json, Number(fileName)); `{
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        json = JSON.stringify(obj); //convert it back to json
    }});`
}


function restoreBackUp(fileName) {
    var pathIn = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/versioncontrol/');
    if (pathIn.match(/^\/([A-Z]\:)/)) {
        pathIn = pathIn.slice(1);
    }
    var initArray = TjKenMate.Param.VersionControl.dataToBackup;
    if(String(initArray[0]).toLowerCase() === "all")
        initArray = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "DataEX",
                     "Enemies", "Items", "Notes", "Skills", "States", "System", "Tilesets", "Troops",
                     "Weapons", "Windows"];
    pathIn = decodeURIComponent(pathIn) + String(initArray[fileName] + ".json");
    //console.log(fileName);

    var fs = require('fs');
    fs.readFile(pathIn, 'utf8', function parseData(err, data) {
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        json = JSON.stringify(obj); //convert it back to json
        global.tj_damn_parseTjData(json);
    }});
}

function readBackup(restore){
    var initArray = TjKenMate.Param.VersionControl.dataToBackup;
    if(String(initArray[0]).toLowerCase() === "all")
        initArray = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "DataEX",
                     "Enemies", "Items", "Notes", "Skills", "States", "System", "Tilesets", "Troops",
                     "Weapons", "Windows"];
    if(!restore) {
        for(var i = 0; i < initArray.length; i++)
            backUp(String(i));
    }
    if(restore) {
        for(var i = 0; i < initArray.length; i++)
            restoreBackUp(String(i));
    }
}

function writeBackup(restore) {
    var fs = require('fs');
    if(!restore) {
        for(var i = 0; i < global._Tj_JsonData.length; i++) {
            //console.log(global._Tj_JsonData[i]);
            var initArray = TjKenMate.Param.VersionControl.dataToBackup;
            if(String(initArray[0]).toLowerCase() === "all")
                initArray = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "DataEX",
                             "Enemies", "Items", "Notes", "Skills", "States", "System", "Tilesets", "Troops",
                             "Weapons", "Windows"];
            var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/tjken/versioncontrol/');
            if (path.match(/^\/([A-Z]\:)/)) {
                path = path.slice(1);
            }
            path = decodeURIComponent(path) + initArray[i] + processJsonSuffix() + ".json";
            fs.writeFile(path, global._Tj_JsonData[i], 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
    }
    if(restore) {
        for(var i = 0; i < global._Tj_JsonData.length; i++) {
            //console.log(global._Tj_JsonData[i]);
            var initArray = TjKenMate.Param.VersionControl.dataToBackup;
            if(String(initArray[0]).toLowerCase() === "all")
                initArray = ["Actors", "Animations", "Armors", "Classes", "CommonEvents", "DataEX",
                             "Enemies", "Items", "Notes", "Skills", "States", "System", "Tilesets", "Troops",
                             "Weapons", "Windows"];
            var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/data/');
            if (path.match(/^\/([A-Z]\:)/)) {
                path = path.slice(1);
            }
            path = decodeURIComponent(path) + initArray[i] + processJsonSuffix() + ".json";
            fs.writeFile(path, global._Tj_JsonData, 'utf8', function(err) {
                if(err) {
                    return console.log(err);
                }
            });
        }
    }
}

function shouldBackup() {
    var tj_config = TjKenMate.Param.VersionControl.backupSettings;
    if(tj_config.b && TjKenMate.Param.VersionControl.BuildIncrease)
        return true;
    if(tj_config.ma && Tj_MajorVersionChange)
        return true;
    if(tj_config.mi && Tj_MinorVersionChange)
        return true;
    if(tj_config.r && Tj_ReleaseVersionChange)
        return true;
    return false;
}

var Tj_Version_Control_Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    Tj_Version_Control_Scene_Boot_start.call(this);
    TJ_FirstRun = true;
}

var Tj_Version_Control_Scene_Title_create = Scene_Title.prototype.create;
Scene_Title.prototype.create = function() {
    if(TJ_FirstRun) {
        Tj_BuildNumber = getBuildNumber();
        if(TjKenMate.Param.VersionControl.BuildIncrease)
            writeVersion();
        if(shouldBackup()) {
            writeBackup(false);
        }
        if(TjKenMate.Param.VersionControl.restoreBackUp) {
            readBackup(true);
        }
        else if(shouldBackup()){
            readBackup(false);
        }
        TJ_FirstRun = false;
    }
    Tj_Version_Control_Scene_Title_create.call(this);
    if (TjKenMate.Param.VersionControl.show) {
        var window = new Window_Base(TjKenMate.Param.VersionControl.xw, TjKenMate.Param.VersionControl.yw, TjKenMate.Param.VersionControl.ww, TjKenMate.Param.VersionControl.hw);
        window.drawText(processString(), TjKenMate.Param.VersionControl.xw, TjKenMate.Param.VersionControl.yw, TjKenMate.Param.VersionControl.wt, "left");
        this.addWindow(window);
    }
}
