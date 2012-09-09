// Property file reader
var fs = require("fs");

function PropertyParser(f){
	var lines = (fs.readFileSync(f) + "").split('\n');
	var properties = {};
	lines.forEach(function(line){
		if(line.indexOf("#") == 0) return;
		line = line.split("=");
		properties[line[0]] = line[1];
	});
	return properties;
};

module.exports = PropertyParser;
