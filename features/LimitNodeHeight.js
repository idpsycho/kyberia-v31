
function LimitNodeHeight()
{
	this.name = 'LimitNodeHeight';
	var arrNodes;
	var checkFor30secs = 30;	// nodes keep loading, so their size also changes..
	this.onLoad = function() {
		arrNodes = nodes();
		checkForLongNodes();
	}

	function checkForLongNodes()
	{
		nodes().each(fixLongNode);

		if (checkFor30secs-- > 0)
			setTimeout(checkForLongNodes, 1000);
	}

	function fixLongNode()
	{
		var t=$(this);
		var h = t.height();
		if (h < 1000) return;

		if (t.data('islong')) return;
		t.data('islong', 1);

		if (t.is('td'))
		{
			var div = $('<div>').append( t.contents() );
			t.append(div);
			t = div;

		}
		t.height(500);
		t.css('position', 'relative');
		var nMore = (h/500).toFixed(0)*1;
		var expand = $('<div>').html('show '+(nMore>1?nMore+'x':'')+' more');

		t.append(expand);
		t.css('overflow', 'hidden');

		expand.css({ position:'absolute', bottom:0, left:0, right: 0, 'text-align':'center',
						'line-height':'40px', cursor:'pointer', background:'#555', color:'#fff' });
		expand.click(function() {
			expand.hide();
			t.css('height', 'auto');
		});
	}
	////////////////////////////////////////////////////////////

	function nodes() {
		var nodes = $('.node_body');
		if (!nodes.length)
		{
			$('table.bordered>tbody').each(function() {
				nodes = nodes.add( $(this).find('tr:eq(1)>td:eq(0)') );
			});
		}
		return nodes;
	}

}

g_features.push( new LimitNodeHeight() );

