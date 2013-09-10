CurrentState = function()
{
    this.run = false;
    this.iterations = 0;
    this.timeStart = 0;
	this.visualizationType = 0;
}

window.onload = function()
{
    init();
}

Field = function( x, y )
{
    this.x = x;
    this.y = y;
    this.field = this.allocateField();
    this.shadowField = this.allocateField();
}

Field.prototype.allocateField = function()
{
    var field = new Array(this.x);
    for (var i = 0; i < this.y; i++)
    {
        field[i] = new Array(this.y);
    }
    return field;
}

Field.prototype.randomFill = function()
{
    for( var i=0; i<this.x; i++)
    {
        for( var j=0; j<this.y; j++)
        {
            this.field[i][j] = Math.floor(Math.random()*2);
        }
    }
}

Field.prototype.step = function()
{
    for( var i=0; i<this.x; i++)
    {
        for( var j=0; j<this.y; j++)
        {
            // take values around current cell from field but update the shadowField
            var neighbours = 0;
            // check the neighbours
            if( i > 0 && j > 0 && this.field[i-1][j-1]) neighbours++;
            if( j > 0 && this.field[i][j-1]) neighbours++;
            if( i < this.x - 1 && j > 0 && this.field[i+1][j-1]) neighbours++;

            if( i > 0 && this.field[i-1][j]) neighbours++;
            if( i < this.x - 1 && this.field[i+1][j]) neighbours++;

            if( i > 0 && j < this.y - 1 && this.field[i-1][j+1]) neighbours++;
            if( j < this.y - 1 && this.field[i][j+1]) neighbours++;
            if( i < this.x - 1 && j < this.y - 1 && this.field[i+1][j+1]) neighbours++;

            switch( neighbours )
            {
            case 0:
            case 1:
                this.shadowField[i][j] = 0;
                break;
            case 2:
                this.shadowField[i][j] = this.field[i][j];
                break;
            case 3:
                this.shadowField[i][j] = 1;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                this.shadowField[i][j] = 0;
                break;
            }
        }
    }
    // swap
    var tmpField = this.field;
    this.field = this.shadowField;
    this.shadowField = tmpField;
}

function init()
{
    lifeField = new Field(100, 100);
    currentState = new CurrentState();
    lifeField.randomFill();
    drawField();
    updateField();
}

function drawElement( ctx, x, y, color)
{
	ctx.fillStyle = color;
	// calculate the canvas coordinates
	var ctxX = x * (5+2);
	var ctxY = y * (5+2);
	ctx.fillRect( ctxX, ctxY, 5, 5 );
}

function drawField()
{
	if( currentState.visualizationType == 0)
	{
		var str = '<table>';
		for( var j=0; j<lifeField.y; j++ )
		{
			str += '<tr>';
			for( var i=0; i<lifeField.x; i++ )
			{
				str += '<td><div class="';
				if( lifeField.field[i][j] == 0)
				{
					str += 'empty';
				}
				else 
					str += 'filled';
				str += '" id="item_' + i + '_' + j + '"</div></td>';
			}
			str += '</tr>';
		}
		str += '</table>';
		$('#fieldForLife')[0].innerHTML = str;
		// take a canvas
	}
	else if( currentState.visualizationType == 2 )
	{
		var ctx = $('#canvasField')[0].getContext('2d');
		for( var j=0; j<lifeField.y; j++ )
		{
			for( var i=0; i<lifeField.x; i++ )
			{
				if( lifeField.field[i][j] == 0)
				{
					drawElement(ctx, i, j, "rgb(255,255,255)");
				}
				else 
					drawElement(ctx, i, j, "rgb(23,255,145)" );
			}
		}
	}

}
function updateField()
{
	if( currentState.visualizationType == 0 || currentState.visualizationType == 2 )
	{
		drawField();
	}
	else
	{
		for( var j=0; j<lifeField.y; j++ )
		{
			for( var i=0; i<lifeField.x; i++ )
			{
				var id='item_' + i +'_' + j;
				var jElem = $('#'+id);


				if( lifeField.field[i][j] == 0)
				{
					jElem.addClass('empty');
					jElem.removeClass('filled');
				}
				else
				{
					jElem.addClass('filled');
					jElem.removeClass('empty');
				}
			}
		}
	}
}

function performNextStep()
{
    if(currentState.run)
    {
        lifeField.step();
        updateField();
        currentState.iterations ++;
        var date = new Date();
        var curtime = date.getTime();
        var diftime = curtime - currentState.timeStart;
        var oneiter = (diftime - 5 * (currentState.iterations-1))/currentState.iterations;
        
        $('#fps')[0].innerHTML = 1000/oneiter;
		//$('#fps')[0].innerHTML = oneiter;
        setTimeout(performNextStep, 5);
    }
}

function onResume()
{
    currentState.run = true;
    currentState.iterations = 0;
    var date = new Date();
    currentState.timeStart = date.getTime();
	var vTypeOpt = $('[name="visualizationType"]');
	for( var io = 0; io<vTypeOpt.length; io++)
	{
		if( vTypeOpt[io].checked)
		{
			currentState.visualizationType = io;
		}
	}
	if( currentState.visualizationType == 0)
	{
		// makes the canvas width and height eq 0
		$('#canvasField')[0].height=0;
		$('#canvasField')[0].width=0;
		$('#fieldForLife')[0].innerHTML = '';
	}
	else if( currentState.visualizationType == 2)
	{
		$('#canvasField')[0].height=700;
		$('#canvasField')[0].width=700;
		$('#fieldForLife')[0].innerHTML = '';
	}

    performNextStep();
}

function onPause()
{
    currentState.run = false;
}
