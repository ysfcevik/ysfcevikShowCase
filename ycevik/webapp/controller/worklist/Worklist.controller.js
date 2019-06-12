sap.ui.define([
	"../BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../../formatter/formatter"
], function (BaseController, JSONModel, Filter, FilterOperator, formatter) {
	"use strict";
	var statusList = ["cheap", "moderate", "expensive", "all"];
	return BaseController.extend("sapui5.ycevik.controller.worklist.Worklist", {

		formatter: formatter,
		// Create an object of filters
		_mFilters : {
			"cheap": [new Filter("Price", "LE", 500)],
			"moderate": [new Filter("Price", "BT", 500, 1000)],
			"expensive": [new Filter("Price", "GT", 1000)],
			"all": []
			},
			
		onInit: function () {
			// this.oView = this.getView();
			// this._bDescendingSort = false;
			// this.oProductsTable = this.oView.byId("productsTable");
			
			var oViewModel,iOriginalBusyDelay,
				oTable = this.byId("productsTable");

			// Put down worklist table's original value for busy indicator delay,
			// so it can be restored later on. Busy handling on the table is
			// taken care of by the table itself.
			iOriginalBusyDelay = oTable.getBusyIndicatorDelay();
			this._oTable = oTable;
			// keeps the search state
			this._aTableSearchState = [];
	
			// Model used to manipulate control states
			oViewModel = new JSONModel({
				worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
				shareOnJamTitle: this.getResourceBundle().getText("worklistTitle"),
				shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
				shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
				tableNoDataText: this.getResourceBundle().getText("tableNoDataText"),
				tableBusyDelay: 0,
				cheap: 0,
				moderate: 0,
				expensive: 0,
				all: 0
			});
			this.setModel(oViewModel, "worklistView");
			this._oViewModel = oViewModel;

			// Make sure, busy indication is showing immediately so there is no
			// break after the busy indication for loading the view's meta data is
			// ended (see promise 'oWhenMetadataIsLoaded' in AppController)
			oTable.attachEventOnce("updateFinished", function(){
				// Restore original busy indicator delay for worklist's table
				oViewModel.setProperty("/tableBusyDelay", iOriginalBusyDelay);
			});
		},
		onAfterRendering: function () {
          this._filterBalance();
        },
        _filterBalance: function () {
          var oBinding = this._oTable.getBinding("items");
          var oList = oBinding.oList;
          var cheap = 0;
          var moderate = 0;
          var expensive = 0;
		  var viewModel = this.getModel("worklistView");
          oList.forEach(function (element) {
            if ( element.Price < 500 ) {
              ++cheap;
            } else if ( element.Price >= 500 && element.Price < 1000  ) {
              ++moderate;
            } else if ( element.Price >= 1000) {
              ++expensive;
            }
          });
          // Loop at status to set balance count
          statusList.forEach(function (element) {
            switch (element) {
              case "cheap":
                viewModel.setProperty("/cheap", cheap);
                break;
              case "moderate":
                viewModel.setProperty("/moderate", moderate);
                break;
              case "expensive":
                viewModel.setProperty("/expensive", expensive);
                break;
              case "all":
                viewModel.setProperty("/all", oList.length);
                break;
            }
          });
        },
        onQuickFilter: function(oEvent) {
			var oBinding = this._oTable.getBinding("items"),
				sKey = oEvent.getParameter("selectedKey");
			oBinding.filter(this._mFilters[sKey]);
		},
		onUpdateFinished : function (oEvent) {
			
			// // update the worklist's object counter after the table update
			// var sTitle,
			// 	oTable = oEvent.getSource(),
			// 	iTotalItems = oEvent.getParameter("total"),
			// 	oModel = this.getModel(""),
			// 	oViewModel = this.getModel("worklistView");
			// // only update the counter if the length is final and
			// // the table is not empty
			// if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
			// 	sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
				
			// 	jQuery.each(this._mFilters, function(sKey, oFilter){
			// 		this.getModel("products").read(">/ProductCollection/$count",{
			// 		filters: oFilter,
			// 		success: function (oData){
			// 			var sPath = "/" + sKey;
			// 			oViewModel.setProperty(sPath, oData);
			// 		}
			// 		});
			// 	});
			// } else {
			// 	sTitle = this.getResourceBundle().getText("worklistTableTitle");
			// }
			// this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
		
		},
		onPress : function (oEvent) {
			// The source is the list item that got pressed
			var oItem = oEvent.getSource();
			var oCtx  = oItem.getBindingContext("items");
			
			var sPath = oCtx.getPath() ;
			
			// var oView = this.getView();
			// var sName = oView.getModel().getProperty("name", oItem.getBindingContext("sites"));
			// var sName = oItem.getBindingContext("items").getObject("ProductId");
			
			
			this._showObject(oEvent.getSource());
			
		},
		_showObject : function (oItem) {
			
			
			this.getRouter().navTo("Object", {
				objectId: oItem.getBindingContext().getProperty("products>/ProductId")
			});
		}
	});
});			