
function AjaxButtons()
{
	this.name = 'AjaxButtons';
	this.onLoad = function()
	{
		var style = "button:hover, input[type=submit]:hover { cursor: pointer; opacity: 0.5; }";
		$('<style>').text(style).appendTo('body');

		addButtonsToCONS();

		addKtoEveryNode();

		ajaxifyButtons();
	}
	////////////////////////////////////////////////////////////

	function addButtonsToCONS()
	{
		if (!window.location.href.match(/\/id\/5286347$/))
			return;

		$('a[title=skip]').each(function() {
			var bordered = $(this).parents('table.bordered:eq(0)');
			var header = bordered.find('td.header:eq(0)');
			var node_link = header.find('a:eq(0)').attr('href');

			$(this).after( makeButton(node_link, 'fook') );
			//$(this).after( makeButton(node_link, 'book') );
			$(this).after( makeButton(node_link, 'K') );
		});
	}
	function makeButton(node_link, value)
	{
		var form = $('<form method="POST">').attr('action', node_link);
		var submit = $('<input name="event" type="submit">').val(value);
		return form.append(submit);
	}
	function addKtoEveryNode()
	{
		$('.node_content').each(function() {
			var header = $(this).find('.node_header');
			var link = header.find('.node_header_title_nodename').attr('href');

			var kform = $('<form class="quickK" method="POST">').attr('action', link);
			kform.append('<input type="submit" name="event" value="K">');
			kform.css({position: 'absolute', right: '1px', top: '2px', margin: 0});

			$(this).append(kform);
		});
	}

	function ajaxifyButtons()
	{
		Ks().on('click', function() {
            var anticsrf = $('input[name="anticsrf"]').attr('value');
			var btn = $(this);
			var action = actionOf(btn);
			var data = {event: 'K', 'anticsrf': anticsrf};
			var node_chosen = nodeChosenOf(btn);
			if (node_chosen)
				data.node_chosen = node_chosen;

			btn.hide();
			$.post(action, data, function() {
				if (!node_chosen)
					btn.css({color: 'red', 'font-weight':'bold', border:'none'})
				btn.fadeIn();
			});
			return false;
		});

		fooks().add(unfooks()).on('click', function() {
            var anticsrf = $('input[name="anticsrf"]').attr('value');
			var btn = $(this);
			var val = btn.val();
			var newVal = val=='fook'?'unfook':'fook';
			$.post(actionOf(btn), {'event':val, 'anticsrf': anticsrf}, function() {
				btn.val( newVal );
				var fooked = btn.parents('table.bordered').eq(0);
				if (fooked && val=='fook')
					$('<div>').insertAfter(fooked).append(fooked).slideUp(500);
			});
			return false;
		});

		books().add(unbooks()).on('click', function() {
            var anticsrf = $('input[name="anticsrf"]').attr('value');
			var btn = $(this);
			var val = btn.val();
			var cat = btn.parents('form:eq(0)').find('[name=bookcat_id]').val();
			var newVal = val=='book'?'unbook':'book';
			$.post(actionOf(btn), {event:val, bookcat_id:cat, 'anticsrf': anticsrf}, function() {
				btn.val( newVal );
			});
			return false;
		});

		skips().each(function() {
			var t = $(this);
			t.prepend( $('<div>skip</div>') );
			t.siblings('a:contains(skip)').hide();

			var p = t.parent('td');
			p.add(t).attr('title', 'skip').css({'cursor':'s-resize'});
			p.click(function() { t.trigger('click'); });
		});

		skips().click(function() {
			var curr = $(this).parents('.bordered:eq(0)');
			var next = getElemByHref( $(this).attr('href') );
			animScrollTop_ToNext( curr, next );
			return false;
		});
	}


	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }
	function nodeChosenOf(btn) {
		var form = btn.parents('form:eq(0)');
		var choser = form.find('input[name="node_chosen[]"]');
		if (!choser.length) return;

		var node_chosen = [];
		choser.filter(':checked').each(function() {
			node_chosen.push( $(this).val() );
		});

		return node_chosen;
	}

	function fooks() { return $('input[type=submit][value=fook]'); }
	function unfooks() { return $('input[type=submit][value=unfook]'); }
	function books() { return $('input[type=submit][value=book]'); }
	function unbooks() { return $('input[type=submit][value=unbook]'); }
	function Ks() { return $('input[type=submit][value=K]'); }
	function skips() { return $('a[title=skip]'); }

}

g_features.push( new AjaxButtons() );

