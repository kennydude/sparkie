// Android debug target
var Android = require("./Android");

exports = module.exports = AndroidDebugTarget;

function AndroidDebugTarget(){};

// TODO: Install and run on device

AndroidDebugTarget.prototype.__proto__ = Android.prototype;
