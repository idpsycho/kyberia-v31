
function Hiraganiser()
{
	this.name = 'Hiraganiser';
	this.onLoad = function()
	{
		/*
			ch	č
			sh	š
			ky	kj
			ny	nj
			my	mj
			ry	rj
			gy	gj
			by	bj
			py	pj
			ts	c
		*/
		var map = {
			'shi':	'し',	'sha':	'しゃ',	'shu':	'しゅ',	'sho':	'しょ',
			'chi':	'ち',	'cha':	'ちゃ',	'chu':	'ちゅ',	'cho':	'ちょ',
							'kya':	'きゃ',	'kyu':	'きゅ',	'kyo':	'きょ',
							'nya':	'にゃ',	'nyu':	'にゅ',	'nyo':	'にょ',
							'hya':	'ひゃ',	'hyu':	'ひゅ',	'hyo':	'ひょ',
							'mya':	'みゃ',	'myu':	'みゅ',	'myo':	'みょ',
							'rya':	'りゃ',	'ryu':	'りゅ',	'ryo':	'りょ',
							'gya':	'ぎゃ',	'gyu':	'ぎゅ',	'gyo':	'ぎょ',
							'bya':	'びゃ',	'byu':	'びゅ',	'byo':	'びょ',
							'pya':	'ぴゃ',	'pyu':	'ぴゅ',	'pyo':	'ぴょ',
											'tsu':	'つ',

			'ka':	'か',	'ki':	'き',	'ku':	'く',		'ke':	'け',	'ko':	'こ',
			'na':	'な',	'ni':	'に',	'nu':	'ぬ',	'ne':	'ね',	'no':	'の',
			'ma':	'ま',	'mi':	'み',	'mu':	'む',	'me':	'め',	'mo':	'も',
			'ra':	'ら',	'ri':	'り',	'ru':	'る',	're':	'れ',	'ro':	'ろ',
			'ga':	'が',	'gi':	'ぎ',	'gu':	'ぐ',	'ge':	'げ',	'go':	'ご',
			'ba':	'ば',	'bi':	'び',	'bu':	'ぶ',	'be':	'べ',	'bo':	'ぼ',
			'pa':	'ぱ',	'pi':	'ぴ',	'pu':	'ぷ',	'pe':	'ぺ',	'po':	'ぽ',
			'sa':	'さ',					'su':	'す',	'se':	'せ',	'so':	'そ',
			'wa':	'わ',	'wi':	'ゐ',					'we':	'ゑ',	'wo':	'を',
			'ha':	'は',	'hi':	'ひ',					'he':	'へ',	'ho':	'ほ',
			'za':	'ざ',					'zu':	'ず',	'ze':	'ぜ',	'zo':	'ぞ',
			'ja':	'じゃ',	'ji':	'じ',	'ju':	'じゅ',					'jo':	'じょ',
			'ta':	'た',									'te':	'て',	'to':	'と',
			'ya':	'や',									'yu':	'ゆ',	'yo':	'よ',
			'da':	'だ',									'de':	'で',	'do':	'ど',
											'fu':	'ふ',

			'a':	'あ',	'i':	'い',	'u':	'う',	'e':	'え',	'o':	'お',

			// FAKES
			// tsu
			'c':	'つ',
			// fu
			'f':	'ふ',
			// *o
			'k':	'こ',
			'n':	'の',
			'm':	'も',
			'r':	'ろ',
			'l':	'ろ',
			'g':	'ご',
			'b':	'ぼ',
			'p':	'ぽ',
			's':	'そ',
			'w':	'を',
			'v':	'を',
			'h':	'ほ',
			'z':	'ぞ',
			'j':	'よ',	// yo
			't':	'と',
			'y':	'よ',
			'd':	'ど',
		};

		function copyAllKeysByValue(mapFrom, mapTo, val) {
			for (var k in mapFrom)
				if (mapFrom.hasOwnProperty(k) && mapFrom[k]===val)
					mapTo[k] = val;
		}
		var chars = getFeatureValue('Hiraganiser');
		chars = $.trim(chars);
		chars = chars.split(' ');
		if (chars.length)	// only those characters will be used..
		{
			var mapSubset = {};
			for (var i=0; i < chars.length; i++)
				copyAllKeysByValue(map, mapSubset, chars[i]);

			map = mapSubset;
		}

		alphabetConversionAllHtml(map, 'remove diacritics and y');
	}
}

g_features.push( new Hiraganiser() );

