
function DeleteButton()
{
	this.name = 'DeleteButton';
	this.onLoad = function()
	{
		$('[value=delete]').click(function() {
			if (!confirm('su veci na ktore mas pravo, are you sure?')) return false;

			var btn = $(this);
			var nodes = $('[name="node_chosen[]"]:checked');
			var arrIds = [];

			if (nodes.length)
			{
				nodes.each(function() {
					arrIds.push( $(this).val() );
				});
			}
			else
			{
				var id = idFromHref(window.location.href);
				if (!id) return;
				arrIds.push( id );
			}


			var data = {new_parent:123456, 'event':'set_parent', 'node_chosen':arrIds};
			$.post(actionOf(btn), data, function()
			{
				if (nodes.length) {
					nodes.each(function() {
						$(this).prop('checked', false).parents('.lvl').eq(0).slideUp();
					});
				}
				else {
					window.location = window.location;
				}
			});

			return false;
		});
	}
	////////////////////////////////////////////////////////////

	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }

}

g_features.push( new DeleteButton() );

