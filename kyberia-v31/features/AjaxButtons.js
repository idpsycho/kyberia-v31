
function AjaxButtons()
{
	this.name = 'AjaxButtons';
	this.onLoad = function()
	{
		var style = "button:hover, input[type=submit]:hover { cursor: pointer; opacity: 0.5; }";
		$('<style>').text(style).appendTo('body');

		addKtoEveryNode();

		ajaxifyButtons();
	}
	////////////////////////////////////////////////////////////

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
		//var btns = fooks().add(Ks()).add(books()).add(unbooks());
		//btns.css('cursor', 'pointer');
		//btns.mouseenter(function() { $(this).stop().animate({opacity:0.5}, 100); })
		//btns.mouseleave(function() { $(this).stop().animate({opacity:1}, 100); })

		Ks().on('click', function() {
			var btn = $(this);
			$.post(actionOf(btn), {'event':'K'}, function() {
				btn.attr('disabled', 'disabled').hide();
				btn.css({color: 'red', 'font-weight':'bold', border:'none'}).fadeIn();
			});
			return false;
		});

		fooks().add(unfooks()).on('click', function() {
			var btn = $(this);
			var val = btn.val();
			var newVal = val=='fook'?'unfook':'fook';
			$.post(actionOf(btn), {'event':val}, function() {
				btn.val( newVal );
				var fooked = btn.parents('table.bordered').eq(0);
				if (fooked && val=='fook')
					$('<div>').insertAfter(fooked).append(fooked).slideUp(500);
			});
			return false;
		});

		books().add(unbooks()).on('click', function() {
			var btn = $(this);
			var val = btn.val();
			var newVal = val=='book'?'unbook':'book';
			$.post(actionOf(btn), {'event':val}, function() {
				btn.val( newVal );
			});
			return false;
		});

		skips().each(function() {
			var t = $(this);
			t.prepend( $('<div>skip</div>') );
			t.siblings('a:contains(skip)').hide();

			var p = t.parent('td');
			p.add(t).css({'cursor':'s-resize'});
			p.click(function() { t.trigger('click'); });
		});

		skips().click(function() {
			scrollToHref( $(this).attr('href'), -10 );
			return false;
		});
	}


	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }
	function scrollToHref(href, off)
	{
		if (!href) return;
		if (href[0] == '#') href = href.substr(1);

		if (!off) off = 0;
		var pos = $('[name="'+href+'"]').offset().top + off;
		$('html, body').stop().animate({scrollTop: pos}, 500);
	}

	function fooks() { return $('input[type=submit][value=fook]'); }
	function unfooks() { return $('input[type=submit][value=unfook]'); }
	function books() { return $('input[type=submit][value=book]'); }
	function unbooks() { return $('input[type=submit][value=unbook]'); }
	function Ks() { return $('input[type=submit][value=K]'); }
	function skips() { return $('a[title=skip]'); }

}

g_features.push( new AjaxButtons() );

