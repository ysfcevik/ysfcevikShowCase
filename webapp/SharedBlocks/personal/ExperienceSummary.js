sap.ui.define(["sap/uxap/BlockBase"], 
	function (BlockBase) {
	"use strict";

	var ExperienceSummary = BlockBase.extend("sapui5.ycevik.SharedBlocks.personal.ExperienceSummary", {
		metadata: { 
			views: {
				Collapsed: {
					viewName: "sapui5.ycevik.SharedBlocks.personal.ExperienceSummary",
					type: "XML"
				},
				Expanded: {
					viewName: "sapui5.ycevik.SharedBlocks.personal.ExperienceSummary",
					type: "XML"
				}
			}
		}
	});
	return ExperienceSummary;
}, true);