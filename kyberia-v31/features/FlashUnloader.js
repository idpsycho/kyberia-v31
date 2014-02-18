jQuery.fn.outerHTML = function(s) {
    return s
        ? this.before(s).remove()
        : jQuery("<p>").append(this.eq(0).clone()).html();
};

function FlashUnloader()
{
	this.name = 'FlashUnloader';
	this.onLoad = function() {
		$('.youtube-player').each(function() {
			var t = $(this);
			var w = t.width();
			var h = t.height();
			var id = t.attr('src').match(/\/embed\/([a-z0-9\-_]+)/i);
			if (id) id = id[1];
			if (!id) return;
			var url = 'http://img.youtube.com/vi/'+id+'/0.jpg';

			var div = $('<div>').css({ position: 'relative' });
			var img = $('<img>').attr('src', url).appendTo(div);
			var title = $('<div>').text('load youtube').appendTo(div);
			title.css({ position: 'absolute', padding: '10px 20px', top: '5px', left: '5px',
							background: 'rgba(123, 123, 123, 0.3)', color: 'white', cursor: 'pointer' });
			img.css({ cursor: 'pointer', width: w+'px', height: h+'px', 'max-width': '100%' });

			var html = t.outerHTML();
			t.after(div).remove();
			img.add(title).click(function() {
				div.after( $(html) ).remove();
			});
		});
	}
	////////////////////////////////////////////////////////////

}

g_features.push( new FlashUnloader() );

