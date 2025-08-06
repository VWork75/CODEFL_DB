// eslint-disable-next-line @typescript-eslint/no-var-requires
const cds = require('@sap/cds')
const lib_email = require('./cta_email_lib');
const lib_cta = require('./cta_library');

module.exports = {

    _getEmailContent: async function (connection, sAction, oCrData) {

        var oEmailContent = {
			"subject": null,         
			"emailBody": null
		};

        var connection = await cds.connect.to('db');

        var sTempContent = ""
        var oSubAccountDetails = await lib_cta._getSubAccountDetails(connection);
        var oSmtpDetails = await lib_email._getSmtpConfig(connection);
        var sClientContactEmail = oSmtpDetails.SENDER_EMAIL;
        var sPortalLink = oSubAccountDetails.PORTAL_LINK;

        var sMainPortalLink = sPortalLink + "/site/CollaborativeContractTerms#Shell-home";
        var sBuyerPortalLink = sPortalLink + "/site/CollaborativeContractTerms#buyer_poc2-display?sap-ui-app-id-hint=saas_approuter_com.codefluent.contractterms.buyerpoc2&/Detail/";
        var sSupplierPortalLink = sPortalLink + "/site/CollaborativeContractTerms#vendor_poc2-display?sap-ui-app-id-hint=saas_approuter_com.codefluent.contractterms.vendorpoc2&/Detail/";


        if(sAction === "CREATE"){
            oEmailContent.subject = oCrData.UNIQUE_NAME + " has been assigned to " + oCrData.VENDOR_NAME + ".";

            sTempContent = "Dear Supplier," + "<br><br>";
            sTempContent += "Contract Request: " + oCrData.UNIQUE_NAME + " has been assigned to you as Supplier - " + oCrData.VENDOR_NAME +
            " and is currently pending update from you." + "<br>" + "<br>" +
            "Please click " + "<a href=" +  sSupplierPortalLink + oCrData.UNIQUE_NAME + ">" + "here" + "</a>" + " to login to <strong>Collaborative Contract Terms - Supplier Portal</strong> for further actions." +
            "<br>" + "<br>" +
            "<br>" +
            "Should you have any questions, please do not hesitate to reach out to us via email at <a href=" + sClientContactEmail + ">" +
            sClientContactEmail +
            "</a>" + "<br>" +
            "<br>" +
            "Regards," + "<br>" +
            "Collaborative Contract Terms Support Team" +
            "<br><br>";

            oEmailContent.emailBody = "<p style=" + "font-family:Arial, Helvetica, sans-serif;font-size:11px;color:black>" + sTempContent + "</p>";

        } else if (sAction === "VENDOR_UPDATE") {
            oEmailContent.subject = oCrData.UNIQUE_NAME + " assigned to " + oCrData.VENDOR_NAME + " is pending for your approval.";

            sTempContent = "Dear Buyer," + "<br><br>";
            sTempContent += "Contract Request: " + oCrData.UNIQUE_NAME + " has been updated by Supplier - " + oCrData.VENDOR_NAME +
            " and is currently pending your approval." + "<br>" + "<br>" +
            "Please click " + "<a href=" +  sBuyerPortalLink + oCrData.UNIQUE_NAME + ">" + "here" + "</a>" + " to login to <strong>Collaborative Contract Terms - Buyer Portal</strong> for further actions." +
            "<br>" + "<br>" +
            "<br>" +
            "Should you have any questions, please do not hesitate to reach out to us via email at <a href=" + sClientContactEmail + ">" +
            sClientContactEmail +
            "</a>" + "<br>" +
            "<br>" +
            "Regards," + "<br>" +
            "Collaborative Contract Terms Support Team" +
            "<br><br>";

            oEmailContent.emailBody = "<p style=" + "font-family:Arial, Helvetica, sans-serif;font-size:11px;color:black>" + sTempContent + "</p>";

        } else if (sAction === "SEND_BACK") {
            oEmailContent.subject = oCrData.UNIQUE_NAME + " is sent back to " + oCrData.VENDOR_NAME + ".";

            sTempContent = "Dear Supplier," + "<br><br>";
            sTempContent += "Contract Request: " + oCrData.UNIQUE_NAME + " has been assigned to you as Supplier - " + oCrData.VENDOR_NAME +
            " has been sent back and need updated details from you." + "<br>" + "<br>" +
            "Please click " + "<a href=" +  sSupplierPortalLink + oCrData.UNIQUE_NAME + ">" + "here" + "</a>" + " to login to <strong>Collaborative Contract Terms - Supplier Portal</strong> for further actions." +
            "<br>" + "<br>" +
            "<br>" +
            "Should you have any questions, please do not hesitate to reach out to us via email at <a href=" + sClientContactEmail + ">" +
            sClientContactEmail +
            "</a>" + "<br>" +
            "<br>" +
            "Regards," + "<br>" +
            "Collaborative Contract Terms Support Team" +
            "<br><br>";

            oEmailContent.emailBody = "<p style=" + "font-family:Arial, Helvetica, sans-serif;font-size:11px;color:black>" + sTempContent + "</p>";


        } else if (sAction === "BUYER_APPROVAL") {
            oEmailContent.subject = oCrData.UNIQUE_NAME + " for " + oCrData.VENDOR_NAME + " is approved and ready for publish.";

            sTempContent = "Dear Buyer," + "<br><br>";
            sTempContent += "Contract Request: " + oCrData.UNIQUE_NAME + " for Supplier - " + oCrData.VENDOR_NAME +
            " is approved and is ready to be published." + "<br>" + "<br>" +
            "Please click " + "<a href=" +  sBuyerPortalLink + oCrData.UNIQUE_NAME + ">" + "here" + "</a>" + " to login to <strong>Collaborative Contract Terms - Buyer Portal</strong> for further actions." +
            "<br>" + "<br>" +
            "<br>" +
            "Should you have any questions, please do not hesitate to reach out to us via email at <a href=" + sClientContactEmail + ">" +
            sClientContactEmail +
            "</a>" + "<br>" +
            "<br>" +
            "Regards," + "<br>" +
            "Collaborative Contract Terms Support Team" +
            "<br><br>";

            oEmailContent.emailBody = "<p style=" + "font-family:Arial, Helvetica, sans-serif;font-size:11px;color:black>" + sTempContent + "</p>";
            
        } else if (sAction === "PUBLISH") {
            oEmailContent.subject = oCrData.UNIQUE_NAME + " for " + oCrData.VENDOR_NAME + " is published in Ariba System.";

            sTempContent = "Dear Buyer," + "<br><br>";
            sTempContent += "Congratulations! Your Contract Request: " + oCrData.UNIQUE_NAME + " for Supplier - " + oCrData.VENDOR_NAME +
            " has been published on Ariba system." + "<br>" + "<br>" +
            "Please click " + "<a href=" + sMainPortalLink + ">" + "here" + "</a>" + " to login to <strong>Collaborative Contract Terms Portal</strong> for further actions." +
            "<br>" + "<br>" +
            "<br>" +
            "Should you have any questions, please do not hesitate to reach out to us via email at <a href=" + sClientContactEmail + ">" +
            sClientContactEmail +
            "</a>" + "<br>" +
            "<br>" +
            "Regards," + "<br>" +
            "Collaborative Contract Terms Support Team" +
            "<br><br>";

            oEmailContent.emailBody = "<p style=" + "font-family:Arial, Helvetica, sans-serif;font-size:11px;color:black>" + sTempContent + "</p>";
            
        }

        return oEmailContent;
    }



}