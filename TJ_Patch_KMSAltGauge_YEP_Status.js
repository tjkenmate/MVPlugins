/*:
 * @plugindesc
 * [v1.0b] Changes Yanfly Status Gauges to KMS Style Gauges.
 * 
 * @author TJ (TjKenMate)
 *
 * @param ===Gauge Configuration===
 * @default
 *
 * @param ---ATK Gauge---
 * @default
 *
 * @param ATK gauge image
 * @default GaugeATK
 * @require 1
 * @dir img/system/
 * @type file
 * @desc ATK gauge image. Load from 'img/system'.
 *
 * @param Atk X
 * @desc The x shift of the Atk Gauge.
 * Default: -31
 * @default -31
 *
 * @param Atk Y
 * @desc The Y shift of the Atk Gauge.
 * Default: -2
 * @default -2
 *
 * @param Atk Width
 * @desc The Width shift of the Atk Gauge.
 * Default: -4
 * @default -4
 *
 * @param Atk Angle
 * @desc The Angle shift of the Atk Gauge.
 * Default: 30
 * @default 30
 *
 * @param ---DEF Gauge---
 * @default
 *
 * @param DEF gauge image
 * @default GaugeDEF
 * @require 1
 * @dir img/system/
 * @type file
 * @desc DEF gauge image. Load from 'img/system'.
 *
 * @param DEF X
 * @desc The x shift of the DEF Gauge.
 * Default: -31
 * @default -31
 *
 * @param DEF Y
 * @desc The Y shift of the DEF Gauge.
 * Default: -2
 * @default -2
 *
 * @param DEF Width
 * @desc The Width shift of the DEF Gauge.
 * Default: -4
 * @default -4
 *
 * @param DEF Angle
 * @desc The Angle shift of the DEF Gauge.
 * Default: 30
 * @default 30
 *
 * @param ---MAT Gauge---
 * @default
 *
 * @param MAT gauge image
 * @default GaugeMAT
 * @require 1
 * @dir img/system/
 * @type file
 * @desc MAT gauge image. Load from 'img/system'.
 *
 * @param MAT X
 * @desc The x shift of the MAT Gauge.
 * Default: -31
 * @default -31
 *
 * @param MAT Y
 * @desc The Y shift of the MAT Gauge.
 * Default: -2
 * @default -2
 *
 * @param MAT Width
 * @desc The Width shift of the MAT Gauge.
 * Default: -4
 * @default -4
 *
 * @param MAT Angle
 * @desc The Angle shift of the MAT Gauge.
 * Default: 30
 * @default 30
 *
 * @param ---MDF Gauge---
 * @default
 *
 * @param MDF gauge image
 * @default GaugeMDF
 * @require 1
 * @dir img/system/
 * @type file
 * @desc MDF gauge image. Load from 'img/system'.
 *
 * @param MDF X
 * @desc The x shift of the MDF Gauge.
 * Default: -31
 * @default -31
 *
 * @param MDF Y
 * @desc The Y shift of the MDF Gauge.
 * Default: -2
 * @default -2
 *
 * @param MDF Width
 * @desc The Width shift of the MDF Gauge.
 * Default: -4
 * @default -4
 *
 * @param MDF Angle
 * @desc The Angle shift of the MDF Gauge.
 * Default: 30
 * @default 30
  *
 * @param ---AGI Gauge---
 * @default
 *
 * @param AGI gauge image
 * @default GaugeAGI
 * @require 1
 * @dir img/system/
 * @type file
 * @desc AGI gauge image. Load from 'img/system'.
 *
 * @param AGI X
 * @desc The x shift of the AGI Gauge.
 * Default: -31
 * @default -31
 *
 * @param AGI Y
 * @desc The Y shift of the AGI Gauge.
 * Default: -2
 * @default -2
 *
 * @param AGI Width
 * @desc The Width shift of the AGI Gauge.
 * Default: -4
 * @default -4
 *
 * @param AGI Angle
 * @desc The Angle shift of the AGI Gauge.
 * Default: 30
 * @default 30
  *
 * @param ---LUK Gauge---
 * @default
 *
 * @param LUK gauge image
 * @default GaugeLUK
 * @require 1
 * @dir img/system/
 * @type file
 * @desc LUK gauge image. Load from 'img/system'.
 *
 * @param LUK X
 * @desc The x shift of the LUK Gauge.
 * Default: -31
 * @default -31
 *
 * @param LUK Y
 * @desc The Y shift of the LUK Gauge.
 * Default: -2
 * @default -2
 *
 * @param LUK Width
 * @desc The Width shift of the LUK Gauge.
 * Default: -4
 * @default -4
 *
 * @param LUK Angle
 * @desc The Angle shift of the LUK Gauge.
 * Default: 30
 * @default 30
 * 
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 * Simply put this changes the Parameter gauges in yanflys status core to use
 * custom ones using the KMS alt gauge system.
 *
 * In addition it changes the EXP bar to use the same EXP bar as KMS Alt Gauge
 * and there for uses that plugins configuration
 *
 * ============================================================================
 * Instructions
 * ============================================================================
 * Simply place any additional KMS formated gauges in img/system and then set 
 * the name without the extention in the gauge image configuration
 * 
 * So GaugeATK.png would be set as GaugeATK in the configuration.
 *
 * This does follow the same rules as KMS Alt gauge and the configuration and 
 * settings follow the same rules as that plugin.
 *
 * TLDR: The X / Y position is to correct or move the position of the gauge,
 * the width is the adjustment, or increase/ decrease, of the gauge width,
 * and the angle is the angle (degree) of tilting the gauge.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version [1.0b]:
 * - Inital Release!
 * 
 * ============================================================================
 */
 
 
//CodeCoexistance Stuff
var Imported = Imported || {};
Imported.TjKenMate_KMSStatusGauges = true;

var TjKenMate = TjKenMate || {};
TjKenMate.KMSStatusGauges = TjKenMate.KMSStatusGauges || {};
TjKenMate.KMSStatusGauges.version = 1.0;

//(function()
//{
//include both KMS and Mine GaugeImageKeys
var GaugeImageKeys = ['hp', 'mp', 'tp', 'exp', 'atk', 'def', 'mat', 'mdf', 'agi', 'luk']

TjKenMate.Parameters = PluginManager.parameters('TJ_Patch_KMSAltGauge_YEP_Status');

TjKenMate.Param = TjKenMate.Param || {};

TjKenMate.Param.imageDir = TjKenMate.Param.imageDir || 'img/system/';

TjKenMate.Param.gaugeImage = TjKenMate.Param.gaugeImage || {};
TjKenMate.Param.gaugeImage.atk = TjKenMate.Parameters['ATK gauge image'];
TjKenMate.Param.gaugeImage.def = TjKenMate.Parameters['DEF gauge image'];
TjKenMate.Param.gaugeImage.mat = TjKenMate.Parameters['MAT gauge image'];
TjKenMate.Param.gaugeImage.mdf = TjKenMate.Parameters['MDF gauge image'];
TjKenMate.Param.gaugeImage.agi = TjKenMate.Parameters['AGI gauge image'];
TjKenMate.Param.gaugeImage.luk = TjKenMate.Parameters['LUK gauge image'];

function createTjStatusConfig(ax, ay, aw, aangle)
{
	var config = {
        x: ax,
        y: ay,
        width: aw,
        angle: aangle
    };
	
	return config;
}

TjKenMate.Param.NullStatusConfig = createTjStatusConfig(0, 
											0,
											0,
											0);
											
TjKenMate.Param.ATKStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['Atk X'] || -31), 
											Number(TjKenMate.Parameters['Atk Y'] || -2),
											Number(TjKenMate.Parameters['Atk Width'] || -4),
											Number(TjKenMate.Parameters['Atk Angle'] || 30));
											
TjKenMate.Param.DEFStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['DEF X'] || -31), 
											Number(TjKenMate.Parameters['DEF Y'] || -2),
											Number(TjKenMate.Parameters['DEF Width'] || -4),
											Number(TjKenMate.Parameters['DEF Angle'] || 30));
											
TjKenMate.Param.MATStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['MAT X'] || -31), 
											Number(TjKenMate.Parameters['MAT Y'] || -2),
											Number(TjKenMate.Parameters['MAT Width'] || -4),
											Number(TjKenMate.Parameters['MAT Angle'] || 30));

TjKenMate.Param.MDFStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['MDF X'] || -31), 
											Number(TjKenMate.Parameters['MDF Y'] || -2),
											Number(TjKenMate.Parameters['MDF Width'] || -4),
											Number(TjKenMate.Parameters['MDF Angle'] || 30));

TjKenMate.Param.AGIStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['AGI X'] || -31), 
											Number(TjKenMate.Parameters['AGI Y'] || -2),
											Number(TjKenMate.Parameters['AGI Width'] || -4),
											Number(TjKenMate.Parameters['AGI Angle'] || 30));
											
TjKenMate.Param.LUKStatusConfig = createTjStatusConfig(Number(TjKenMate.Parameters['LUK X'] || -31), 
											Number(TjKenMate.Parameters['LUK Y'] || -2),
											Number(TjKenMate.Parameters['LUK Width'] || -4),
											Number(TjKenMate.Parameters['LUK Angle'] || 30));
											

var _TJ_AltGaugePatch_Window_Base_initialize = Window_Base.prototype.initialize;
Window_Base.prototype.initialize = function(x, y, width, height)
{
    _TJ_AltGaugePatch_Window_Base_initialize.call(this, x, y, width, height);
    this.loadGaugePatchImages();
};

//Load the images
Window_Base.prototype.loadGaugePatchImages = function()
{
    GaugeImageKeys.forEach(function(key)
    {
        this.getTjOrKMSGaugeImage(key);
    }, this);
};

Window_Base.prototype.getTjOrKMSGaugeImage = function(gaugeType)
{
    if (TjKenMate.Param.gaugeImage[gaugeType])
    {
        return ImageManager.loadBitmap(TjKenMate.Param.imageDir, TjKenMate.Param.gaugeImage[gaugeType]);
    }
    else
    {
        return this.getGaugeImage(gaugeType);
    }
};

//Status Param Draw method
Window_Base.prototype.drawTJStatusKmsGauge = function(x, y, width, rate, paramId)
{
	var tjConfig = TjKenMate.Param.NullStatusConfig;
	var imageCode = 'null';
	switch (paramId) {
		case 2: 
			tjConfig = TjKenMate.Param.ATKStatusConfig;
			imageCode = 'atk';
			break;
		case 3: 
			tjConfig = TjKenMate.Param.DEFStatusConfig;
			imageCode = 'def';
			break;
		case 4: 
			tjConfig = TjKenMate.Param.MATStatusConfig;
			imageCode = 'mat';
			break;
		case 5: 
			tjConfig = TjKenMate.Param.MDFStatusConfig;
			imageCode = 'mdf';
			break;
		case 6: 
			tjConfig = TjKenMate.Param.AGIStatusConfig;
			imageCode = 'agi';
			break;
		case 7: 
			tjConfig = TjKenMate.Param.LUKStatusConfig;
			imageCode = 'luk';
			break;
	};
	//console.log(paramId);
	//console.log(imageCode);
    var ax = tjConfig.x;
    var ay = tjConfig.y;
    var aw = tjConfig.width;
    var angle = tjConfig.angle;
    x += ax;
    y += ay;
    width += aw;

	//Orginally KMSAlt Gauge Code
    var grid = 32;
    var fillW = Math.floor(width * rate);
    var bitmap = this.getTjOrKMSGaugeImage(imageCode);
    var gaugeW = bitmap.width / 2;
    var gaugeH = bitmap.height / 3;
    var gaugeY = y + this.lineHeight() - gaugeH - 2;

    this.contents.skewBlt(bitmap, angle, 0, 0, grid, gaugeH, x, gaugeY);
    this.contents.skewBlt(bitmap, angle, grid, 0, gaugeW, gaugeH, x + grid, gaugeY, width);
    this.contents.skewBlt(bitmap, angle, grid + gaugeW, 0, grid, gaugeH, x + width + grid, gaugeY);

    var gw = gaugeW * fillW / width;
    this.contents.skewBlt(bitmap, angle, 0, gaugeH, gw, gaugeH, x + grid, gaugeY, fillW);
};

//Adding Status Gauges
Window_StatusInfo.prototype.drawParamGauge = function(dx, dy, dw, paramId) {
	dw = dw || 186;
	var rate = this.calcParamRate(paramId);
	this.drawTJStatusKmsGauge(dx, dy, dw, rate, paramId)
	return rate;
};

//Changing exp gauge to use the KMS gauge
Window_StatusInfo.prototype.drawExpGauge = function(actor, rate, rect) {
	var dy = rect.y;
	var dx = rect.x;
	var dw = rect.width || 186;
	this.drawKmsGauge(dx, dy, dw, rate, 'exp')
};
//})();