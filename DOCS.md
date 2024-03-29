hotkeys:
- ctrl + n => create new tab in active column
- ctrl + s => save active file
- ctrl + o => open file in active column
- ctrl + g => goto line number
- ctrl + f => find next
- ctrl + h => show project view file list (requires projects plugin)
- ctrl + r => run project commands (requires projects plugin)
- ctrl + space => send autocomplete request to server (requires ternjs/ccls plugins)
	
commandline flags:
- filename1 filename2, opens files in editor
- -d -debug, enables debugging tools like chrome devtools
- -v -version, print version
- -x -y (integer), set window position on start
- -w -width -h -height (integer), sets window dimensions
- -e -electron (filename|localhost/url/path|127.0.0.1/url/path) (-d -debug, -w -width -h -height), reuse binary as 
instance of electron for development, urls must start with http:// etc, otherwise they will be opened in the 
browser. This is a bug but it's sort of useful so maybe it's actually a feature. -d/-debug will open devtools, -w/-h will set dimensions

extra:
- run command `eletron -e filename` to use instance of electron
- using {$HOME} in ccls plugin config bin path will be replaced with path to home, eg '{$HOME}/ccls' will become '/home/username/ccls'
- run command will resolve ~ to homedir only when used with cd

nuances:
- On windows, for some unknown reason commandline argument order is important while using the -electron flag. -e/-electron must be last argument or the application will exit with 4294967295. eg, ```electron -debug -w 1200 -h 900 -e http://localhost:8080```. On linux, order is not an issue.