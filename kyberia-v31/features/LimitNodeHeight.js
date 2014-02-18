
function LimitNodeHeight()
{
	this.name = 'LimitNodeHeight';
	var arrNodes;
	var checkFor30secs = 30;	// nodes keep loading, so their size also changes..
	this.onLoad = function()
	{
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
		if (h < 1400) return;

		if (t.data('islong')) return;
		if (t.find('textarea').length) return;
		t.data('islong', 1);

		if (t.is('td'))
		{
			var div = $('<div>').append( t.contents() );
			t.append(div);
			t = div;

		}

		t.height(700);

		if (0 && 'UGLY SCROLLBAR')
		{
			t.css('overflow-y', 'scroll');
		}
		if ('SHOW MORE BUTTON')
		{
			var nMore = (h/1000).toFixed(0)*1;
			var expand = $('<div class="kyberia-v31-show-more-button">').html('show '+(nMore>1?nMore+'x':'')+' more');

			expand.css({ position:'absolute', bottom:0, left:0, right: 0, 'text-align':'center',
							'line-height':'40px', cursor:'pointer', background:'#6dae42', color:'#fff',
							'box-shadow': '0 0 10px #000',
			});
			expand.click(function() {
				expand.hide();
				t.css('height', 'auto');
			});

			t.append(expand).css({ position:'relative', overflow: 'hidden' });
		}
	}
	////////////////////////////////////////////////////////////

	function nodes() {
		var nodes = $('.node_body, .k_new_node_body, .k_node_content');
		/*if (!nodes.length)
		{
			$('table.bordered>tbody').each(function() {
				nodes = nodes.add( $(this).find('tr:eq(1)>td:eq(0)[valign=top]') );
			});
		}*/
		return nodes;
	}

}

g_features.push( new LimitNodeHeight() );

