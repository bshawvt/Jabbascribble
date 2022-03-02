/* element is codemirror container, extension can be filename.txt, .txt, or txt*/
function CodeMirrorFactory(element, extension, data) {
	var data = data || "";
	var editTheme = "";
	var editLines = true;
	var mode = GetModeFromExtension(extension);

	//var indentUnit = Config.editor.IndentWithTabs ? Config.editor.TabSize : Config.editor.SpaceSize ;
	// modes need to be loaded in asychronously
	var cm = new CodeMirror(element, {
		mode: mode,
		theme: editTheme,
		lineNumbers: Config.editor.LineNumbers,
		tabSize: Config.editor.TabSize,
		indentUnit: Config.editor.IndentUnit,
		indentWithTabs: Config.editor.IndentWithTabs,
		continuousScanning: true,
		extraKeys: {
			"Shift-Tab": "indentLess",
			"Tab": "indentMore",
			// unmap codemirror stuff that i don't like because i'm a weirdo who doesn't adapt
			"Alt-Backspace": function(cm) { return; },
			"Ctrl-[": function(cm) { return; },
			"Ctrl-]": function(cm) { return; },
			"Ctrl-K": function(cm) { return; },
			"Ctrl-E": function(cm) { return; },
			"Ctrl-U": function(cm) { return; },
			"Ctrl-D": function(cm) { return; },
			"Ctrl-N": function(cm) { return; },
			"Ctrl-S": function(cm) { return; },
			"Ctrl-O": function(cm) { return; },
			"Alt-[": function(cm) { return; },
			"Alt-]": function(cm) { return; },
			"Alt-K": function(cm) { return; },
			"Alt-E": function(cm) { return; },
			"Alt-U": function(cm) { return; },
			"Alt-D": function(cm) { return; },
			"Alt-N": function(cm) { return; },
			"Alt-S": function(cm) { return; },
			"Alt-O": function(cm) { return; },
			//"Ctrl-": function(cm) { return; },
			//"Alt-": function(cm) { return; },

		}
	});
	cm.parentRef = element;
	cm.setValue(data);
	return cm;
}

function CallbackAutocomplete(a, b, c) {
	console.log(a, b, c, window);
}

function GetModeFromExtension(extension) {
	var ext = [];
	var name = null;
	var json = false;

	ext = extension.split(".").pop();//ext.join("");
	if (ext==="html") {
		return {name: "xml"}
	}
	else if (ext==="js") {
		return {name: "javascript"}
	}
	else if (ext==="css") {
		return {name: "css"}
	}
	else if (ext==="json") {
		return {name: "javascript",
				json: true}
	}
	else if (ext==="java") {
		return {name: "java"}
	}
	else if (ext==="c" || ext==="cpp" || ext==="h" || ext==="hpp" || ext==="cs") {
		return { name: "text/x-c++src"};
	}
	/*else if (ext==="") {
		name = "";
	}*/
	return { name: null };
}