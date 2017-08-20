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
 * 
 * @param ~~ Defaults ~~
 * @default 
 * 
 * @param Default Move Speed
 * @desc The Default Movment Speed of the party before modifiers
 * (4 is the default speed of the system)
 * Default: 20 
 * @default 20
 */

var Imported = Imported || {};
Imported.TjKenMate_DashOverhaul = true;

var TjKenMate = TjKenMate || {};
TjKenMate.DashOverhaul = TjKenMate.DashOverhaul || {};
TjKenMate.DashOverhaul.version = 0.1;

TjKenMate.Parameters = PluginManager.parameters('TJ_Dash_Overhaul');

TjKenMate.Param = TjKenMate.Param || {};

TjKenMate.Param.DisableAlwaysDashOption = Boolean(TjKenMate.Parameters['Disable AlwaysDash']);
TjKenMate.Param.DashOverhaul = TjKenMate.Param.DashOverhaul || {};
TjKenMate.Param.DashOverhaul.DefaultSettings = TjKenMate.DashOverhaul.DefaultSettings || {};
TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMoveSpeed = Number(TjKenMate.Parameters['Default Move Speed'] || 4);

var _Tj_Dash_Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _Tj_DashOverhaul_Game_CharacterBase_initMembers.call(this);
    this.setMoveSpeed(TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMoveSpeed);
};

var TjDashStamina = 400;

if (TjKenMate.Param.DisableAlwaysDashOption){
    if(TjKenMate.OptionMenu){}
    else{
        Window_Options.prototype.addGeneralOptions = function() {
            //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
            this.addCommand(TextManager.commandRemember, 'commandRemember');
            console.log('This was called and the value is ' + TjKenMate.DisableAlwaysDashOption);
        };
    }
};

var _Tj_DashOverhaul_is_Dash_Button_Pressed = Game_Player.prototype.isDashButtonPressed;
Game_Player.prototype.isDashButtonPressed = function() {
    if(TjDashStamina == 0)
        return false;
    else if(Input.isPressed('shift')) {
        TjDashStamina--;
        console.log(TjDashStamina);
    }
    _Tj_DashOverhaul_is_Dash_Button_Pressed.call(this);
};
