sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/vk/ContentResource",
	"sap/m/MessageToast"
], function(Controller,History,JSONModel, ContentResource, MessageToast) {
	"use strict";
	
	var handleEmptyUrl = function (view) {
		var oBundle = view.getModel("i18n").getResourceBundle();
		var msg = oBundle.getText("missingUrl");
		MessageToast.show(msg);
	};

	var loadModelIntoViewer = function (viewer, remoteUrl, sourceType, localFile) {
		//what is currently loaded in the view is destroyed
		viewer.destroyContentResources();
		//localFile="Animation Example with HSE_copy";
		
		var source = remoteUrl || localFile;
		
		if (source) {
			//content of viewer is replaced with new data
			var contentResource = new ContentResource({
				source: source,
				sourceType: sourceType,
				sourceId: "abc"
			});

			//content: chosen path. content added to the view
			viewer.addContentResource(contentResource);
		}
	};
	return Controller.extend("vdsdemo.controller.Detail", {
		
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachPatternMatched(this._onObjectMatched, this);
	
			var sourceData = {
			localFile: undefined,
		    remoteUrl: "http://dtti.in/images/courses.jpg"
			};
			var model = new JSONModel();
			model.setData(sourceData);
			this.getView().setModel(model, "source");
			
			sourceData = this.getView().getModel("source").oData;
			var viewer = this.getView().byId("viewer");
			if (sourceData.remoteUrl) {
				loadModelIntoViewer(viewer, sourceData.remoteUrl, "jpg");
			} else {
				handleEmptyUrl(this.getView());
			}
		},
		
		onPressLoadRemoteModel: function (event) {
			var view = this.getView();
			var sourceData = view.getModel("source").oData;
			var viewer = view.byId("viewer");
			if (sourceData.remoteUrl) {
				loadModelIntoViewer(viewer, sourceData.remoteUrl, "vds");
			} else {
				handleEmptyUrl(view);
			}
		},

		onPressLoadRemoteImage: function (event) {
			var view = this.getView();
			var sourceData = view.getModel("source").oData;
			var viewer = view.byId("viewer");
			if (sourceData.remoteUrl) {
				loadModelIntoViewer(viewer, sourceData.remoteUrl, "jpg");
			} else {
				handleEmptyUrl(view);
			}
		},

		onChangeFileUploader: function (event) {
		var view = this.getView();
		var viewer = view.byId("viewer");
		var localFile = event.getParameter("files")[0];
		//var localFile = "Animation";
		//if user selects a local file
		if (localFile) {
			var fileName = localFile.name;
			var index = fileName.lastIndexOf(".");
				if (index >= 0 && index < fileName.length - 1) {
					var sourceType = fileName.substr(index + 1);
					loadModelIntoViewer(viewer, null, sourceType, localFile);
				}
			}
		},
		
		onclickFileUploader: function (event) {
		var view = this.getView();
		var viewer = view.byId("viewer");
		//var localFile = event.getParameter("files")[0];
		var localFile = "D:/viewer/Animation.vds";
		//if user selects a local file
		if (localFile) {
			var fileName = localFile.name;
			var index = fileName.lastIndexOf(".");
				if (index >= 0 && index < fileName.length - 1) {
					var sourceType = fileName.substr(index + 1);
					loadModelIntoViewer(viewer, null, sourceType, localFile);
				}
			}
		},
		_onObjectMatched: function (oEvent) {
			this.getView().bindElement({
				path: "/" + oEvent.getParameter("arguments").vdsPath,
				model: "VDS_Files"
			});
			
		},

		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("main", {}, true);
			}
		}
		
	});

});