
function CompactMode()
{
	this.name = 'CompactMode';
	this.onLoad = function()
	{
		applyCompactMode();
		applyFlatThreads();
	}
	////////////////////////////////////////////////////////////


	// FLAT THREADS
	function applyFlatThreads()
	{
		$('.node_body').css({background: 'none'});
		$('.lvl > ul').each(function() {
			var li = $(this).find('> li');
			if (li.length == 1)
				li.addClass('FlatThreads-chat');
			else
				li.addClass('FlatThreads-post');
		});

		var style = "\
			.FlatThreads-chat					{ padding-left: 0 !important; }\
			.FlatThreads-chat > .node_content	{ border: 1px solid #333; margin-top: -1px; }\
			.FlatThreads-post > .node_content	{ margin-top: 20px; margin-bottom: 0px; }\
		";
		$('<style>').text(style).appendTo('body');
	}


	// COMPACT MDOE
	function applyCompactMode()
	{
		var style = "\
			.compact-mode.header_bg		{ background: #333; position: absolute; width: 105px;\
											left: 1px; top: 1px; bottom: 1px; }\
			.compact-mode.node_header	{ float: left; width: 95px; margin: 0; background: none;\
											padding-left: 8px; padding-top: 5px; }\
			x.compact-mode.node_header	{ position: absolute; width: 95px; margin: 0; background: #333;\
											top: 1px; bottom: 1px; left: 1px;\
											padding-left: 8px; padding-top: 5px; }\
			.compact-mode.node_body		{ margin-left: 110px; padding: 10px 5px; position: relative; }\
			.compact-mode.node_content	{ margin-bottom: 0; margin-top: 0; }\
			.compact-mode.node_avatar	{ top: 0; left: 0; position: static; vertical-align: middle; }\
			.compact-mode.node_avatar	{ width: 25px; max-height: 25px; }\
			.compact-mode.lvl			{ padding-top: 0; border-left: none; }\
			.compact-mode.level1		{ border-bottom: none; margin-top: 20px; }\
			.compact-mode.hidden_header	{ position: absolute; top: -2px; left: 110px; font-size: 10px; \
											color: #555; z-index: 1; }\
			.node_header_title			{ position: absolute; right: 30px; top: -2px; }\
			.node_header_title_nodename { font-size: 10px; }\
			.quickK						{ position: absolute; right: -1px; top: 0; }\
			.quickK input				{ margin: 0; }\
		";
		$('<style>').text(style).appendTo('body');
		$('.node_header, .node_body, .node_content').addClass('compact-mode');
		$('.node_avatar, .node_avatar, .lvl, .level1').addClass('compact-mode');

		// remove useless elements
		$('.vector, .descendants_link, .node_header_level').hide();
		$('.actionToggleThread').remove();	// hide didnt work

		// header - hidden elements
		$('.node_header').each(function()
		{
			var header = $(this);
			var content = header.parent();
			var body = content.find('.node_body');

			var bg = $('<div>').addClass('compact-mode header_bg').prependTo(content);	// just bg color

			var hidden = $('<div>').prependTo(content);
			hidden.addClass('compact-mode hidden_header')

			$('input[type=checkbox], .node_header_created, .node_header_modified, .childVector', header).appendTo(hidden);
			var hover = $('.node_header_title', header).appendTo(content);

			hover = hover.add(hidden).add('.InplaceEdit, .quickK, .btn_QuickReply', content);
			hover.hide();

			content.mouseenter(function() { hover.show(); });
			content.mouseleave(function() { hover.hide(); });
		});
	}

}

g_features.push( new CompactMode() );

