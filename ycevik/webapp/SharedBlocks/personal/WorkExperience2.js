sap.ui.define(["sap/uxap/BlockBase"], 
	function (BlockBase) {
	"use strict";

	var WorkExperience2 = BlockBase.extend("sapui5.ycevik.SharedBlocks.personal.WorkExperience2", {
		metadata: { 
			views: {
				Collapsed: {
					viewName: "sapui5.ycevik.SharedBlocks.personal.WorkExperience2",
					type: "XML"
				},
				Expanded: {
					viewName: "sapui5.ycevik.SharedBlocks.personal.WorkExperience2",
					type: "XML"
				}
			}
		
		}
	});
	return WorkExperience2;
}, true);
