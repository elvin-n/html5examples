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
	//drawField();
	fullSolve();
  //  setTimeout(doStep, 3);
}

var currStep = 0;


function fullSolve()
{
	var start = new Date().getTime();
	var iStep = 0;
	var unknownCells = field.step();
	while( unknownCells != 0 )
	{
		iStep++;
		unknownCells = field.step();
	}
	drawField();
	var end = new Date().getTime();
	var time = end - start;
	//alert('Execution time: ' + time);
}

var iteration_counter = null;
function doStep()
{
    if( iteration_counter === null )
    {
        iteration_counter = document.getElementById('iteration_counter');
    }
	//iteration_counter = currStep;
	for( var i=0; i<100; i++ )
    {
        field.step();
    }
	drawField();
	if( currStep < 2000)
	{
		currStep+=100;
		setTimeout(doStep, 3);
	}
}


function drawField()
{
	for( var idxbr= 0; idxbr < lenr; idxbr ++)
	{
    var line = '';
		for( var idxbc = 0; idxbc < lenc; idxbc++)
		{
			if( field.data[idxbc][idxbr] == 1 )
			{
        line += 'X';
			}
			else if( field.data[idxbc][idxbr] == -1 )
			{
        line += ' ';
			}
			else
				line += ' ';
		}
    print/*console.log*/(line);
	}
  print/*console.log*/('');
}
 

    // algorithm of solving the 
Field = function( lenc, lenr )
{
	// members declaration
	this.lenc = lenc;
	this.lenr = lenr;

	// it's not good to name field.field, so I changed the field name to the "data"
	// there are three possible values in the data - -1 means must not be, 1 means must be, 0 means undefined
	this.data = null;
	this.curSet = new Object;
		this.curSet.row = 0;
		this.curSet.column = 0;

	// init of the field.
	this.data = new Array(lenc);
	for( var idxfc = 0; idxfc < lenc; idxfc++)
	{
		this.data[idxfc] = new Array(lenr);
		for( idxfr = 0; idxfr<lenr; idxfr ++)
		{
			this.data[idxfc][idxfr] = 0;
		}
	}


	// for debug purposes only
	this.numberOfAttempts = 0;

	this.unknownCells = lenc*lenr;
}

Field.prototype.step = function()
{
	// the algorithm estimates each line and each column separately
	// each such column or row is one step

	// prepare data for the firther processing
	// 1. prepare of array reference data
	// 2. prepare of array of groups
	var groups = [];
	var refData = [];
    if( this.curSet.row != -1 )
	{
		// take data by row
		for( var idxinr = 0; idxinr < lendr; idxinr++)
		{
			if( rows[this.curSet.row][idxinr] )
			{
				groups.push(rows[this.curSet.row][idxinr]);
			}
		}
		for( var idxinf = 0; idxinf < lenc; idxinf++)
		{
			refData.push(this.data[idxinf][this.curSet.row]);
		}
	}
	else
	{
		// take data by columns
		for( var idxinc = 0; idxinc < lendc; idxinc++)
		{
			if( columns[idxinc][this.curSet.column] )
			{
				groups.push(columns[idxinc][this.curSet.column]);
			}
		}
		for( var idxinf = 0; idxinf < lenr; idxinf++)
		{
			refData.push(this.data[this.curSet.column][idxinf]);
		}		
	}
	var positions = [];
	var sets = [];

	this.numberOfAttempts = 0;
	this.collectPossibleSets(groups, refData, positions, sets);

	// estimate the filled and prohibited cells in the sets
	if( sets.length )
	{
		// the first set is referenced here
		var set = new Array(refData.length);
		for( var idxZ = 0; idxZ < refData.length; idxZ++ )
		{
			set[idxZ] = sets[0][idxZ] == 1 ? 1 : -1;
		}
		
		for( var idxS = 1; idxS < sets.length; idxS++ )
		{
			for( var idxIS = 0; idxIS < refData.length; idxIS++ )
			{
				if( set[idxIS] == 1 && sets[idxS][idxIS] != 1)
				{
					set[idxIS] = 0;
				}
				if( set[idxIS] == -1 && sets[idxS][idxIS] != 0)
				{
					set[idxIS] = 0;
				}
			}
		}
		// incorporate all data to the main data
		if( this.curSet.row != -1 )
		{
			for( var idxinf = 0; idxinf < lenc; idxinf++)
			{
				if( this.data[idxinf][this.curSet.row] != set[idxinf] )
				{
					this.data[idxinf][this.curSet.row] = set[idxinf];
					this.unknownCells--;
				}
			}			
		}
		else
		{
			for( var idxinf = 0; idxinf < lenr; idxinf++)
			{
				if( this.data[this.curSet.column][idxinf] != set[idxinf] )
				{
					this.data[this.curSet.column][idxinf] = set[idxinf];
					this.unknownCells--;
				}
			}						
		}
	}
	// move firther
	if( this.curSet.row != -1 )
	{
		this.curSet.row ++;
		if( this.curSet.row == this.lenr )
		{
			this.curSet.row = -1;
			this.curSet.column = 0;
		}
	}
	else
	{
		this.curSet.column++;
		if( this.curSet.column == this.lenc )
		{
			this.curSet.row = 0;
		}
	}

	return this.unknownCells;
}

Field.prototype.collectPossibleSets = function (groups, refData, positions, sets)
{
	this.numberOfAttempts++;
	if( this.numberOfAttempts > 1000000)
	{
		sets.splice(0,sets.length);
		return;
	}

	// 1. check if we can put n elements from current position
	var curGroupOk = true;
	var curPosition = 0;
	if( positions.length )
	{
		// take the latest position
		curPosition = positions[positions.length-1];
		
		// if previous element is checked - return false
		if( curPosition && refData[curPosition-1] == 1 )
		{
			curGroupOk = false;
		}

		// if groups go out of the border - return false
		if( curPosition+groups[positions.length-1] > refData.length )
		{
			curGroupOk = false;
		}

		// if next element after group is checked - return false
		if( curPosition+groups[positions.length-1] < refData.length && 
			refData[curPosition + groups[positions.length-1] ] == 1 )
		{
			curGroupOk = false;
		}

		// if any element inside group is pointed as deinitely absent - return false
		if( curGroupOk )
		{
			for( var idxGroup = 0; idxGroup<groups[positions.length-1]; idxGroup++)
			{
				if( refData[curPosition + idxGroup] == -1 )
					curGroupOk = false;
			}
		}
	}
	if( curGroupOk )
	{
		// go firther
		if( positions.length < groups.length )
		{
			var beginNewGroup = 0;
			if( positions.length )
			{
				beginNewGroup = curPosition + groups[positions.length-1] + 1;
			}
			positions.push(0);
			for( var idxNG = beginNewGroup; idxNG<refData.length; idxNG ++ )
			{
				positions[positions.length-1] = idxNG;
				this.collectPossibleSets(groups, refData, positions, sets);
			}
			// remove the latest
			positions.pop();
		}
		else
		{
			var set = new Array(refData.length);
			for( var idxZ = 0; idxZ < refData.length; idxZ++ )
			{
				set[idxZ] = 0;
			}
			for( var idxNS = 0; idxNS < positions.length; idxNS++ )
			{
				for( var idxG = 0; idxG < groups[idxNS]; idxG++)
				{
					set[positions[idxNS] + idxG] = 1;
				}
			}
			// check if current set cortrespond to reference data
			var correspondToRef = true;
			for( var idxref = 0; correspondToRef && idxref < refData.length; idxref++ )
			{
				if( refData[idxref] == 1 && set[idxref] != 1)
					correspondToRef = false;
				if( refData[idxref] == -11 && set[idxref] == 1)
					correspondToRef = false;
			}
			if( correspondToRef )
			{
				sets.push(set);
			}
		}
	}
}


startSolve();
