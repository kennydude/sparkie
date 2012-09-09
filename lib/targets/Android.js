// Android Target
// I build Android APKs for you

var	Target = require("./main"),
	fs = require("fs"),
	PropertyParser = require("../property.js");
exports = module.exports = AndroidTarget;

function AndroidTarget(){};

AndroidTarget.prototype.__proto__ = Target.prototype;

AndroidTarget.prototype.run = function(defaults){
	if(!defaults['android_path']){ this.throwError("No android_path in local properties"); }
	console.log("Android path", "'" + defaults['android_path'] + "'");
	
	var props = PropertyParser(this.working_dir + "/project.properties");
	var bootclasspath = props["target"].split(":");
	var bootclasspath = defaults['android_path'] + "/platforms/android-" + bootclasspath[bootclasspath.length-1] + "/android.jar";
	
	this.mkdir("out/classes/");
	var self = this;

	// TODO: Generate resources
	console.warn("The Android target does not yet work properly");

	this.glob("src/**/*.java", function(err, files){
		self.glob("gen/**/*.java", function(err, gen_files){
			files = (files.join(";") + ";" + gen_files.join(";")).split(";");
			classpath = self.addPrefix(fs.readdirSync(self.working_dir + "/libs"), "libs/").join(":");
			self.cmd("javac", "javac -source 1.6 -d out/classes/ -classpath "+classpath+" libs -bootclasspath " + bootclasspath + " " + files.join(" "));
		});	
	});

	// TODO: Dex

	// TODO: APK

	// TODO: Sign
};
