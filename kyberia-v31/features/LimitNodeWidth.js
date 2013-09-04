
function LimitNodeWidth()
{
	this.name = 'LimitNodeWidth';
	this.onLoad = function() {
		$('<style>').text('table.bordered { max-width: 800px; } ').appendTo('body');
		$('<style>').text('table.bordered img { max-width: 800px; } ').appendTo('body');
	}

}

g_features.push( new LimitNodeWidth() );

