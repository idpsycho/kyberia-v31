
function DeleteButton()
{
	this.name = 'DeleteButton';
	this.onLoad = function()
	{
		$('[value=delete]').click(function() {
			if (!confirm('su veci na ktore mas pravo, are you sure?')) return false;

			var btn = $(this);
			var nodes = $('[name="node_chosen[]"]:checked');
			if (nodes.length)
			{
				var arrIds = [];
				nodes.each(function() {
					arrIds.push( $(this).val() );
				});
				var data = {new_parent:123456, 'event':'set_parent', 'node_chosen':arrIds};
				$.post(actionOf(btn), data, function() {
					nodes.each(function() {
						$(this).parents('.lvl').eq(0).slideUp();
					});
				});
			}
			else
			{
				$('[name=new_parent]').val(123456);
				$('[value=set_parent]').click();
			}
			return false;
		});
	}
	////////////////////////////////////////////////////////////

	function actionOf(btn) { return btn.parents('form').eq(0).attr('action'); }

}

g_features.push( new DeleteButton() );

