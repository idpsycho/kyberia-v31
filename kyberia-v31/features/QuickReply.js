
function QuickReply()
{
	this.name = 'QuickReply';
	this.onLoad = function()
	{
		$('<style>').text('div.node_body { padding-bottom: 18px; }').appendTo('body');

		$('div.node_content').each(function()
		{
			var t = $(this);
			var add = $('<button class="btn_QuickReply">').text('reply');
			add.css({
				'position': 'absolute',
				'top': '2px',
				'right': '24px',
				'margin': '0',
				'vertical-align': 'middle'
			});
			add.appendTo(t);

			add.click(function() {
				var form = t.next('.QuickReply');
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
		var form = $('<div class="QuickReply">');
		form.css({display: 'block', 'margin-bottom': '50px',
					'margin-top': '10px', 'margin-left': body.css('margin-left')});

		var id = link.match('[0-9]+$');
		if (id) id = id[0];
		if (!id) return;

		var ta = $('<textarea tabindex="1" name="node_content">').appendTo(form);
		ta.css({width: '100%', border: '1px solid #6dae42', height: '50px', 'margin-bottom': '2px'});
		ta.keydown(function(e) {
			if (e.ctrlKey && e.which==13) {
				sendForm(ta, id, body);
				return false;
			}
		});

		var cancel = $('<button tabindex="3">').text('cancel');
		var add = $('<button tabindex="2">').text('add');

		add.click(function() {
			sendForm(ta, id, body);
			return false;
		});

		cancel.add(add).appendTo(form).css({float: 'right'});
		form.append( $('.add_k_cmnt:eq(0)').clone().append('<span> K</span>') );

		form.hide().insertAfter(content).slideDown();
		ta.focus();

		cancel.click(function() { removeForm(form); return false; });
	}
	function sendForm(ta, id, body)
	{
		if (ta.data('sending')) return;
		ta.data('sending', 'yep');

		var data = {node_content: ta.val(), node_parent: id, template_id: 4, event: 'add'};
		ta.prop('disabled', true);
		$.post('/id/'+id, data, function(resp) {
			var html = ta.val();
			var wrap = ta.parent();
			wrap.removeClass('QuickReply').children().remove();

			html = html.replace(/\n/g, '<br>');

			//var html = $(resp).find('#topic').html();
			var node = $('<div>').html(html).appendTo(wrap);
			node.css('border', '1px solid #6dae42');
			node.css('padding', body.css('padding'));
		});
	}

}


g_features.push( new QuickReply() );

