sap.ui.define([
	"../BaseController",
	"jquery.sap.global",
	"sap/m/PDFViewer",
	"sap/ui/model/json/JSONModel"
], function (BaseController,jQuery,PDFViewer,JSONModel) {
	"use strict";

	return BaseController.extend("sapui5.ycevik.controller.personal.Personal", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sapiu5.ycevik.view.Personal
		 */
		onInit: function () {

		},
		handleLinkedinPress: function(oEvent){
			window.open("https://www.linkedin.com/in/yusuf-%C3%A7evik-97354567/");
		},
		onDownloadResume: function (oEvent) {

		},
		onShowResume: function (oEvent) {
			this._pdfViewer = new PDFViewer();
			var sSource = "pdf/myResume.pdf";
			this._pdfViewer.setSource(sSource);
			this._pdfViewer.setTitle("Consultant Resume");
			this._pdfViewer.open();
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sapiu5.ycevik.view.Personal
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sapiu5.ycevik.view.Personal
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sapiu5.ycevik.view.Personal
		 */
		//	onExit: function() {
		//
		//	}

	});

});