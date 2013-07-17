var Purchase = function(){
"use strict";

	var
	bought = false,
	license = Windows.ApplicationModel.Store.CurrentAppSimulator.licenseInformation,
	reloadLicense = function(){
		license = Windows.ApplicationModel.Store.CurrentAppSimulator.licenseInformation;
		checkStatus();
   },

	checkStatus = function () {
		if (!license.isTrial) {
			if (license.isActive) {
				bought = true;
			}
		}
	};

	license.addEventListener("licensechanged", reloadLicense);

	return {
		bought: bought
	};

}();