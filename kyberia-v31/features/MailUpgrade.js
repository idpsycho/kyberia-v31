
function MailUpgrade()
{
	this.name = 'MailUpgrade';
	this.onLoad = function() {
		MailUpgrade_OLD_BORDEL();
	}
	////////////////////////////////////////////////////////////

}

function MailUpgrade_OLD_BORDEL()
{

	var in_mail_24 = window.location.pathname.match(/^\/id\/24\/?$/);

	if (in_mail_24) ready();

///////////////////////////////////////////////////////////////////////////////////////////
function ready()
{
	Array.prototype.swap = function(a, b)
	{
		var tmp = this[a];
		this[a] = this[b];
		this[b] = tmp;
	}

	Array.prototype.addUnique = function(e, fn)
	{
		for (var i=0; i < this.length; i++)
		{
			if (this[i] == e)
				return;
		}
		this.push(e);
		if (fn) fn(e);
	}
	Array.prototype.bringToFront = function(e)
	{
		var pos = this.indexOf(e);
		this.splice(pos, 1);
		this.splice(0, 0, e);
	}

	$.fn.firstN = function(n)
	{
		return this.slice(0, n);
	}

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

	var voSvojomProfile = (window.location.pathname == '/id/'+My_ID());

	// check only visible, and prevent default checking functionality
	$('input[value*="check_all"]').removeAttr('onclick')
	$('input[value*="check_all"]').click( function(e)
	{
		var check = ($(this).val() == 'check_all');

		var visible_checkboxes = $('.message:visible .mail_checkbox');
		visible_checkboxes.prop('checked', check);		// nechapem celkom preco to tu je prevratene

		$(this).val( check ? 'uncheck_all' : 'check_all' );

		e.preventDefault();
	});

	// prevent any accidents of deleting hidden messages
	$('input[value="delete_mail"]').click( function(e)
	{
		var hidden_checks = $('.message:hidden .mail_checkbox:checked');
		if (hidden_checks.length)
		{
			if( !confirm("Some of the hidden messages are selected. Are you sure you want them removed too?\n(press 'cancel' to reveal all checked mails)"))
			{
				hidden_checks.parents('.message').show();
				e.preventDefault();
			}
		}
	});

	var arr=[];
	var online=[];
	var nicks=[];

	$('.message').each( function()
	{
		var msg = $(this);
		var n = getNicks( msg );

		// save nicknames for chngto(..)
		nicks['_'+n[0]] = n[2];
		nicks['_'+n[1]] = n[3];

		function checkOnline_() { checkOnline(msg, online); }

		arr.addUnique( n[0], checkOnline_ );
		arr.addUnique( n[1], checkOnline_ );

		msg.addClass( 'mailing_'+n[0] );
		msg.addClass( 'mailing_'+n[1] );

	});


	var icons = $('<div id="mailing_icons">').csss('clear: both; overflow: hidden; margin: 0 0 10px 60px;');
	$('#mail_form').after( icons );

	// online users go first
	$.each(online.reverse(), function()
	{
		var id = this+'';
		arr.bringToFront(id);
	});

	// user's own id goes totally first
	arr.bringToFront( My_ID() );
	online.push( My_ID() );	// show as online

	$.each(arr, function()
	{
		var id = this + '';
		var img = getImg( id );
		icons.append(img);

		img.click( function()
		{
			chngto_(nicks['_'+id], id);

			$('.message').hide();
			$('.message.mailing_'+id).show();
		});

		img.hover(
			function() { $(this).csss('margin-top: 2px; margin-bottom: -2px'); },
			function() { $(this).csss('margin-top: 0; margin-bottom: 0;'); }
		);

		if ($.inArray(id, online) >= 0)
			img.csss('border-top: 6px solid #6dae42;');
		else
			img.csss('border-top: 6px solid #a00;');
	});

}
//////////////////////////////////////////////////////////////////////////////



function checkOnline(msg, online)
{
	var a = msg.find('a').firstN(4);

	var loc = a.filter('a[title]');
	if (!loc || !loc.length)
		return;

	for (var i=0; i < loc.length; i++)
	{
		var L = $(loc[i]);
		var id = extractHrefId( L.prev('a') );
		online.addUnique(id);
	}
}



function getImg(id)
{
	var src = '/images/nodes/' + id.substr(0, 1) + '/' + id.substr(1, 1)+'/' + id + '.gif';
	var i = $('<img width="50" src="'+src+'" class="mail_avatar" style="float:left; margin-left:5px;">');
	i.css('cursor', 'pointer');
	return i;
}

function extractHrefId(anchor)
{
	return anchor.attr('href').match(/([0-9]+)\'\)$/)[1];
}
function getNicks(msg)
{
	var a = msg.find('.header a:not([title])');
	var id1 = extractHrefId( a.eq(0) );
	var id2 = extractHrefId( a.eq(1) );
	var $nick1 = a.eq(0);
	var $nick2 = a.eq(1);
	var nick1 = $nick1.text();
	var nick2 = $nick2.text();
	$nick1 = $nick1.find('sup.v31_original_name');
	$nick2 = $nick2.find('sup.v31_original_name');

	if ($nick1.length) nick1 = $nick1.text();
	if ($nick2.length) nick2 = $nick2.text();

	return [id1, id2, nick1, nick2];
}


//////////////////////////////////////////////////////////////////////////////////////////
// from kybca, but using jquery coz it didnt work for some reason..
function chngto_(name,id) {

    $('#formular input[name="mail_to"]').val( name );
	var src = '/images/nodes/' + id.substr(0, 1) + '/' + id.substr(1, 1)+'/' + id + '.gif';
    $('.icoImg[name="fricon"]').attr(src);
}
//////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function My_ID()
{
	// vytiahnut z headera, v ktorom by mala byt pouzita templata 'configure'
	var href = $('a[href$="1961033"]').not('[href^="/id/19"]').eq(0).attr('href');
	var id = href.match(/\/([0-9]+)\/[0-9]+$/)[1];
	return id;
}

function ASSERT(b, err)
{
	if (!b) alert(err?err:'');
}






}
g_features.push( new MailUpgrade() );

