

function Cyrilliser()
{
	this.name = 'Cyrilliser';
	this.onLoad = function()
	{
		var cyrillic = '';
		var latin	= '';

		cyrillic	+= '	ю	я	ю	я	х	г';
		latin		+= '	ju	ja	iu	ia	ch	h';

		cyrillic	+= '	а	б	в	г	д	е	ё	ж	з	и	й	к	л	м	н	о	п';
		latin		+= '	a	b	v	g	d	e	ë	ž	z	i	j	k	l	m	n	o	p';

		cyrillic	+= '	р	с	т	у	ф	х	ц	ч	ш	щ	ъ	ы	ь	э';
		latin		+= '	r	s	t	u	f	x	c	č	š	šč	´	y	´	è'

		cyrillic	+= '	и	д	л	л	нь	р	рь	ть	у	у	у	у	ы';
		latin		+= '	í	ď	ĺ	ľ	ň	ŕ	ř	ť	ú	ü	ű	ů	ý'

		cyrillic	= $.trim(cyrillic).split('\t');
		latin		= $.trim(latin).split('\t');

		var map = {};
		for (var i=0; i < latin.length; i++)
			map[ latin[i] ] = cyrillic[i];

		alphabetConversionAllHtml(map);
	}
}

g_features.push( new Cyrilliser() );

