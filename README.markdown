# Sparkie is yet another build system

Yes, another. Why?

Well, because I wanted to

## Design

It works in "targets" like Make does, but they work differently. You define a target of a type (e.g Android) which you can push through filters which can duplicate/modify targets.

You start with an outcome, of the target type you want. Then filters will multiply the targets, of which will finally get executed

## How do I get started

Right now, you need to do some cloning and stuff before it's in npmjs.org which I will put it there sometime in the future.

Currently, you need to get "sparkie.js" into your PATH and to run `npm install` from the sparkie folder

## sparkFile.yaml

This is the magical place where everything happens. It's YAML. Here's a sparkFile:

	%YAML 1.2
	---
	debug:
	 Type: AndroidDebug
	release:
	 Type: Android
	 Filters:
	  - dpi

As you can see, we have defined 2 outcomes, `debug` and `release`. `debug` is automatically chosen when you run `sparkie` on the folder, and compiles and AndroidDebug target (aka Android, but with the installation onto the currently connected device)

Release has a `Filters` element, which is a magical piece of code (which doesn't exist at this moment in time) and are specific to the target type, as there would be no point filtering dpi levels on a C++ calculator application would they?

The `dpi` filter creates a total of 4 targets (`release_hdpi`, `release_mdpi`, `release_ldpi`, `release_xhdpi`) of which each have slightly different resources bundled with them. This makes your APKs smaller!
