/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"sapui5/ycevik/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});