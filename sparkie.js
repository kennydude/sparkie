#!/usr/bin/env node
var	fs = require("fs"),
	commander = require("commander");
require('js-yaml');

try{ // trys to make nice colorful terminals!
	var ansi = require('ansi'), cursor = ansi(process.stdout);
	function cout(color){
		return function(normalmsg){
			cursor[color]().bold();
			process.stdout.write(normalmsg + " ");
			cursor.reset(); cursor[color]();
			for( var i = 1; i < arguments.length; i++ ) { process.stdout.write(arguments[i]+""); }
			cursor.reset();
			process.stdout.write("\n");
		}
	}

	console.log = cout('green');
	console.error = cout('red');
	console.warn = cout('yellow');
} catch(e){
	console.log("for nicer colors install ansi");
}

process.title = "sparkie";

console.log("Sparkie build system");

var program = require('commander');
program.version("0.1")
	.usage("[options] [outcome]");

program.parse(process.argv);

var outcome = program.args[0] || "debug";
if(!fs.existsSync(process.cwd() + "/sparkFile.yaml")){
	console.error("No sparkFile.yaml ;_;");
	process.exit(-1);
}
var sparkFile = require(process.cwd() + "/sparkFile.yaml");

var defaults = {};
if(fs.existsSync(process.cwd() + "/localSpark.yaml")){
	defaults = require(process.cwd() + "/localSpark.yaml");
}

console.log("Outcome:", outcome);
var outcome = sparkFile[outcome];

var spark = new (require("./lib/spark.js"))();

var targetClass = require("./lib/targets/" + outcome['Type']);
var baseTarget = new targetClass();
baseTarget.setup("default", process.cwd());

spark.targets.push(baseTarget);

// TODO: Filters

spark.targets.forEach(function(target){
	console.log("> Executing target:", target.label);
	target.run(defaults);
});

