sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller,JSONModel,Filter, FilterOperator) {
	"use strict";

	return Controller.extend("vdsdemo.controller.Main", {
			onInit: function () {
				var oViewModel = new JSONModel({
				});
				this.getView().setModel(oViewModel, "view");
			},
			onFilterList: function (oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("File_Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oList = this.byId("vdsList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
		},

		onPress: function (oEvent) {
			this._showDetail(oEvent.getSource());
		},
		
		_showDetail: function(oItem) {
			var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
			//oRouter.navTo("Detail");
			oRouter.navTo("Detail", {
					vdsPath: oItem.getBindingContext().getPath().substr(1)
			});
		}
		
	});
});