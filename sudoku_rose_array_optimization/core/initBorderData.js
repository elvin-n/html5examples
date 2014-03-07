// first of all we need to define borders parameters
// dinally they might be taken from the site like http://www.nonograms.ru/ but the first set
// will be defined manually

//below are parameters hardcoded for the http://www.nonograms.ru/nonograms/i/14 example
var lendc;
var lenc;
var columns; 
var lendr;
var lenr;
var rows;

var field;

function startSolve()
{
	lendc = 9;
	lenc = 25;
	columns = new Array(lendc); 
	var columndesc = new Array(lendc); 
	columndesc[0] = '[0,0,0,0,0, 0,0,0,0,0, 0,0,1,0,0, 0,1,0,4,1, 0,0,0,0,0]';
	columndesc[1] = '[0,0,0,0,0, 0,0,0,0,0, 0,1,2,1,1, 0,2,0,1,2, 1,0,0,0,0]';
	columndesc[2] = '[0,0,0,0,0, 0,1,1,1,0, 0,1,2,1,2, 1,2,1,1,2, 2,0,0,0,0]';
	columndesc[3] = '[0,0,0,0,0, 0,2,3,4,2, 1,1,1,1,1, 2,1,3,2,1, 1,1,0,0,0]';
	columndesc[4] = '[0,0,0,0,0, 1,1,1,1,2, 1,2,1,1,1, 1,3,1,2,2, 2,2,0,0,0]';
	columndesc[5] = '[0,0,2,0,2, 2,2,3,3,1, 1,2,1,2,2, 4,3,6,2,1, 1,5,0,0,0]';
	columndesc[6] = '[0,0,2,3,1, 2,1,3,3,5, 1,2,7,6,5, 4,3,5,2,2, 2,1,2,5,0]';
	columndesc[7] = '[0,2,2,2,1, 1,5,1,1,1, 1,10,1,2,1, 2,1,1,2,2, 2,2,4,1,0]';
	columndesc[8] = '[4,4,1,5,5, 5,1,1,5,9, 15,2,2,2,3, 3,2,2,1,3, 1,1,4,3,2]';
	for( var idxc = 0; idxc<columns.length; idxc++)
	{
		columns[idxc] = JSON.parse(columndesc[idxc]);
	}

	lendr = 6;
	lenr = 35;
	rows = new Array(lenr);
	var rowdesc = new Array(lenr);
	rowdesc[0] = '[0,0,0,0,0,4]';
	rowdesc[1] = '[0,0,0,0,2,1]';
	rowdesc[2] = '[0,0,0,1,4,2]';
	rowdesc[3] = '[0,3,2,3,1,3]';
	rowdesc[4] = '[0,2,1,2,3,2]';

	rowdesc[5] = '[1,1,1,6,1,1]';
	rowdesc[6] = '[2,2,2,2,2,1]';
	rowdesc[7] = '[0,1,3,3,2,1]';
	rowdesc[8] = '[0,0,2,6,5,2]';
	rowdesc[9] = '[0,0,1,2,5,2]';

	rowdesc[10] ='[0,0,0,3,3,5]';
	rowdesc[11] ='[0,0,1,2,2,2]';
	rowdesc[12] ='[0,0,0,8,1,1]';
	rowdesc[13] ='[0,0,0,1,2,2]';
	rowdesc[14] ='[0,0,0,0,1,4]';

	rowdesc[15] ='[0,0,0,0,4,3]';
	rowdesc[16] ='[0,0,0,0,5,4]';
	rowdesc[17] ='[0,0,0,0,4,9]';
	rowdesc[18] ='[0,1,2,6,1,1]';
	rowdesc[19] ='[0,0,0,0,7,1]';

	rowdesc[20] ='[0,0,0,5,5,3]';
	rowdesc[21] ='[0,0,0,8,4,7]';
	rowdesc[22] ='[0,0,1,11,5,2]';
	rowdesc[23] ='[0,1,7,3,3,2]';
	rowdesc[24] ='[0,0,0,0,7,12]';

	rowdesc[25] ='[0,0,0,2,4,4]';
	rowdesc[26] ='[0,0,0,0,2,3]';
	rowdesc[27] ='[0,0,0,0,2,4]';
	rowdesc[28] ='[0,0,0,0,0,5]';
	rowdesc[29] ='[0,0,0,0,2,5]';

	rowdesc[30] ='[0,0,3,4,2,1]';
	rowdesc[31] ='[0,0,0,0,10,2]';
	rowdesc[32] ='[0,0,0,0,4,4]';
	rowdesc[33] ='[0,0,0,0,0,4]';
	rowdesc[34] ='[0,0,0,0,0,2]';
	for( var idxr = 0; idxr<rows.length; idxr++)
	{
		rows[idxr] = JSON.parse(rowdesc[idxr]);
	}

	field = new Field(lenc, lenr);

	currStep = 0;
	drawField();
	//fullSolve();
    setTimeout(doStep, 1500);
}
