
function LimitNodeWidth()
{
	this.name = 'LimitNodeWidth';
	this.onLoad = function() {
		$('<style>').text('table.bordered { max-width: 800px; } ').appendTo('body');
		$('<style>').text('table.bordered img { max-width: 800px; height: auto !important; } ').appendTo('body');

		// http://kyberia.sk/id/5898094
		$('<style>').text('.item.bordered .content img { max-width: 100%; } ').appendTo('body');
	}

}

g_features.push( new LimitNodeWidth() );

