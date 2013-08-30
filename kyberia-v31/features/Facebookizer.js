
function Facebookizer()
{
	this.name = 'Facebookizer';
	this.onLoad = function() {
		Facebookizer_OLD_BORDEL();
	}
	////////////////////////////////////////////////////////////

}


function Facebookizer_OLD_BORDEL() {

var PAD_LEFT = 60;
var SHOW_NODES_INFO = 0;
var DBG_INFO = 0;
var REVERSE = 0;
var FB_MODE = 1;

var arrTimers = [];

$.fn.padLeft = function(x) { this.css('padding-left', x+'px'); }
$.fn.csss = function(s)
{
	var arr = s.split(';');
	var a = {};
	for (var i=0; i < arr.length; i++)
	{
		var name_val = arr[i];
		name_val = name_val.split(':');
		if (name_val.length!=2)
			continue;

		var name = $.trim( name_val[0] );
		var val = $.trim( name_val[1] );

		if (!name || !name.length)
			continue;

		a[name] = val;
	}
	return this.css( a );
}


$.fn.qq = function()
{
	return this.addClass('qq');
}
$.addStyle = function(rule)
{
	$('head').append('<style>'+ rule +'</style>');
}
$.fn.outerHtml = function()
{
	return $("<p>").append(this.eq(0).clone()).html();
}




function ready()
{
	$('.vector, .actionToggleThread, .descendants_link, .mood').remove();
	$('.node_header_level, .node_header_modified, .childVector, .node_chosen').remove();



	$('.lvl').qq();
	$('.node_children').qq();
	$('.node_body').qq();
	$('.node_header_hardlink').qq();


$.addStyle('\
	.qq.node_header_title_nodename	{ font-size: 8px; clear: both; float: left; }\
	.qq.node_header_hardlink		{ clear: both; float: left; }\
	.qq.node_content.topicNode		{ background: #333; border: 2px solid #888; }\
	.qq.node_content.topicNode.notFirst	{ margin-top: 30px; }\
	.qq.lvl							{ border: none; padding-bottom: 0; padding-top: 0; }\
	.qq.node_children				{ width: 800px; }\
	.qq.node_avatar 				{ left: 0; top: 0; position: relative; width: 30px; height: auto;\
										float: left; padding-right: 5px; margin: -3px; margin-right: 0; }\
	.qq.node_login 					{ padding: 3px; float: left; }\
	.qq.node_header_k 				{ float: right; margin: 1px; }\
	.qq.node_header_title 			{ padding: 3px; text-align: left; font-size: 8px; margin-top: 5px; }\
	.qq.node_header					{ min-height: 15px; font-size: 8px;\
										float: left; width: 100px; background: none; }\
	.qq.toggleBar					{ position: absolute; top: 0; height: 120%; background: #050505; }\
	.qq.toggleBar.hover				{ background: #111; }\
	.qq.node_content				{ font-size: 11px; background: none; border: 1px solid #333;\
										margin: 0; margin-top: 1px; }\
	.qq.node_body					{ background: none; padding: 5px 5px 5px 102px; }\
	.qq.node_header_created			{ clear: both; float: left;}\
	.qq.node_header_changed			{ float: right; font-weight: normal; }\
	.qq.node_header_new				{ float: right; font-weight: normal; }\
	.node_body						{ height: auto; }\
	.compressed .qq.node_header_title	{ display: none; }\
	.qq.node_header_title.force_info	{ display: block; }\
	.compressed .qq.node_header_title.force_info	{ display: block; }\
');


	$('.node_content').qq().each( function(i, e)
	{
		e = $(e);

		var avatar	= e.find('.node_avatar').qq();
		var login	= e.find('.node_login').qq();
		var kacka	= e.find('.node_header_k').qq();
		var title	= e.find('.node_header_title').qq();
		var date	= e.find('.node_header_created').qq();

		title.prepend(date);
		title.find('.node_header_title_nodename').qq();

		var header = e.find('.node_header');
		e.prepend(header);

		var node_body = e.find('.node_body');
		header.qq();
		e.prepend(header);

		header.prepend(login);
		login.prepend(avatar);

		// [7K]
		if (kacka && kacka.length)
		{
			$( kacka[0].nextSibling ).remove();
			$( kacka[0].previousSibling ).remove();
		}
		node_body.prepend( e.find('.node_header_new').qq() );
		node_body.prepend( e.find('.node_header_changed').qq() );
		node_body.prepend(kacka);

		addToggleBar(e);

		toggleVisibility(e, SHOW_NODES_INFO);
	});

	// hover info
	$('.node_header').hover(
		function() { $(this).find('.node_header_title:eq(0)').addClass('force_info') },
		function() { $(this).find('.node_header_title:eq(0)').removeClass('force_info') }
	);

	addToggleBar('.node_children', 50);

	var mainN = $('.node_children');

	if (REVERSE)
		mainN.append( mainN.find("> li.lvl").get().reverse() );

	recursive_normalize_children(mainN, 0, PAD_LEFT, "allAreTopics");

	if (FB_MODE)
	{
		convertToFB();

		// convert all level2+ nodes to comment format
		$('.level2').find('.node_content').removeClass('topicNode');
	}
}


function capitalize(s)
{
	return s.slice(0,1).toUpperCase() + s.slice(1);
}

function convertToFB()
{
	/*
	#3B5998 - fb modra main navigation, bold (Like - L1)
	#6B84B4 - fb modra actions
	#fff - fb background
	#000 - topic text
	#999 - sive
	#333 - coments text
	#EDEFF4 - comments bg
	#D2D9E7 - comments border-bottom + margin-top: 1px
	#E9E9E9 - main_node border-bottom separator
	'0xB7' - separator dot
	#ccc - nahradit zelene bordery - border-color: #ccc;

	TODO

	*/

	// facebook
	$('body > table').qq().addClass('mainTable').attr('width', '');
	var mainCols = $('body > table > tbody > tr > td');
	if (mainCols.length == 2)
	{
		mainCols.qq();
		mainCols.eq(0).addClass('leftColumn').attr('width', '');
		mainCols.eq(1).addClass('rightColumn');
	}

	// facebook
	$('.t1 a').each( function(i, e)
	{
		e = $(e);
		var s = e.text();
		s = capitalize(s);
		e.text(s);
	});

	var nodename = $('#sidebar_node a:eq(0)').clone();
	$('.rightColumn').prepend(nodename);
	nodename.csss('color: #000; font-size: 20px; font-weight: bold; display: block; margin-bottom: 5px;');
	nodename.text( capitalize(nodename.text()) );

	// facebook
	$('.node_content').each( function(i, e)
	{
		e = $(e);
		var nb = e.find('.node_body');
		var title = e.find('.node_header_title_nodename');
		var nick = e.find('.node_login');
		var avat = e.find('.node_avatar');
		var likes = e.find('.node_header_k');
		nb.append(title);
		//title.prepend(likes);

		nick.after(avat);	// move avatar out of nick link..
		nb.prepend(nick);
		if (nb.parent().hasClass('topicNode'))
			nick.csss('display: block; float: none;');

		// K -> likes
		var d = '<span class="fbgrey"> · </span>';
		var act = $('<span class="fbaction">');

		var ss = '';
		ss += act.text('Like').outerHtml() + d;
		ss += act.text('Comment').outerHtml() + d;
		ss += act.text('Share').outerHtml() + d;

		var s = likes.hide().text();
		var m = s.match(/[0-9]+/);
		if (m)
		{
			m = parseInt( m[0] );
			var mPerson = (m>1 ? ' people ' : ' person ');
			var mLike = (m>1 ? 'like' : 'likes');
			ss += act.text( m+mPerson ).csss('color: red; font-weight: bold;').outerHtml();
			ss += ' <span class="fbgrey">'+mLike+' this.</span>'+d;
		}

		ss += title.text().substr(0, 30)+'..';

		title.html(ss);
	});

	// toto z nejakeho dovodu nejde cez style v headeri, asi preto ze je to nastavene v dalsom cssku dalej..
	$('.header').css('width', 'auto');
	$('h3').csss('background: none;');
	$('.last').csss('margin: 0; margin-bottom: 1px; border: none; border-bottom: 1px solid #D2D9E7;');

	// nodeContent zrusit
	// ale nastavit farbu  e9e9e9
	// facebook
	$.addStyle('\
	\
	/* ----------------------------------       facebook        ---------------------------------- */ \
	#topic							{ border: none; margin-bottom: 20px; }\
	.node_userlist					{ margin-bottom: 30px; }\
	.fbgrey							{ color: #999; }\
	.fbaction						{ color: #6B84B4; }\
	body							{ background: #fff; color: #333; font-size: 11px; }\
	body, td						{ font-family: "lucida grande",tahoma,verdana,arial,sans-serif; }\
	h3								{ background-color: none; }\
	.last							{ background: #EDEFF4; padding: 4px 8px; margin: 0; margin-bottom: 1px;\
										border: none; border-bottom: 1px solid #D2D9E7;  }\
	.last img						{ margin: 3px 5px 0 0; }\
	\
	.header							{ background: #D8DFEA; color: #333; padding: 2px 5px;\
										border: none; width: none; }\
	.header > a						{ color: #3B5998; }\
	.active_user_name > a			{ font-weight: bold; }\
	.qq.node_content				{\
									background: #EDEFF4; color: #333; border: none;\
										margin: none; margin-top: 1px; padding: 5px; }\
	.qq.node_content.topicNode		{\
									background: white; color: #000; margin: none; padding-bottom: 6px; margin-bottom: 2px; border: none;}\
	\
	.qq.node_content.topicNode.notFirst	{ margin-top: 10px; }\
	.qq.topicNode .qq.node_avatar	{ width: 40px; height: auto; }\
	.qq.node_header_k				{ color: #6B84B4; float: none; text-transform: none; font-weight: normal; }\
	.qq.node_header_title_nodename	{ color: #999; margin-top: 10px; display: block; float: none; font-size: 11px; }\
	.qq.node_login					{ color: #3B5998; font-weight: bold; padding: 0; padding-right: 5px; }\
	.qq.node_body					{ padding-left: 45px; }\
	\
	/* ----------------------------------       facebook        ---------------------------------- */ \
	.t2						{ height: 35px; background: #d3d3d3; }\
	.t1						{ background: #3B5998; font-weight: bold; padding: 10px 0 3px 0;\
								border-bottom: 1px solid #133783; }\
	.t1	a					{ color: #D8DFEA; }\
	.t1 a:hover				{ color: #fff; }\
	a						{ color: #6B84B4; }\
	input, button			{ background: #EDEFF4; border-color: #ccc; color: #6B84B4; }\
	input.small				{ background: #EDEFF4; border-color: #ccc; color: #6B84B4; }\
	select					{ background: #EDEFF4; border-color: #ccc; color: #6B84B4; }\
	textarea				{ background: #EDEFF4; border-color: #ccc; color: #6B84B4;\
								width: 490px; height: 60px; }\
	.bordered				{ border-color: #ccc; }\
	.qq.node_header			{ background: none; width: 26px; margin: 8px; }\
	.qq.topicNode > .qq.node_header { width: 45px; }\
	.qq.node_header_created	{ display: none; }\
	.qq.toggleBar			{ background: #fcfcff; }\
	.qq.toggleBar.hover		{ background: #f5f5ff; }\
	\
	.qq.mainTable			{ margin-left: 210px; width: 980px; border-right: 1px solid #ccc; }\
	.qq.leftColumn			{ padding-top: 20px; width: 180px; border-right: 1px solid #ccc; }\
	.qq.rightColumn			{ padding-top: 20px; width: 780px; padding-left: 20px; }\
	\
	.qq.level1				{ padding-bottom: 15px; margin-bottom: 15px; border-bottom: 1px solid #e9e9e9; }\
	.qq.node_children		{ width: 500px; }\
	.add_put > select		{ width: 50px; }\
	select[name=sel_help]	{ display: none; }\
	\
	/* ----------------------------------       facebook        ---------------------------------- */ \
	');

}





/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////

function rnd(x)			{ if (typeof x == 'undefined') x = 1; return Math.random()*x; }
function rndi(x)		{ if (typeof x == 'undefined') x = 2; return Math.floor( rnd(x) ); }

function notDef(x) {
	return typeof x == "undefined";
}
function isDef(x, defaultParam) {
	return !notDef(x);
}
function formatSecsMs(ms, name)
{
	var s = "";
	if (isDef(name))
		s = name+": ";

	var sec = (ms/1000).toFixed(1);

	if (ms >= 100)
		return s + sec + "<small>s</small> &nbsp; ";
	else
		return s + ms + "<small>ms</small> &nbsp; ";
}

function t_getn(name)
{
	if (isDef(name))
		return t_get(name)+'\n<br>';

	var s = '';
	for (var name in arrTimers)
		if (arrTimers.hasOwnProperty(name))
			s += t_getn(name);

	return s;
}
function t_get(name)
{
	if (isDef(name))
		return formatSecsMs( arrTimers[name], name );

	var s = '';
	for (var name in arrTimers)
		if (arrTimers.hasOwnProperty(name))
			s += t_get(name);

	return s;
}

function time()
{
	return (new Date).getTime();
}

function t_dif(name, start)
{
	var t = time();
	var a = arrTimers;
	var n = name;
	if (!a[n] || start)
		a[n] = t;
	else
		a[n] = t - a[n];

	return a[n];
}





function addToggleBar(where, width)
{
	where = $(where);
	var w = width ? width : 25;

	var toggleAllBar = $('<div class="toggleBar">').qq();
	toggleAllBar.csss('width: '+w+'px');
	toggleAllBar.csss('right: '+(-w-1)+'px');
	if (width) toggleAllBar.csss('height: 100%;');

	toggleAllBar.hover(
		function() { $(this).parent().parent().find('.toggleBar').addClass('hover'); },
		function() { $(this).parent().parent().find('.toggleBar').removeClass('hover'); }
	);

	where.prepend( toggleAllBar );
	toggleAllBar.click( toggleAll );
}

function toggleVisibilityKids(t, mode)
{
	t = $(t);
	var kids = t.parent().find('.node_content');
	for (var i=0; i < kids.length; i++)
		toggleVisibility( kids[i], mode );
}

function toggleAll()
{
	var t = $(this).parent();
	var mode = toggleVisibility( t );

	toggleVisibilityKids(t, mode);
	return false;
}

function toggleVisibility(t, mode)
{
	t = $(t);
	if (!t.hasClass('node_content'))
		t = t.find('.node_content:eq(0)');

	var title = t.find('.node_header_title');
	var node_body = t.find('.node_body');
	if (typeof mode == 'undefined')
		mode = !title.is(':visible');
	else
		mode = !!mode;	// booleanize 'undefined'

	if (mode)
		t.removeClass('compressed');
	else
		t.addClass('compressed');

	return mode;
}

function recursive_normalize_children(node, left, padding_amount, allAreTopics)
{
	node = $(node);
	node.padLeft(left);

	if (left)
		padding_amount -= 3;

	if (padding_amount < 15)
		padding_amount = 15;

	var ul = node;
	var parent;
	if (ul[0] && ul[0].tagName != "UL")
		ul = ul.find('> ul').eq(0);

	if (REVERSE)
		ul.append( ul.find("> li.lvl").get().reverse() );

	var arr = ul.find('> li.lvl');

	var last = arr.length-1;
	for (var i=last; i >= 0; i--)
	{
		var c = $(arr[i]);
		var isLast = (i==last);
		var hasChildren = c.find('> ul > li.lvl').length;
		var indent = false;

		var topic = !isLast || allAreTopics;
		if (topic)
		{
			indent = true;
			var cont = c.find('.node_content:eq(0)');

			cont.addClass('topicNode');
			if (i!=0)
				cont.addClass('notFirst');
		}

		/////////////////////////////////
		// weird facebook mode kypca
		if (FB_MODE)
		{
			if (c.parent().parent().find('.node_content:eq(0)').hasClass('topicNode'))
				indent = true;
		}
		/////////////////////////////////

		if (allAreTopics)
			indent = false;

		var pad = indent ? padding_amount : 0;
		recursive_normalize_children( c, pad, padding_amount );



		if (DBG_INFO)
		{
			var info = '';
			info += isLast?'l':'';
			info += parLast?'m':'';

			var lvl = c.attr('class').match(/level([0-9]+)/)[1];
			c.find('.node_header:eq(0)').prepend('<span style="float: left; padding-right: 5px;"> '+lvl+' '+info+' </span>')
		}
	}
}

}
g_features.push( new Facebookizer() );

