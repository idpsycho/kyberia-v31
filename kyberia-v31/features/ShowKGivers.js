
function ShowKGivers()
{
	var waitBeforeLoad = 1000;

	this.name = 'ShowKGivers';
	this.onLoad = function() {

		// first set NODE_ID and class K_value to all K values
		$('td > span.most_important', 'table.bordered').each(function() {
			var k = $(this);
			var bordered = k.parents('table.bordered:eq(0)');
			var id = bordered.find('form:eq(0)').attr('action').match(/[0-9]+$/);
			if (!id) return;
			k.addClass('K_value').data('node_id', id);
		});

		$('.node_header_k').each(function() {
			var k = $(this);
			var content = k.parents('.node_content:eq(0)');
			var id = content.find('a.node_header_title_nodename').attr('href').match(/[0-9]+$/);
			if (!id) return;
			k.addClass('K_value').data('node_id', id);
		});

		$('.node_info2 > .most_important:eq(0)').each(function() {
			var k = $(this);
			var id = $('#sidebar_node a:eq(0)').attr('href').match(/[0-9]+$/);
			if (!id) return;
			k.addClass('K_value').data('node_id', id);
		});

		// now go through all valid found K_values
		$('.K_value').each(function() {
			var k = $(this);
			var id = k.data('node_id');
			if (!id) return;

			k.css({ cursor: 'pointer' })
			k.mouseenter(function() {
				var t = time();
				k.data('entered', t).data('left', 0);
				//console.log('entered: '+t);

				if (showK_list(k)) return;

				setTimeout(function() {
					if (k.data('entered') == t) loadK_list(k, id);
				}, waitBeforeLoad);

			});
			k.mouseleave(function() {
				var t = time();
				k.data('left', t).data('entered', 0);
				//console.log('left: '+t);
				setTimeout(function() {
					if (k.data('left') == t) hideK_list(k);
				}, waitBeforeLoad);
			});
		});

		$(document).click(function() {
			$('.K_value .K_list:visible').fadeOut();
		});
	}
	function showK_list(k) {
		k.stop(true, true).css({opacity: 1});
		var K_list = k.find('.K_list');
		K_list.stop(true, true).fadeIn();
		//K_list.show();
		return K_list.length;
	}
	function hideK_list(k) {
		var K_list = k.find('.K_list');
		K_list.stop(true, true).fadeOut();
		//K_list.hide();
	}
	function loadK_list(k, id) {
		if (showK_list(k))
			return;

		var url = '/id/'+id+'/1908499';
		$.get(url, function(resp) {
			var trs = $(resp).find('table.bordered:last tr');
			var list = $();
			trs.each(function() {
				var gaveK = $(this).text().match(/K , [0-9]+ visitz[ ]*$/);
				if (!gaveK)
					return false;

				var icon = $(this).find('img:eq(0)').css('vertical-align', 'middle');
				var nick = $(this).find('a:eq(0)').css({ 'text-transform': 'none', 'font-weight': 'normal' });
				var Ksymbol = $('<b>').text('K').css({ color:'red', margin: '0 10px' });
				var num = $('<span>').html( (list.length+1)+'.&nbsp;' ).css({ color: '#6dae42', 'font-weight': 'normal' });
				var line = $('<div>').append(icon).append(Ksymbol).append(num).append(nick);
				line.css({ margin: '2px' })
				list = list.add( line );
			});
			addK_list(k, list);
		});
	}
	function addK_list(k, list) {
		k.css({position: 'relative'});
		var K_list = $('<div class="K_list">').append(list).hide().prependTo(k);
		K_list.css({ position: 'absolute', left: '50px', top: 0, border: '1px solid #6dae42',
						background: '#111', padding: '5px 10px', 'z-index': 99, 'min-width': '200px',
						'text-align': 'left', 'margin-bottom': '50px' });

		showK_list(k);
	}
	////////////////////////////////////////////////////////////

}

g_features.push( new ShowKGivers() );

