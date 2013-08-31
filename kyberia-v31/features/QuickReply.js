
function QuickReply()
{
	this.name = 'QuickReply';
	this.onLoad = function()
	{
		$('.node_content').each(function()
		{
			var t = $(this);
			var header = t.find('.node_header');
			var add = $('<button class="btn_QuickReply">').text('reply').css({float: 'right'});
			add.prependTo(header);

			add.click(function() {
				var form = t.find('.QuickReply');
				if (form.length) removeForm(form);
				else addForm(t);
				return false;
			});
		});
	};
	///////////////////////////////////////////////

	function removeForm(form)
	{
		form.slideUp(function() {
			form.remove();
		});
	}
	function addForm(content)
	{
		var body = content.find('.node_body');
		var link = content.find('.node_header_title_nodename').attr('href');
		var form = $('<form class="QuickReply" method="POST" enctype="multipart/form-data">').attr('action', link);
		form.css({'border-top': '1px solid #6dae42', display: 'block', 'margin-top': '30px'});
		form.css('margin-left', body.css('margin-left'));

		var id = link.match('[0-9]+$');
		if (id) id = id[0];
		if (!id) return;

		var ta = $('<textarea name="node_content">').appendTo(form);
		ta.css({width: '100%', border: 'none', height: '50px'});
		$('<input type="hidden" name="template_id" value="4">').appendTo(form);
		$('<input type="hidden" name="node_parent">').val(id).appendTo(form);

		var cancel = $('<button>').text('cancel');
		var add = $('<input type="submit" name="event" value="add">').text('add');

		cancel.add(add).appendTo(form).css({float: 'right'});

		form.hide().appendTo(content).slideDown();
		ta.focus();

		cancel.click(function() { removeForm(form); return false; });
	}
}


g_features.push( new QuickReply() );

