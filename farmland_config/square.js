var GT_EMPTY 				= 0; //_
var GT_PLOWED      	= 1; //[[]]
var GT_PL_SEEDED		= 2; //[::]
var GT_LUMBER				= 3; //[O]
var GT_BRANCH				= 4; //[/]
var GT_STONE				= 5; //[o]
var GT_GRASS				= 6; //["]
var GT_GRASS2				= 7; //["]

var arrImages = new Array();

arrImages[GT_EMPTY] 			= 't0.bmp';
arrImages[GT_PLOWED] 			= 't1.bmp';
arrImages[GT_PL_SEEDED] 	= 'sd0.bmp'
arrImages[GT_LUMBER] 			= 'log.bmp';
arrImages[GT_BRANCH] 			= 'log2.bmp';
arrImages[GT_STONE] 			= 'rock.bmp';
arrImages[GT_GRASS] 			= 'grs2.bmp';
arrImages[GT_GRASS2] 			= 'grs.bmp';

function square() {
	var oTemp = new Object();
	
	oTemp.type			= 'square';
	oTemp.gtype 		= GT_EMPTY;			//GT_EMPTY, GT_PLOWED, GT_PL_SEEDED, GT_PL_SEEDED
	
	oTemp.canplow		= false;	//has something on it...log/lumber/stone/grass
	oTemp.canwater	= false;	//has something on it...or already watered..or not plowed
	oTemp.canplant	= false;	//already planted | not plowed | has something on it
	
	oTemp.isplowed	= false;
	oTemp.isseeded	= false;
	oTemp.iswatered	= false;
	
	oTemp.getGraphic = square_getGraphic;
	oTemp.setGraphic = square_setGraphic;
	return oTemp;
}

function square_getGraphic() {
	if (this.gtype >=0 && this.gtype < arrImages.length) {
		return arrImages[this.gtype];
	}
	else {
		return arrImages[0];
	}
}

function square_setGraphic(sGraphicSrc) {
	var arrSrc;
	var sImgSrc;

	if (sGraphicSrc.indexOf('/') > -1) {
		arrSrc = sGraphicSrc.split('/');
		sImgSrc = arrSrc[arrSrc.length-1];
	}
	else if (sGraphicSrc.indexOf('\\') > -1) {
		arrSrc = sGraphicSrc.split('\\');
		sImgSrc = arrSrc[arrSrc.length-1];	
	}
	else {
		sImgSrc = sGraphicSrc;
	}
	
	
	switch (sImgSrc) {
	case arrImages[GT_EMPTY]:
			this.gtype = GT_EMPTY;
			break;
	case arrImages[GT_PLOWED]:
			this.gtype = GT_PLOWED;
			break;	
	case arrImages[GT_PL_SEEDED]:
			this.gtype = GT_PL_SEEDED;
			break;
	case arrImages[GT_LUMBER]:
			this.gtype = GT_LUMBER;
			break;
	case arrImages[GT_BRANCH]:
			this.gtype = GT_BRANCH;	
			break;
	case arrImages[GT_STONE]:
			this.gtype = GT_STONE
			break;
	case arrImages[GT_GRASS]:
			this.gtype = GT_GRASS;
			break;
	case arrImages[GT_GRASS2]:
			this.gtype = GT_GRASS2;
			break;
	default:
			this.gtype = GT_EMPTY;
	}
	
}