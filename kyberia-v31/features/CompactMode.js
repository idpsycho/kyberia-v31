
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
			.FlatThreads-chat > .node_content	{ border: 1px solid #333; border-top: none; }\
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
			.compact-mode.node_body		{ margin-left: 110px; padding: 5px; }\
			.compact-mode.node_content	{ margin-bottom: 0; margin-top: 0; }\
			.compact-mode.node_avatar	{ top: 0; left: 0; position: static; vertical-align: middle; }\
			.compact-mode.node_avatar	{ width: 18px; max-height: 18px; }\
			.compact-mode.lvl			{ padding-top: 0; border-left: none; }\
			.compact-mode.level1		{ border-bottom: none; margin-top: 20px; }\
			.compact-mode.hidden_header	{ position: absolute; z-index: 9; background: #333; padding: 3px 0;\
											border: 1px solid #6dae42; border-bottom: none; \
											left: -1px; bottom: 0px; width: 100%; overflow: hidden; }\
		";
		$('<style>').text(style).appendTo('body');
		$('.node_header, .node_body, .node_content').addClass('compact-mode');
		$('.node_avatar, .node_avatar, .lvl, .level1').addClass('compact-mode');

		// remove useless elements
		$('.vector, .descendants_link').hide();
		$('.actionToggleThread').remove();	// hide didnt work

		// header - hidden elements
		$('.node_header').each(function()
		{
			var header = $(this);
			var content = header.parent();

			$('<div>').addClass('compact-mode header_bg').prependTo(content);	// just bg color

			var hiddenWrap = $('<div>').prependTo(content).css({position: 'relative'});
			var hidden = $('<div>').appendTo(hiddenWrap);
			hidden.hide().addClass('compact-mode hidden_header')

			$('form.quickK, button.btn_QuickReply', header).appendTo(hidden);
			$('input[type=checkbox], .node_header_created, .node_header_modified', header).appendTo(hidden);
			$('.node_header_level, .node_header_title, .childVector', header).appendTo(hidden);

			content.mouseenter(function() { hidden.stop(true, true).slideDown(); });
			content.mouseleave(function() { hidden.stop().slideUp(); });
		});
	}

}

g_features.push( new CompactMode() );

