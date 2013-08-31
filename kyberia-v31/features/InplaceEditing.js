
function InplaceEditing()
{
	this.name = 'InplaceEditing';
	this.onLoad = function() {
		$('.node_header_title_conf').each(function()
		{
			var link = $(this).parent().find('.node_header_title_nodename').attr('href');
			var conf = $(this);
			var edit = $('<a href="#">edit</a>');
			var line = $('<span> | </span>');
			var save = $('<a href="#">save</a>').hide();
			var line2 = $('<span> | </span>').hide();
			var cancel = $('<a href="#">cancel</a>').hide();
			conf.after( line.add(edit).add(save).add(line2).add(cancel) );

			var body = conf.parents('.node_content:eq(0)').find('.node_body');

			edit.click(function() {
				editNodeBody(body);
				save.add(line2).add(cancel).show();
				edit.hide();
				return false;
			});
			save.click(function() {
				saveNodeBody(body, link);
				save.add(line2).add(cancel).hide();
				edit.show();
				return false;
			});
			cancel.click(function() {
				cancelNodeBody(body);
				save.add(line2).add(cancel).hide();
				edit.show();
				return false;
			});
		});
	}
	////////////////////////////////////////////////////////////

	function editNodeBody(body)
	{
		var ta = $('<textarea>');
		var w = body.width();
		var h = body.height() * 1.1 + 20;
		ta.add(body).width(w).height(h);

		ta.css('font-family', body.css('font-family'));
		ta.css('font-size', body.css('font-size'));
		ta.css('color', body.css('color'));
		ta.css('background', body.css('background'));
		ta.css('border', body.css('border'));
		ta.css('padding', body.css('padding'));

		body.css('padding', '0');
		body.css('position', 'relative');

		ta.css('position', 'absolute');
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
		body.css({width: 'auto', height: 'auto'});
	}
	function saveNodeBody(body, link)
	{
		var ta = body.find('textarea');
		var html = ta.val();
		$.post(link, {event: 'configure_content', node_content: html}, function(resp) {
			ta.remove();
			var html = $(resp).find('#topic').html();
			body.html(html);
			body.css({width: 'auto', height: 'auto'});
		});
	}

}


g_features.push( new InplaceEditing() );

