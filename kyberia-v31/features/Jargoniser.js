

function Jargoniser()
{
	this.name = 'Jargoniser';
	this.onLoad = function()
	{
		var map = {
			'krasne':		'krástne',
			'krasny':		'krástny',
			'krasna':		'krástna',
			'krasni':		'krástni',
			'klavesnica':	'klávestnica',
			'klavesnici':	'klávestnici',

			'eur':			'euri',
			'euro':			'euri',
			'eura':			'euri',

			'nejake':		'niaké',
			'nejaky':		'niaký',
			'nejaki':		'niakí',
			'nejaka':		'niaká',

			'bratislava':	'blava',
			'bratislave':	'blave',
			'bratislavy':	'blavy',

			'hanba':		'hamba',
			'hanbi':		'hambi',
			'hanbu':		'hambu',

			'vianoce':		'vjanky',
			'bolo treba':	'trebalo',
			'puzzle':		'pucle',
			'dakujem':		'ďakovala',
			'ahoj':			'ahojky',
			'cau':			'cauky',
			'palacinka':	'palačinka',
			'nie je':		'neni',
			'neviem':		'nevím',
			'nie':			'ne',

			'spolubyvajuca':'spolubydla',
			'spolubyvajuci':'spolubydla',

			'chladnicka':	'ladnička',
			'chladnicke':	'ladničke',
			'chladnicky':	'ladničky',

			'kybca':		'kypča',
			'kybcan':		'kypčan',

			'nechapem to':	'nechapem tomu',
			'nechape to':	'nechape tomu',
			'nechapes to':	'nechapes tomu',
			'to nechapem':	'tomu nechapem',
			'to nechape':	'tomu nechape',
			'to nechapes':	'tomu nechapes',

			'napadlo mi':	'napadlo ma',
			'napadlo mu':	'napadlo ho',
			'napadlo nam':	'napadlo nás',
			'mi napadlo':	'ma napadlo',
			'mu napadlo':	'ho napadlo',
			'nam napadlo':	'nás napadlo',
			'nenapadlo mi':	'nenapadlo ma',
			'nenapadlo mu':	'nenapadlo ho',
			'nenapadlo nam':'nenapadlo nás',
			'mi nenapadlo':	'ma nenapadlo',
			'mu nenapadlo':	'ho nenapadlo',
			'nam nenapadlo':'nás nenapadlo',

			'alebo':		'aneb',
		};

		alphabetConversionAllHtml(map, 'remove diacritics', false, 'words only');
	}
}

g_features.push( new Jargoniser() );

