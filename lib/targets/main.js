// DO NOT USE THIS

exports = module.exports = Target;

function Target(){};

Target.prototype.setup = function(label, wd){
	this.label = label;
	this.working_dir = wd;
}

Target.prototype.run = function(){
	console.error("No subclass of Target! Target is abstract");
}

Target.prototype.throwError = function(msg, e){
	console.error("E: " + msg, e);
	console.error("Fatal Error");
	process.exit(-2);
};

var exec = require('child_process').exec;
Target.prototype.cmd = function(shortcmd, cmd, cback){
	var self = this;
	console.log(shortcmd, cmd);
	exec(cmd, { stdio: 'inherit' },  function (error, stdout, stderr) {
		if(error != null){
			self.throwError(shortcmd + " failed: ", error);
		} else{ cback(); }
	});
};

var fs = require("fs");
Target.prototype.mkdir = function(dir){
	if(!fs.existsSync(this.working_dir + "/" + dir)){
		fs.mkdirSync(this.working_dir + "/" + dir);
	}
};

var glob = require("glob");
Target.prototype.glob = function(r, cb){ glob(r, cb); };

Target.prototype.addPrefix = function(array, prefix){
	var r = [];
	array.forEach(function(e) { r.push(prefix + e); });
	return r;
};
