# Sparkie is yet another build system

Yes, another. Why?

Well, because I wanted to

## Design

It works in "targets" like Make does, but they work differently. You define a target of a type (e.g Android) which you can push through filters which can duplicate/modify targets.

You start with an outcome, of the target type you want. Then filters will multiply the targets, of which will finally get executed
