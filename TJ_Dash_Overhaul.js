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
 * Default: 4 
 * @default 4
 * 
 * @param Default Dash Speed
 * @desc The Default Dash Speed of the party before modifiers
 * (5 is the default speed of the system)
 * Default: 6 
 * @default 6
 * 
 * @param Default Max Stamina
 * @desc The Default Max Stamina of the party before modifiers
 * Default: 100
 * @default 100
 * 
 * @param Default Stamina counter gain
 * @desc The Default Stamina counter gain of the party (See stamina gain)
 * Default: 5
 * @default 5
 */

var Imported = Imported || {};
Imported.TjKenMate_DashOverhaul = true;

var TjKenMate = TjKenMate || {};
TjKenMate.DashOverhaul = TjKenMate.DashOverhaul || {};
TjKenMate.DashOverhaul.version = 0.1;

TjKenMate.Parameters = PluginManager.parameters('TJ_Dash_Overhaul');

TjKenMate.Param = TjKenMate.Param || {};

TjKenMate.Param.DashOverhaul = TjKenMate.Param.DashOverhaul || {};
TjKenMate.Param.DashOverhaul.DisableAlwaysDashOption = Boolean(TjKenMate.Parameters['Disable AlwaysDash']);

TjKenMate.Param.DashOverhaul.DefaultSettings = TjKenMate.DashOverhaul.DefaultSettings || {};
TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMoveSpeed = Number(TjKenMate.Parameters['Default Move Speed'] || 5);
TjKenMate.Param.DashOverhaul.DefaultSettings.defaultDashSpeed = Number(TjKenMate.Parameters['Default Dash Speed'] || 6);
TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMaxStamina = Number(TjKenMate.Parameters['Default Max Stamina'] || 100);
TjKenMate.Param.DashOverhaul.DefaultSettings.defaultStaminaCounterLimit = Number(TjKenMate.Parameters['Default Max Stamina'] || 100);

var TjMovementSpeed = 0;
var TjDashSpeed = 0;
var TjDashStamina = 0;
var TjStaminaGainCounter = 0;


var _Tj_Dash_Game_Player_initMembers = Game_Player.prototype.initMembers;
Game_Player.prototype.initMembers = function() {
    _Tj_Dash_Game_Player_initMembers.call(this);
    TjMovementSpeed = TjCalcMovementSpeed();
    TjDashSpeed = TjCalcDashSpeed();
    TjDashStamina = TjCalcStaminaMax();
};

function TjCalcMovementSpeed(){
    return TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMoveSpeed;
};

function TjCalcDashSpeed(){
    return TjKenMate.Param.DashOverhaul.DefaultSettings.defaultDashSpeed;
};

function TjCalcStaminaCost(){
    return 2;
};

function TjCalcStaminaMax(){
    return TjKenMate.Param.DashOverhaul.DefaultSettings.defaultMaxStamina;
};

function TjCalcStaminaLimit(){
    return TjKenMate.Param.DashOverhaul.DefaultSettings.defaultStaminaCounterLimit;
};

function TjCalcStaminaGain(){
    return 1;
};

function TjcalcStamina(){
    if(TjStaminaGainCounter > TjCalcStaminaLimit()){
        TjStaminaGainCounter = 0;
        return TjDashStamina + TjCalcStaminaGain();
    };
    return TjDashStamina;
};

/*
if (TjKenMate.Param.DashOverhaul.DisableAlwaysDashOption){
    if(TjKenMate.OptionMenu){}
    else{
        Window_Options.prototype.addGeneralOptions = function() {
            //this.addCommand(TextManager.alwaysDash, 'alwaysDash');
            this.addCommand(TextManager.commandRemember, 'commandRemember');
            console.log('This was called and the value is ' + TjKenMate.DisableAlwaysDashOption);
        };
    }
};

var _Tj_Dash_Game_Player_isDashButtonPressed = Game_Player.prototype.isDashButtonPressed;
Game_Player.prototype.isDashButtonPressed = function() {
    if(TjDashStamina == 0)
        return false;
    else if(Input.isPressed('shift')) {
        //TjDashStamina--;
        console.log(TjDashStamina);
        return true;
    }
    _Tj_Dash_Game_Player_isDashButtonPressed.call(this);
};

var _Tj_Dash_Game_Player_isDashing = Game_Player.prototype.isDashButtonPressed;
*/

Game_CharacterBase.prototype.realMoveSpeed = function() {
    return (this.isDashing() ? TjDashSpeed : TjMovementSpeed);
};

var _Tj_Dash_Game_Player_increaseSteps = Game_Player.prototype.increaseSteps;
Game_Player.prototype.increaseSteps = function() {
    console.log(TjDashStamina);
    if(TjDashStamina <= 0){
        this._dashing = false;
    }
    if(this._dashing == true){
        TjDashStamina = TjDashStamina - TjCalcStaminaCost();
    } else if (TjDashStamina < TjCalcStaminaMax()){
        TjStaminaGainCounter++;
        console.log(TjStaminaGainCounter);
        TjDashStamina = TjcalcStamina();
    }
    _Tj_Dash_Game_Player_increaseSteps.call(this);
};