
function ChatBox()
{
	this.name = 'ChatBox';
	this.onLoad = function()
	{
		if (!isLoggedIn())
			return;

		MailReader.ifInMail_ParseMails();

		ChatUi.init();
		ChatUi.keepUpdating();
	}
	////////////////////////////////////////////////////////////

	function _soundPuk()
	{
		var a = $('audio.v31_hangout_puk')
		if (!a.length) {
			a = $('<audio class="v31_hangout_puk" src="http://p.brm.sk/puk.wav">');
			a.appendTo('body');
		}
		if (a[0]) a[0].play();
	}

	function isLoggedIn()
	{
		return $('input[type=submit][value=logout]').length > 0;
	}

	var ChatUi = new function()
	{
		var ChatUi = this;
		ChatUi.$chats = null;

		ChatUi.init = function()
		{
			MailReader.onNewMail = ChatUi.onNewMail;
			MailReader.onNewChecked = ChatUi.onNewChecked;
			MailReader.onMailLoad = ChatUi.onMailLoad;
			_createHtml();

			var users = ChatsOpen.map();
			for (var username in users)
			{
				if (users[username].windowUid != getWindowUid())
					continue;

				ChatUi.startChatWith( username );
			}

			_friendlistUpgrade();
		}

		function _friendlistUpgrade()
		{
			$.addStyle('\
				.v31_hangout_search { display: block; padding: 5px 8px; margin: 4px; width: 70%;\
									 font-size: 11px; height: 24px !important; border: none;\
									 margin-left: 30px; }\
				.v31_hangout_latest	{ background: #333; vertical-align: top; }\
				.v31_hangout_latest>div	{ padding: 1px; vertical-align: middle; line-height: 30px; }\
				.v31_hangout_latest>div:hover { background: #555; cursor: pointer; }\
				.v31_hangout_latest	img { width: 23px; height: 23px; margin-right: 10px; }\
				.v31_hangout_start	{ float: left; background: #6dae42; opacity: 0.2; color: black;\
									height: 23px; line-height: 23px; width: 23px; text-align: center;\
									margin-right: 4px; }\
				.v31_hangout_start:hover	{ opacity: 1; cursor: pointer; }\
			');
			var $search = $('<input type="text" placeholder="Chat with.." class="v31_hangout_search">');
			var $latest = $('<div class="v31_hangout_latest">');
			$search.insertBefore('.active_friend.u:eq(0)');
			$latest.insertAfter($search);
			$search.keydown(function(e) {
				if (e.which==13) {
					ChatUi.startChatWith( $search.val() );
					$search.val('');
				}
			});
			$search.blur(function() { setTimeout(function() { $latest.html('').hide(); }, 100); });
			$search.focus(function() {
				$latest.html('').show();
				var users = MailReader.getUsers();
				for (var i=0; i < users.length; i++)
				{
					var u = users[i];
					var e = $('<div><img><span>');
					e.find('img').attr('src', avatarSrc(u.id));
					e.find('span').text( u.name );
					e.addClass(u.online ? 'online' : '');
					e.appendTo($latest);
					e.data('user', u.name).click(function() {
						ChatUi.startChatWith($(this).data('user'));
					});
				}
			});

			$('.active_friend.u').each(function() {
				$('<div class="v31_hangout_start">').text('+').prependTo(this).click(function() {
					var username = $(this).parent().find('a:eq(0)').attr('title');
					ChatUi.startChatWith(username);
				});
			});
		}

		function _createHtml()
		{
			$.addStyle('\
				.v31_hangout	{ position: fixed; bottom: 0; right: 20px; }\
				.v31_hangout_receive	{ float: right; padding: 10px; background: red; border-radius: 5px;\
										 color: black; font-weight: bold; margin-bottom: -5px; }\
				.v31_hangout_receive:hover { opacity: 0.9; cursor: pointer; }\
			');
			ChatUi.$chats = $('<div class="v31_hangout">').appendTo('body');

			ChatUi.$openUnread = $('<div class="v31_hangout_receive">').text('open new mails');
			ChatUi.$openUnread.appendTo(ChatUi.$chats);
			ChatUi.$openUnread.click(function() {
				MailReader.getMails('reload');
				ChatUi.$openUnread.hide();
			});
		}
		ChatUi.startChatWith = function(u)
		{
			var ch = new ChatWindow;
			ch.init(u);
			return ch;
		}

		ChatUi.updateBtnOpenUnread = function()
		{
			var b = MailReader.numUnread() && !ChatUi.numOpen();
			if (b)
				ChatUi.$openUnread.show();
			else
				ChatUi.$openUnread.hide();
		}

		ChatUi.keepUpdating = function()
		{
			ChatUi.updateBtnOpenUnread();

			$('.v31_hangout_window>.reload').toggleClass('new', MailReader.numUnread()>0);

			for (var u in ChatWindow.map)
				if (!ChatsOpen.getStateOf(u))
					ChatWindow.map[u].close();

			setTimeout(function() {
				ChatUi.keepUpdating();
			}, 5*1000);
		}
		ChatUi.onNewMail = function(m)
		{
			var win = ChatWindow.map[m.username_from];
			if (!win)
				win = ChatUi.startChatWith(m.username_from);
			else
				win.refresh();
		}
		ChatUi.onMailLoad = function(mails)
		{
			$.each(ChatWindow.map, function(i, e) {
				e.onMailLoad(mails);
			});
		}
		ChatUi.numOpen = function() {
			return $('.v31_hangout_window').length;
		}
		ChatUi.onNewChecked = function(nUnread)
		{
			ChatUi.updateBtnOpenUnread();

			$.each(ChatWindow.map, function(i, e) {
				e.onNewChecked(nUnread);
			});
		}
	}

	var ChatWindow = function()
	{
		var t = this;
		var $win;
		t.username = '';	// target user
		t.userid = '';		// target user

		t.init = function(username)
		{
			t.username = username;
			_createHtml();
			ChatWindow.map[username] = t;

			_renderMails( MailReader.getMails() );
		}
		t.onMailLoad = function(mails) { _renderMails(mails); }
		t.onNewChecked = function(nUnread) {
			$win.find('.reload').toggleClass('new', nUnread>0);
		}
		t.refresh = function()
		{
			var mails = MailReader.getMails();//With(t.username);
			_renderMails(mails);
		}
		t.close = function()
		{
			ChatsOpen.remove(t.username);
			delete ChatWindow.map[t.username];
			$win.remove();
			//$win.fadeOut(function() { $win.remove(); });
		}
		t.toggle = function()
		{
			if ($win.height() > 150) {
				$win.animate({height: '150px'});
				ChatsOpen.set(t.username, 'mini');
			}
			else {
				$win.animate({height: '380px'});
				ChatsOpen.set(t.username, 'normal');
			}
		}
		t.send = function()
		{
			var ta = $win.find('textarea');
			ta.prop('disabled', true).addClass('sending').removeClass('error');
			MailReader.sendMail(t.username, ta.val(), function() {
				ta.prop('disabled', false).removeClass('sending');
				ta.val('');
			}, function() {
				ta.prop('disabled', false).removeClass('sending').addClass('error');
			});
			ta.val();
		}

		function _createHtml()
		{
			if (!ChatWindow._styleAdded)
			{
				ChatWindow._styleAdded = 1;
				$.addStyle('\
.v31_hangout_window				{ width: 260px; height: 380px; margin-right: 5px; display: inline-block;\
								 vertical-align: bottom; position: relative; box-shadow: 0 0 5px #000;\
								 background: #222; }\
.v31_hangout_window .head		{ height: 35px; line-height: 35px; cursor: pointer;\
								 background: #6dae42; color: #000; font-size: 13px; }\
.v31_hangout_window .resize		{ float: left; width: 34px; height: 34px; cursor: nw-resize; }\
.v31_hangout_window .close		{ float: right; padding: 0 13px; }\
.v31_hangout_window .close:hover{ background: rgba(255, 255, 255, 0.2); cursor: pointer; }\
.v31_hangout_window .messages	{ position: absolute; top: 35px; bottom: 65px; left: 0; right: 0;\
								overflow-y: scroll; padding: 8px; line-height: 18px;\
								word-break: break-word; }\
.v31_hangout_window >.reload	{ position: absolute; bottom: 35px; left: 0; right: 0; text-align: center;\
									background: black; color: #6dae42; cursor: pointer;\
									height: 30px; line-height: 30px; opacity: 0.5; }\
.v31_hangout_window >.reload.new { background: red; color: black; font-weight: bold; }\
.v31_hangout_window >.reload:hover	{ opacity: 1; }\
.v31_hangout_window >textarea	{ position: absolute; bottom: 0; left: 0; display: block;\
								border: 1px solid #6dae42; width: 100%; height: 35px; }\
.v31_hangout_window >textarea.sending { opacity: 0.7; }\
.v31_hangout_window >textarea.error	{ color: red; }\
\
.v31_message					{ padding: 3px; clear: both; overflow: hidden; }\
.v31_message>.icon				{ width: 34px; height: 34px; }\
.v31_message.me>.icon			{ float: right; }\
.v31_message.em>.icon			{ float: left; }\
.v31_message>.bubble			{ max-width: 70%; background: #000; color: #6dae42; padding: 5px 8px; }\
.v31_message.me>.bubble			{ float: right; }\
.v31_message.em>.bubble			{ float: left; }\
.v31_message .timestamp			{ opacity: 0.4; }\
.v31_message>.icon.seen			{ opacity: 0.3; width: 20px; height: 20px; }\
				');
			}

			var html = '\
			<div class="v31_hangout_window">\
				<div class="head">\
					<div class="resize"></div>\
					<div class="close"> X </div>\
					<div class="user">username</div>\
				</div>\
				<div class="messages"></div>\
				<div class="reload">reload</div>\
				<textarea></textarea>\
			</div>\
			';
			$win = $(html);
			$win.data('username', t.username)
			$win.find('.user').text(t.username);
			$win.find('.reload').click(function() { MailReader.getMails('reload'); });
			$win.find('.close').click(function() { t.close(); });
			$win.find('.head').click(function(e) { if ($(e.target).is('.user')) t.toggle(); });
			$win.find('textarea').keydown(function(e) {
				if (e.which==13 && !e.ctrlKey && !e.shiftKey) t.send(); });
			$win.appendTo( ChatUi.$chats );
			$win.find('textarea').focus();

			$win.find('.resize').mousedown(function(e) { $win.addClass('resizing'); return false; });
			$(document).mouseup(function(e) {
				if ($win.is('.resizing')) {
					$win.removeClass('resizing');
					return false; }
			});
			$(document).mousemove(function(e) { _resize(e); });


			var state = ChatsOpen.getStateOf(t.username);
			if (state == 'mini')
				$win.height(150);

			ChatsOpen.set(t.username, state?state:'normal');
		}

		function _resize(e)
		{
			if (!$win.is('.resizing')) return;

			var o = $win.offset();
			var w = $win.width() + (o.left-e.pageX)+17;
			var h = $win.height() + (o.top-e.pageY)+17;
			$win.width( Math.max(170, w) );
			$win.height( Math.max(170, h) );
		}

		function _renderMails(mails)
		{
			$win.find('.reload').removeClass('new');
			$win.find('.messages').html('');
			$win.addClass();
			for (var i=0; i < mails.length; i++)
			{
				var m = mails[i];
				if (m.username_from!=t.username && m.username_to!=t.username) continue;

				t.userid = m.isMe ? m.userid_to : m.userid_from;
				_renderMail( m );
			}
			_renderSeen();
		}
		function _renderMail(m)
		{
			var html = '\
			<div class="v31_message">\
				<img class="icon">\
				<div class="bubble">\
					<div class="content"></div>\
					<div class="timestamp"></div>\
				</div>\
			</div>\
			';
			var $msg = $(html).addClass(m.isMe?'me':'em');
			$msg.find('.icon').attr('src', avatarSrc(m.userid_from)).attr('title', m.username_from);
			$msg.find('.content').html(m.content);
			$msg.find('.timestamp').text(_niceTimestamp(m.timestamp));
			if (m.isUnread) $msg.addClass('unread');

			var $msgs = $('.messages', $win);
			var atBottom = _isAtBottom($msgs);
			$msg.appendTo($msgs);
			if (atBottom) $msgs.scrollTop(9999999);
		}
		function _niceTimestamp(t)
		{
			//t = '09:07:58 - 17.01.2014';
			var a = t.match(/([\d]+).([\d]+).([\d]+)...([\d]+).([\d]+).([\d]+)/);
			var h = parseInt(a[1])
			var m = a[2];
			return h+':'+m;
		}
		function _renderSeen()
		{
			var $seen = $('<div class="v31_message em"><img class="icon seen">');
			$seen.find('.icon').attr('src', avatarSrc(t.userid));

			var $msgs = $('.messages', $win);
			var atBottom = _isAtBottom($msgs);

			var unread = $msgs.find('.unread:eq(0)');
			if (!unread.length)
				$msgs.append($seen);
			else
				unread.before($seen);


			if (atBottom) $msgs.scrollTop(9999999);
		}

		function _isAtBottom(e)
		{
			var height = e.outerHeight();
			var scrollHeight = e[0].scrollHeight;
			var scrollTop = e.scrollTop();
			return (scrollTop+height > scrollHeight-10);
		}

	}
	ChatWindow.map = {};	// this is map with users..


	// cross-tab state inside localStorage
	var ChatsOpen = new function()
	{
		var ChatsOpen = this;

		ChatsOpen.remove = function(username)
		{
			var a = ChatsOpen.map();
			delete a[username];
			localStorage['v31_hangout_chats'] = JSON.stringify(a);
		}
		ChatsOpen.set = function(username, state)
		{
			var a = ChatsOpen.map();
			a[username] = {username:username, state:state, windowUid: getWindowUid()};
			localStorage['v31_hangout_chats'] = JSON.stringify(a);
		}
		ChatsOpen.getStateOf = function(username)
		{
			var a = ChatsOpen.map();
			a = a[username];
			if (a) return a.state;
		}
		ChatsOpen.map = function(username, state)
		{
			var a = localStorage['v31_hangout_chats'];
			if (a) return JSON.parse(a);
			return {};
		}
	}


	// loaduje maily do localStoragu, aby sa nacitali len raz pre vsetky taby..
	var MailReader = new function()
	{
		var MailReader = this;
		MailReader.mapUsers = {};
		MailReader.onNewMail = function(username) {};
		MailReader.onNewChecked = function(nUnread) {};
		MailReader.onMailLoad = function(mails) {};

		MailReader.getMailsWith = function(username)
		{
			var mails = MailReader.getMails();

			var out = [];
			for (var i=0; i < mails.length; i++)
			{
				var m = mails[i];
				if (m.username_from==username ||
					m.username_to==username)
					out.push(m)
			}
			return out;
		}
		MailReader.sendMail = function(username, content, fnSuccess, fnFail)
		{
			var data = {mail_to:username, mail_to_type:'name', mail_text:content, event:'send'};
			$.post('/id/24', data)
			.success(function(html) {
				_parseMails(html);
				if (fnSuccess) fnSuccess();
			})
			.fail(function() {
				if (fnFail) fnFail();
			});
		}
		MailReader.getUsers = function()
		{
			var users = localStorage['v31_hangout_users'];
			if (users) return JSON.parse( users )
			return [];
		}

		MailReader.getMails = function(bReload)
		{
			if (bReload)
				_loadMails();

			/*
			if (MailReader.isNewMail() || !localStorage['v31_hangout_mails'])
			{
				if (ago(localStorage['v31_hangout_lastLoadMail']) > 5)
				{
					localStorage['v31_hangout_lastLoadMail'] = time();
					_loadMails();
				}
			}
			*/

			var mails = localStorage['v31_hangout_mails'];
			if (mails) return JSON.parse( mails )
			return [];
		}
		MailReader.ifInMail_ParseMails = function()
		{
			if (window.location.pathname == '/id/24' ||
				window.location.pathname == '/id/24/')
				_parseMails( $('body') );
		}

		/////////////////////////////////////////
		function _loadMails()
		{
			$.get('/id/24', function(html) {
				MailReader.numUnreadNull();
				_parseMails(html);
			});
		}
		function _clearUsers()
		{
			MailReader.mapUsers = {};
			MailReader.arrUsers = [];
		}
		function _addUser(m)
		{
			if (!MailReader.mapUsers[m.userid_from])
			{
				MailReader.mapUsers[m.userid_from] = 1;
				MailReader.arrUsers.push( {id:m.userid_from, name:m.username_from, online:m.userlive_from} );
			}
			if (!MailReader.mapUsers[m.userid_to])
			{
				MailReader.mapUsers[m.userid_to] = 1;
				MailReader.arrUsers.push( {id:m.userid_to, name:m.username_to, online:m.userlive_to} );
			}
		}
		function _parseMails(html)
		{
			var mails = [];		// {userid_from, userid_to, timestamp, unread, new, content}

			_clearUsers();
			var $mails = $(html).find('#formular .message');//.get().reverse();
			$.each($mails, function(i, e) {
				var m = _extractMailFromElement(e);
				mails.push( m );

				_addUser(m);

				if (m.isNew)
					MailReader.onNewMail(m);
			});

			mails.reverse();
			localStorage['v31_hangout_mails'] = JSON.stringify( mails );
			localStorage['v31_hangout_users'] = JSON.stringify( MailReader.arrUsers );

			MailReader.onMailLoad( mails );
		}
		function _extractMailFromElement(e)
		{
			e=$(e);
			var $from		= e.find('a[href^=javascript]:eq(0)');
			var $to			= e.find('a[href^=javascript]:eq(1)');

			var m = {};
			m.userid_from	= parseInt( $from.attr('href').match(/[\d]+\'\)$/)[0] );
			m.userid_to		= parseInt( $to.attr('href').match(/[\d]+\'\)$/)[0] );
			m.username_from = $from.text();
			m.username_to	= $to.text();
			m.userlive_from	= !!$from[0].nextSibling.data.match('location');
			m.userlive_to	= !!$to[0].nextSibling.data.match('location');

			m.timestamp	= $.trim(e.find('.mail_checkbox')[0].nextSibling.nextSibling.nextSibling.data);
			m.important	= $.trim(e.find('.header .most_important').text()).toLowerCase();
			m.isUnread	= (m.important=='unread');
			m.isNew		= (m.important=='new');
			m.content	= e.find('.content').html();
			m.id		= parseInt( e.find('.mail_checkbox').attr('name').match(/[\d]+/)[0] );
			m.isMe		= m.userid_from == 1297258;
			return m;
		}

		MailReader.numUnreadNull = function()	// when loading mails, we reset this
		{
			localStorage['v31_hangout_numUnread'] = 0;
			localStorage['v31_hangout_lastCheckMail'] = time();
		}
		MailReader.numUnread = function()
		{
			if (ago(localStorage['v31_hangout_lastCheckMail']) > 10) {
				localStorage['v31_hangout_lastCheckMail'] = time();
				_checkNewMail();
			}

			return parseInt(localStorage['v31_hangout_numUnread']);
		}

		function _checkNewMail()
		{
			$.get('/ajax/check_new_mail.php', function(resp) {
				var nUnread = parseInt(resp);//(resp[0]!='0') ? resp.substr(2) : '';
				localStorage['v31_hangout_numUnread'] = nUnread;

				if (nUnread && resp != localStorage['v31_hangout_lastPukResp']) {
					_soundPuk();
					MailReader.onNewChecked(nUnread);
				}

				localStorage['v31_hangout_lastPukResp'] = resp;
			})
		}
	};
};




g_features.push( new ChatBox() );

