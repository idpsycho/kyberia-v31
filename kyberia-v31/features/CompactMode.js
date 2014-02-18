
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
			.compact-mode.header_skip	{ position: absolute; width: 50px;\
											left: -53px; top: 0; bottom: 0; cursor: s-resize; }\
			.compact-mode.header_skip:hover { background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAVCAYAAAAElr0/AAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9sDExYsLKJjHGIAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAABMUlEQVRYw+2W0XLCIBBF726ICUH//z/bIGDA7YuNZjSWOuJQpzuzDxkgh1x2uSEAgjcIBoCdMTcHdd8/DVSawfcGnffFlXwWQ10+DFojHA5IKWFrDJgIH+O4UPUoAmaGcw4xpZsv7bsOrVKYYoQPAa9g8OURT9OEdFo4WguRZfsQEfbOYbQWfdetqtMqhU9rrz6iJIMBgJjRNM2Pxycic4JodZ4PAWYYsGnb8wYLMxgA5HicFaA7ECKaE7J+2U0xwu736Dab8wYLMxY94kKAPtWw7ns0TYOtMfDeI6YEEcGg9Vy/a2GGAUyEKcbr5i7IkNzcGSO/mf9IPspgvEnQWzl7zY6dyyhWWq/+K1C1O3Yug2t37FwG1+7YuQyu3bFzGepbrZodO4eB2h3739n/anwBxaTrznAxNmsAAAAASUVORK5CYII=); }\
			.compact-mode.header_bg		{ background: #333; position: absolute; width: 105px;\
											left: 1px; top: 1px; bottom: 1px; }\
			.compact-mode.node_header	{ float: left; width: 95px; margin: 0; background: none;\
											padding-left: 8px; padding-top: 5px; }\
			x.compact-mode.node_header	{ position: absolute; width: 95px; margin: 0; background: #333;\
											top: 1px; bottom: 1px; left: 1px;\
											padding-left: 8px; padding-top: 5px; }\
			.compact-mode.node_body		{ margin-left: 110px; padding: 10px 5px; position: relative; }\
			.compact-mode.node_body img	{ max-width: 100%; }\
			.compact-mode.node_content	{ margin-bottom: 0; margin-top: 0; display: block; \
											clear: both; }\
			.compact-mode.node_avatar	{ top: 0; left: 0; position: static; vertical-align: middle; \
											width: 25px; max-height: 25px; }\
			.compact-mode.lvl			{ padding-top: 0; border-left: none; }\
			.compact-mode.level1		{ border-bottom: none; margin-top: 20px; }\
			.compact-mode.hidden_header	{ position: absolute; top: -2px; left: 110px; font-size: 10px; \
											color: #555; z-index: 1; }\
			.node_header_title			{ position: absolute; right: 70px; top: -2px; }\
			.node_header_title_nodename { font-size: 10px; }\
			.quickK						{ position: absolute; right: -1px; top: 0; }\
			.quickK input				{ margin: 0; }\
			.node_header .node_login	{ word-break: break-word; }\
			iframe.youtube-player		{ max-width: 100%; }\
		";
		$('<style>').text(style).appendTo('body');
		$('.node_header, .node_body, div.node_content').addClass('compact-mode');
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
			var skip = $('<div>').addClass('compact-mode header_skip').prependTo(content);
			skip.attr('title', 'skip');

			var hidden = $('<div>').prependTo(content);
			hidden.addClass('compact-mode hidden_header')

			$('input[type=checkbox], .node_header_created, .node_header_modified, .childVector', header).appendTo(hidden);
			var hover = $('.node_header_title', header).appendTo(content);

			hover = hover.add(hidden).add('.InplaceEdit, .quickK, .btn_QuickReply', content);
			hover.hide();

			content.mouseenter(function() { hover.show(); });
			content.mouseleave(function() { hover.hide(); });

			skip.click(function(e) {
				var next = content.parents('.lvl:eq(0)').next();
				animScrollTop_ToNext(content, next);
			});
			content.append('<div style="clear: left; height: 0; line-height: 0;">');
		});
	}

}

g_features.push( new CompactMode() );

