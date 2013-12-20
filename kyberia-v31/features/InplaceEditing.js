
function InplaceEditing()
{
	this.name = 'InplaceEditing';
	this.onLoad = function() {
		$('.node_header_title_conf').each(function()
		{
			var conf = $(this);
			var content = conf.parents('.node_content:eq(0)');
			var body = content.find('.node_body');
			$('<style>').text('.node_body { padding-bottom: 18px; }').appendTo('body');

			var link = content.find('.node_header_title_nodename').attr('href');
			var buttons = $('<div class="InplaceEdit">').appendTo(content);
			buttons.css({position: 'absolute', bottom: '1px', right: '50px'})
			var edit = $('<button onclick="return false">').text('edit');
			var save = $('<button tabindex="2">').text('save').hide();
			var cancel = $('<a href="#" tabindex="3">').html('&nbsp; cancel').hide();

			buttons.append(edit).append(save).append(cancel);

			edit.click(function() {
				editNodeBody(body);
				save.add(cancel).show();
				edit.hide();
				return false;
			});
			save.click(function() {
				saveNodeBody(body, link);
				save.add(cancel).hide();
				edit.show();
				return false;
			});
			cancel.click(function() {
				cancelNodeBody(body);
				save.add(cancel).hide();
				edit.show();
				return false;
			});
		});
	}
	////////////////////////////////////////////////////////////

	function editNodeBody(body)
	{
		var ta = $('<textarea tabindex="1">');
		var w = body.width();
		var h = body.height() * 1.1 + 40;
		ta.add(body).width(w).height(h);

		ta.css('font-family', body.css('font-family'));
		ta.css('font-size', body.css('font-size'));
		ta.css('color', body.css('color'));
		ta.css('background', body.css('background'));
		ta.css('border', body.css('border'));
		ta.css('margin-top', '15px');
		ta.css('margin-bottom', '25px');

		body.data('orig-padding', body.css('padding'));
		body.css('padding', '0');

		body.data('orig-html', body.html());
		var html = body.html().replace(/<br>\n/g, '\n');
		ta.val( $.trim(html) );
		body.html('');
		body.append(ta);
		ta.focus();
	}

	function cancelNodeBody(body)
	{
		body.find('textarea').remove();
		body.html( body.data('orig-html') );
		body.css({width: 'auto', height: 'auto', padding: body.data('orig-padding')});
	}
	function saveNodeBody(body, link)
	{
		var ta = body.find('textarea');
		var html = ta.val();
		$.post(link, {event: 'configure_content', node_content: html}, function(resp) {
			ta.remove();
			var html = $(resp).find('#topic').html();
			body.html(html);
			body.css({width: 'auto', height: 'auto', padding: body.data('orig-padding')});
		});
	}

}


g_features.push( new InplaceEditing() );

