window.onload = function()
{
}

var currStep = 0;

function doStep()
{
	$('#iteration_counter')[0].innerHTML = currStep;
	field.step();
	drawField();
	if( currStep < 2000)
	{
		currStep++;
		setTimeout(doStep, 100);
	}
}


function drawField()
{
	var content = '';
	// first of all draw the whole table
	content += '<table class="field_table">';
	// then draw the header 
	content += '<tr>';
	content += '<td>';
	content += '</td>';
	content += '<td>';
	content += '<table>';
	for( var idxldc= 0; idxldc < lendc; idxldc++)
	{
		content += '<tr>';
		for( var idxlc= 0; idxlc < lenc; idxlc++)
		{
			content += '<td class="num">';
			if( columns[idxldc][idxlc] )
				content += columns[idxldc][idxlc];
			else
				content += '&nbsp';

			content += '</td>';
		}
		content += '</tr>';
	}
	content += '</table>';

	content += '</td>';
	content += '</tr>';

	// then body
	content += '<tr>';
	// in body left panel
	content += '<td>';
	content += '<table>';
	for( var idxldr= 0; idxldr < lenr; idxldr++)
	{
		content += '<tr>';
		for( var idxlr= 0; idxlr < lendr; idxlr++)
		{
			content += '<td class="num">';
			if( rows[idxldr][idxlr] )
				content += rows[idxldr][idxlr];
			else
				content += '&nbsp';
			content += '</td>';
		}
		content += '</tr>';
	}
	content += '</table>';

	content += '</td>';
	// real body
	content += '<td>';

	content += '<table>';
	for( var idxbr= 0; idxbr < lenr; idxbr ++)
	{
		content += '<tr>';
		for( var idxbc = 0; idxbc < lenc; idxbc++)
		{
			if( field.data[idxbc][idxbr] == 1 )
			{
				content += '<td style="background-color: rgb(0,0,0)">';
			}
			else if( field.data[idxbc][idxbr] == -1 )
			{
				content += '<td>X';
			}
			else
				content += '<td>&nbsp';
			content += '</td>';
		}
		content += '</tr>';
	}
	content += '</table>';

	content += '</td>';
	content += '</tr>'
	// finish everything
	content += '</table>';

	$('#field')[0].innerHTML = content;
}
 

