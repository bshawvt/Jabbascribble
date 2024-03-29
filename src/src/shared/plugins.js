var fs = require("fs");
var path = require("path");

var {Config} = require("../../src/shared/config.js");
var {Plugin} = require("../../src/shared/plugin.js");
/* manages "plugins" */
function Plugins(appClass, window) {
	var self = this;
	this.activePlugins = [];
	this.pluginNames = [];
	for(var i = 0; i < Config.plugins.length; i++) {
		try {
			((_i, _window) => {
				//console.log(Config.plugins[_i].main);
				var conf = Config.plugins[_i];
				var main = path.normalize(path.join(__dirname, `../../plugins/${conf.main}`));
				var renderer = path.normalize(path.join(__dirname, `../../plugins/${conf.renderer}`));
				_window.webContents.send("main-pluginload", {script: renderer, index: _i});
				fs.access(main, fs.constants.F_OK, function(err) {
					if (err) return console.log(`- Plugins.js error could not find plugin:\n\t${main} ${err}`);	
					var MyPlugin = require(main);
					//console.log(main, MyPlugin);
					var plugin = new MyPlugin(appClass, conf, _window).start();
					self.activePlugins[plugin.pluginName] = plugin;
					self.pluginNames.push(plugin.pluginName);
					//console.log("added new active plugin", plugin.pluginName, self.activePlugins[plugin.pluginName]);
				});
			})(i, window);
		}
		catch (e) {
			console.log(`- Plugins.js has failed to load a plugin -\n\t\n${e}`);
		}
	}
};
Plugins.prototype.on = function(eventName, fnCallback) {
	var listenerType = this.listeners[eventName];
	if (listenerType) {
		this.listeners[eventName].push(fnCallback);
	};
};
/* all plugins must inherit from plugin.js and overload methods accordingly otherwise they return null 
	event { 
		name: "plugin_name",
		event: "event_name",
		request: { // user data
			event: "",
			...
		}
	}*/
Plugins.prototype.pushPluginEvent = function(event) {
	var reply = null; // todo?
	if (event.pluginName == undefined || event.pluginName == null || event.pluginName.length == 0)
		for(item in this.activePlugins) {//var i = 0; i < this.activePlugins.length; i++) {
			reply = this.doTask(item, event);
		}
	else {
		var item = this.activePlugins[event.pluginName];
		reply = this.doTask(item, event);
	}
};

Plugins.prototype.doTask = function(item, event) {
	eventName = event.event.toLowerCase();
	var reply = null;
	if (eventName == "render") {
		//reply = item.onRendererEvent(event);
		return item.onRendererEvent(event);
	}
	if (eventName == "main") {
		//reply = item.onMainEvent(event);
		return item.onMainEvent(event);
	}
	if (eventName == "save") {
		//reply = item.onSaveEvent(event);
		return item.onSaveEvent(event);
	}
	if (eventName == "open") {
		//reply = item.onOpenEvent(event);
		return item.onOpenEvent(event);
	}
	if (eventName == "start") {
		//reply = item.onStartEvent(event);
		return item.onStartEvent(event);
	}
	if (eventName == "stop") {
		//reply = item.onStopEvent(event);
		return item.onStopEvent(event);
	}
	return console.warn('unhandled event: %s\n', eventName, event);
};

Plugins.prototype.destroy = function() {
	for(var i = 0; i < this.pluginNames.length; i++) {
		var name = this.pluginNames[i];
		console.log("destroying: ", name);
		this.activePlugins[name].destroy();
	};
	this.pluginNames = [];
	this.activePlugins = [];
};

if (typeof module!=="undefined")
	module.exports = { Plugins }