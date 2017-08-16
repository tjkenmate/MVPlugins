/*:
 * @plugindesc
 * [v0.1a] Alters the dash system and general movement.
 * 
 * @author TJ (TjKenMate)
 * 
 * @param Disable AlwaysDash
 * @desc if true this will disable The Dash Menu option
 * Default: true
 * @default true
 */

var Imported = Imported || {};
Imported.TjKenMate_KMSStatusGauges = true;

var TjKenMate = TjKenMate || {};
TjKenMate.DashOverhaul = TjKenMate.DashOverhaul || {};
TjKenMate.DashOverhaul.version = 0.1;

TjKenMate.Parameters = PluginManager.parameters('TJ_Dash_Overhaul');

TjKenMate.Param = TjKenMate.Param || {};

TjKenMate.Param.DisableAlwaysDashOption = eval(TjKenMate.Parameters['Disable AlwaysDash']);

if (TjKenMate.Param.DisableAlwaysDashOption){
    if(TjKenMate.OptionMenu){}
    else{
        Window_Options.prototype.addGeneralOptions = function() {
            //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
            this.addCommand(TextManager.commandRemember, 'commandRemember');
        };
    }
}