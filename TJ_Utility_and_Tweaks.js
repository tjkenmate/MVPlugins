/*:
 * @plugindesc
 * [v1.0b] Minor Fixes and Tweaks to the base game
 *
 * @author TJ (TjKenMate)
 *
 * @param System Information
 * @text Print System Information
 * @type text
 * @desc Print out System Informatiion to file or console.
 * Options: console, file, none
 * @default console
 *
 * @param Auto Save Folder
 * @text Auto Create Save Folder
 * @type boolean
 * @desc Auto Create The Save Folder if none exists
 * Default: true
 * @default true
 *
 *
 * @help
 *
 * TJ's Utility's and Tweaks
 * TjKenMate
 * Version 1.0 Beta
 *
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Just a collection of minor tweaks and testing utilities that I use for
 * Development.
 *
 * List includes the following:
 *
 * System Information Dump
 * Auto Creation of save folder
 * Eval external file plugin command
 *
 * ============================================================================
 * System Information Dump Instructions
 * ============================================================================
 *
 * Simple Paramater, just prints the OS to the console or to a file depending
 * on the plugin settings;
 *
 * ============================================================================
 * Auto Creation of save folder Instructions
 * ============================================================================
 *
 * If set to true will check to see if the save folder exists, if not it will
 * create one.
 *
 * ONLY USE FOR WINDOWS, MAC, OR LINUX DISTRIBUTION AND NOT MOBILE/WEB
 *
 * ===========================================================================
 * Eval external file plugin command
 * ============================================================================
 *
 * Allows you to call eval on an external file via a plugin command
 *
 * Usage:
 * TJExternalEval Directory file
 *
 * Example:
 * TJExternalEval data/ temp.txt
 *
 * Where the directory is a sub directory of the root and the file is the name
 * of the file to evalute.
 *
 * (Only Recomended for Testing and prototyping)
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version [1.0b]:
 * - Inital Release!
 *
 * ============================================================================
 */

//Bad Code, but fuck it I might use this at some point
var Imported = Imported || {};
Imported['TjKenMate_Tweaks'] = '1.0.0';

var TjKenMate = TjKenMate || {};
TjKenMate.Tweaks = TjKenMate.Tweaks || {};

(function () {
    TjKenMate.Parameters = PluginManager.parameters('TJ_Utility_and_Tweaks');
    TjKenMate.Param = TjKenMate.Param || {};
    TjKenMate.Param.tweaks = TjKenMate.Param.tweaks || {};
    TjKenMate.Param.tweaks.os = String(TjKenMate.Parameters['System Information']).toLowerCase() || "";
    TjKenMate.Param.tweaks.save = eval(TjKenMate.Parameters['Auto Save Folder']) || false;

    function getPath(pathInput) {
        path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, pathInput);
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    }

    /*
     * ============================================================================
     * System Information Dump
     * ============================================================================
     *
     */
    function bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + ' ' + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };

    if (Utils.isNwjs && (TjKenMate.Param.tweaks.os === "console" || TjKenMate.Param.tweaks.os === "file")) {
        var os = require('os');
        var info = "%cPlatform: " + os.platform() + "\n" +
            "Architecture: " + os.arch() + "\n" +
            "Ram Available: " + bytesToSize(os.totalmem()) + "\n" +
            "CPU Cores: " + os.cpus().length;
        if (TjKenMate.Param.tweaks.os === "console" || true) {
            console.log("%cTjKenMate Utility and Tweaks:\n" + info, "color:blue;font-weight:bold;", "color:green;font-style:italic;");
        } else {
            var path = getPath('/tjkenmate/')
            var fs = require('fs');
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path);
            }
            path += "systemInfo.txt";
            fs.writeFile(path, info, function (err) {
                if (err) {
                    throw err;
                }
            });
        }
    }

    /*
     * ============================================================================
     * Auto Creation of Save Folder
     * ============================================================================
     *
     */
    if (Utils.isNwjs && TjKenMate.Param.tweaks.save) {
        var fs = require('fs');
        var path = getPath('/save/');
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    }

    /*
     * ============================================================================
     * Eval external file plugin command
     * ============================================================================
     *
     */
    var Tj_Tweaks_Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        if (command === 'TJExternalEval') {
            var xhr = new XMLHttpRequest()
            var url = args[0] + args[1];
            xhr.open('GET', url, false);
            xhr.send();
            var F = new Function(xhr.responseText);
            F();
        }
        Tj_Tweaks_Game_Interpreter_pluginCommand.call(this, command, args)
    };
})();