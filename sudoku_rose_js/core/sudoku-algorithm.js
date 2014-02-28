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
