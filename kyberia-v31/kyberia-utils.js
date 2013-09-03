
var g_features = [];	// all extensions are instantiated into this list

var g_defaultFeatures = {
	'TagUsers': 1,
	'HideMoods': 1,
	'AjaxButtons': 1,
	'MailUpgrade': 1,
	'DeleteButton': 1,
	'LimitNodeHeight': 1,
	'InplaceEditing': 1,
	'QuickReply': 1,
};

var g_defaultFeatureValues = {
	'TagUsers': '773:memfer',
};

RegExp.escape= function(s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
};

function isfeatureAvailable(name)
{
	for (var i=0; i < g_features.length; i++)
		if (g_features[i].name == name)
			return true;
	return false;
}

function setFeatureEnabled(name, b)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	localStorage[lsKey] = b ? 'yes' : 'no';
}
function isFeatureEnabled(name)
{
	if (!name) return;
	if (name == 'ExtensionOptions') return true;

	var lsKey = '_kyberia_v31_feature_enabled_'+name;
	var enabled = localStorage[lsKey];
	if (typeof enabled == 'undefined')
		enabled = g_defaultFeatures[name] ? 'yes' : 'no';

	if (enabled=='yes') return true;
	if (enabled=='no') return false;
	return false
}

function setFeatureValue(name, val)
{
	if (!name) return;
	var lsKey = '_kyberia_v31_feature_value_'+name;
	localStorage[lsKey] = val;
}
function getFeatureValue(name)
{
	if (!name) return;

	var lsKey = '_kyberia_v31_feature_value_'+name;
	var val = localStorage[lsKey];
	if (typeof val == 'undefined')
		val = g_defaultFeatureValues[name];

	return val;
}



function time()	// miliseconds
{
	return new Date().getTime();
}
function ago(t)
{
	return time() - t;
}
