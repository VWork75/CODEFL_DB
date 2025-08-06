const cds = require("@sap/cds");
// const crypto = require('crypto');

module.exports = {

    _UpdateCRLineItemsPricingInfo: async function(token, sRealm, sApiKey, sDocId, aPayload, sNumInCol, sUrl) {
        let oResponse = {};
        try {
            // /contractRequests/CR18/lineItems?realm=CFDEVDSAPP-1-T&$top&$skip&$count

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;

            var path = '/contract-compliance/v1/prod/contractRequests/' + sDocId + '/lineItems/' + sNumInCol + '/' + sUrl +'?realm=' + sRealm;
            oResponse = await ConAribaCC.send({
                method: 'PUT',
                path: path,
                data: aPayload,
                headers: {
                    'Authorization': JToken,
                    'apiKey': sApiKey,
                    'Content-Type': 'application/json',
                    "accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            return { "status": "200", "message": oResponse };

        } catch (error) {
            // throw error;

            if (error.reason.response.body.message) {
                var vMsg = error.reason.response.body.message
            }
            else if(error.reason.response.body.error.details && error.reason.response.body.error.details.length){
                var vMsg = error.reason.response.body.error.details[0].message;
            }
            else {
                var vMsg = error.message;
            }
            throw { "status": error.reason.response.status.toString(), "message": vMsg };
            // error.reason.response.body.error.details
        }
    },
    _PostCRLineItemsPricingInfo: async function(token, sRealm, sApiKey, sDocId, aPayload, sNumInCol, sUrl) {
        let oResponse = {};
        try {
            // /contractRequests/CR18/lineItems?realm=CFDEVDSAPP-1-T&$top&$skip&$count

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;

            var path = '/contract-compliance/v1/prod/contractRequests/' + sDocId + '/lineItems/' + sNumInCol + '/' + sUrl +'?realm=' + sRealm;
            oResponse = await ConAribaCC.send({
                method: 'POST',
                path: path,
                data: aPayload,
                headers: {
                    'Authorization': JToken,
                    'apiKey': sApiKey,
                    'Content-Type': 'application/json',
                    "accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            return { "status": "200", "message": oResponse };

        } catch (error) {

            if (error.reason.response.body.message) {
                var vMsg = error.reason.response.body.message
            }
            else if(error.reason.response.body.error.details && error.reason.response.body.error.details.length){
                var vMsg = error.reason.response.body.error.details[0].message;
            }
            else {
                var vMsg = error.message;
            }
            throw { "status": error.reason.response.status.toString(), "message": vMsg };
            // throw error;
            // throw { "status": error.reason.response.status.toString(), "message": error.message };
        }

    },
    _getCompletionDate: async function (odate) {
        // debugger; //'2024-03-30T11:30:00-07:00'
        var date = new Date(odate); //Thu Aug 15 2024 00:00:00 GMT+0530 (India Standard Time)
        var iYear = date.getUTCFullYear(); //2024
        var iMonth = date.getUTCMonth() + 1; //8
        if (iMonth < 10) {
            iMonth = `0${iMonth}`;
        }
        var iDate = date.getDate();//10
        if (iDate < 10) {
            iDate = `0${iDate}`;
        }
        var iHour = date.getUTCHours();
        if (iHour < 10) {
            iHour = `0${iHour}`;
        }
        var iMinutes = date.getUTCMinutes();
        if (iMinutes < 10) {
            iMinutes = `0${iMinutes}`;
        }
        var sTime = date.toTimeString(); //'11:18:02 GMT+0530 (India Standard Time)'
        sTime = sTime.split("GMT")[1]; //'+0530 (India Standard Time)'
        sTime = sTime.split(" ")[0]; //'+0530'
        sTime = sTime.slice(0, 3) + ':' + sTime.slice(3); //'+05:30'

        var formattedTime = `${iYear}-${iMonth}-${iDate}T${iHour}:${iMinutes}:00${sTime}`;
        return formattedTime;
    },

    _getAribaToken: async function () {

        let ConAribaToken = await cds.connect.to('Ariba_API_token');
        try {
            // var params = "?grant_type=client_credentials";
            var path = '/token?grant_type=client_credentials';

            const JwToken = await ConAribaToken.send('POST', path, '', { 'Content-Type': 'application/x-www-form-urlencoded' });
            const lv_JWToken = JwToken.access_token;

            return lv_JWToken;

        } catch (error) {
            throw error;
        }
    },

    _getContractRequests: async function (token, sRealm, sApiKey, aCrData, sStatusString) {

        try {

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;
            var sFilters = await this._getCRFilters(aCrData, sStatusString) || "";

            var path = '/contract-compliance/v1/prod/contractRequests?realm=' + sRealm + sFilters;
            var oResponse = await ConAribaCC.send('GET', path, '', {
                'Authorization': JToken,
                'apiKey': sApiKey
            });

            // if (oResponse && (sStatusString !== "" && sStatusString !== null)) {
            //     oResponse = { "value": await this._applyStatusFilter(oResponse.value, sStatusString) || "" };
            // }

            return oResponse;

        } catch (error) {
            throw error;
        }

    },

    _getContractRequestsLineItems: async function (token, sRealm, sApiKey, sDocId) {
        let oResponse = {};
        try {
            // contractRequests/CR18/lineItems?realm=CFDEVDSAPP-1-T&$top&$skip&$count

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;

            var path = '/contract-compliance/v1/prod/contractRequests/' + sDocId + '/lineItems?realm=' + sRealm + '&$top&$skip&$count';
            oResponse = await ConAribaCC.send('GET', path, '', {
                'Authorization': JToken,
                'apiKey': sApiKey
            });

            return oResponse;

        } catch (error) {
            oResponse.LineItems = [];
            oResponse.error = error;
            return oResponse;

            // throw error;
        }

    },

    _UpdateContractRequestsLineItems: async function (token, sRealm, sApiKey, sDocId, aPayload) {
        let oResponse = {};
        try {
            // /contractRequests/CR18/lineItems?realm=CFDEVDSAPP-1-T&$top&$skip&$count

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;
            // await this.sleep(500);
            var path = '/contract-compliance/v1/prod/contractRequests/' + sDocId + '/lineItems?realm=' + sRealm;
            oResponse = await ConAribaCC.send({
                method: 'PATCH',
                path: path,
                data: aPayload,
                headers: {
                    'Authorization': JToken,
                    'apiKey': sApiKey,
                    'Content-Type': 'application/json',
                    "accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            for(let index =0; index<aPayload.LineItems.length ; index++){
                if(aPayload.LineItems[index].PricingInfo){
                    // if(aPayload.LineItems[index].PricingInfo.PricingTermsType === 'DiscountedPrice'){
                    await this.sleep(500);
                    var sUrl = "discountedPricing";
                    var oLineItem = aPayload.LineItems[index].PricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._UpdateCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                else if(aPayload.LineItems[index].TierPricingInfo){
                    await this.sleep(500);
                    var sUrl = "tieredPricing";
                    var oLineItem = aPayload.LineItems[index].TierPricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._UpdateCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                else if(aPayload.LineItems[index].TermPricingInfo){
                    await this.sleep(500);
                    var sUrl = "termBasedPricing";
                    var oLineItem = aPayload.LineItems[index].TermPricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._UpdateCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                }
            // }
            return { "status": "200", "message": oResponse };

        } catch (error) {
            
            if(error.reason){
            if (error.reason.response.body.error.details) {
                var vMsg = error.reason.response.body.error.details;
                var vStatus =error.reason.response.status;
             }
            }
            else if(error.status && error.message)
            {
                var vMsg = error.message;
                var vStatus = error.status;
            }        
            else {
                var vMsg = error.message;
                var vStatus = error.status;
            }
            throw { "status": vStatus.toString(), "message": vMsg };
            // error.reason.response.body.error.details
        }

    },

    _PostNewContractRequestsLineItems: async function (token, sRealm, sApiKey, sDocId, aPayload) {
        let oResponse = {};
        try {
            // /contractRequests/CR18/lineItems?realm=CFDEVDSAPP-1-T&$top&$skip&$count

            let ConAribaCC = await cds.connect.to('Ariba_API');
            var JToken = 'Bearer ' + token;

            var path = '/contract-compliance/v1/prod/contractRequests/' + sDocId + '/lineItems?realm=' + sRealm;
            oResponse = await ConAribaCC.send({
                method: 'POST',
                path: path,
                data: aPayload,
                headers: {
                    'Authorization': JToken,
                    'apiKey': sApiKey,
                    'Content-Type': 'application/json',
                    "accept": "application/json",
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            
            for(let index =0; index<aPayload.LineItems.length ; index++){
                if(aPayload.LineItems[index].PricingInfo){
                    // if(aPayload.LineItems[index].PricingInfo.PricingTermsType === 'DiscountedPrice'){
                    await this.sleep(500);
                    var sUrl = "discountedPricing";
                    var oLineItem = aPayload.LineItems[index].PricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._PostCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                else if(aPayload.LineItems[index].TierPricingInfo){
                    await this.sleep(500);
                    var sUrl = "tieredPricing";
                    var oLineItem = aPayload.LineItems[index].TierPricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._PostCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                else if(aPayload.LineItems[index].TermPricingInfo){
                    await this.sleep(500);
                    var sUrl = "termBasedPricing";
                    var oLineItem = aPayload.LineItems[index].TermPricingInfo;
                    var sNumInCol = aPayload.LineItems[index].NumberInCollection;
                    var updateLineItem = await this._PostCRLineItemsPricingInfo(token, sRealm, sApiKey, sDocId, oLineItem, sNumInCol, sUrl);
                }
                }
            

            return { "status": "200", "message": oResponse };

        } catch (error) {
            if(error.reason){
                if (error.reason.response.body.error) {
                    if(error.reason.response.body.error.details.length > 0){
                    var vMsg = error.reason.response.body.error.details;
                    var vStatus =error.reason.response.status;
                 }
                 else if(error.reason.response.body.error.details.length === 0){
                    var vMsg = error.reason.response.body.error.message;
                    var vStatus =error.reason.response.status;
                 }
                }
                }
                else if(error.status && error.message)
                {
                    var vMsg = error.message;
                    var vStatus = error.status;
                }        
                else {
                    var vMsg = error.message;
                    var vStatus = error.status;
                }
                throw { "status": vStatus.toString(), "message": vMsg };
            // if (error.reason.response.body.error.details.length != 0) {
            //     var vMsg = error.reason.response.body.error.details
            // }
            // else {
            //     var vMsg = error.message;
            // }
            // throw { "status": error.reason.response.status.toString(), "message": vMsg };
            // throw error;
            // throw { "status": error.reason.response.status.toString(), "message": error.message };
        }

    },

    _getCRFilters: async function (aCrData, sStatusString) {
        var sFilter = "";
        var bFilterExists = false;

        // &$filter=UniqueName eq 'CR18' or UniqueName eq 'CR16'
        if (aCrData.length > 0 || sStatusString !== "") {
            sFilter = "&$filter=";

            for (let index = 0; index < aCrData.length; index++) {
                if (index === 0) {
                    bFilterExists = true;
                    sFilter += " ( ";
                } else {
                    sFilter += " or ";
                }

                sFilter += "UniqueName eq '" + aCrData[index] + "'";

                if (index === aCrData.length - 1) sFilter += " ) ";
            }

            if (sStatusString !== "") {
                if (bFilterExists) sFilter += " and ";
                sFilter += "StatusString eq '" + sStatusString + "'";
            }
        }

        return sFilter;
    },

    _applyStatusFilter: async function (aCrData, sStatusString) {
        var aFilteredData = [];
        var aSkippedData = [];

        if (aCrData.length > 0) {

            for (let index = 0; index < aCrData.length; index++) {
                if (aCrData[index].StatusString === sStatusString) {
                    aFilteredData.push(aCrData[index]);
                } else {
                    aSkippedData.push(aCrData[index]);
                }
            }
        }

        return aFilteredData;
    },

    _getContractRequestbyCloudSDK: async function () {
        //Get API Details
        let oDestination = await cloudSDK.getDestination("Ariba_API_CC");
        let sRealm = "CFDEVDSAPP-1-T";

        // Destination validation
        if (!oDestination || !oDestination.originalProperties.destinationConfiguration.apikey) {
            logger.error(`Destination does not exist or is incorrectly configured`);
            throw Error("Destination does not exist or is incorrectly configured");
        }

        //building request
        let oRequestConfig = await cloudSDK.buildHttpRequest(oDestination);
        oRequestConfig.baseURL = oRequestConfig.baseURL + "/contract-compliance/v1/prod/contractRequests?realm=" + sRealm;
        // oRequestConfig.baseURL = oRequestConfig.baseURL + "/supplierdatapagination/v4/prod/vendorDataRequests";
        oRequestConfig.method = "post";
        oRequestConfig.params = { realm: sRealm };
        oRequestConfig.headers["Accept"] = oRequestConfig.headers["Content-Type"] = "application/json";
        oRequestConfig.headers["apikey"] = oDestination.originalProperties.destinationConfiguration.apikey;

        let oPayload = { "outputFormat": "JSON", "withQuestionnaire": true };
        oRequestConfig.data = oPayload;

        return oRequestConfig
    },

    sleep: async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },


   
    _getCrLineitemPayload: async function (aUpdatedData,sAction) {
        var aLineItems = [];
        var oItemObj;
        var oUpdatedData = {};
        var oFinalPayload = {};
        var aSplitAccountings;
        var aTierPricingInfo;
        var aTermPricingInfo;
        var aPricingInfo;
        
        if (aUpdatedData.length > 0) {
            for (var j = 0; j < aUpdatedData.length; j++) {
                if (aUpdatedData[j].LINETYPE_UNIQUENAME === '_MilestoneItem') {
                    oItemObj =
                    {
                        // "HanaLineItemSource": aUpdatedData[j].SOURCE,
                        // "HanaLineItemCreator" :aUpdatedData[j].CREATOR_ROLE,
                        // "HanaLineItemSourceType": aUpdatedData[j].SOURCE_TYPE,
                        "IsHardReleaseMinimum": aUpdatedData[j].ISHARDRELEASEMINIMUM,
                        "Description": {
                            "Description": aUpdatedData[j].DESCRIPTION,
                            "UnitOfMeasure": {
                                "UniqueName": aUpdatedData[j].UNITOFMEASURE_UNIQUENAME,
                                "Name": aUpdatedData[j].UNITOFMEASURE_NAME
                            },
                            "Price": {
                                "Amount": parseFloat(aUpdatedData[j].PRICE_AMOUNT),
                                "Currency": {
                                    "UniqueName": aUpdatedData[j].PRICE_AMOUNT_CURRENCYUNIQUENAME,
                                    "Name": ""//
                                }
                            },
                            "CommonCommodityCode": {
                                "Domain": aUpdatedData[j].COMMONCOMMODITYCODE_DOMAIN,
                                "UniqueName": aUpdatedData[j].COMMONCOMMODITYCODE_UNIQUENAME,
                                "Name": aUpdatedData[j].COMMONCOMMODITYCODE_NAME
                            },
                            "SupplierPartAuxiliaryID": aUpdatedData[j].SUPPLIERPARTAUXILIARYID,
                            "SupplierPartNumber": aUpdatedData[j].SUPPLIERPARTNUMBER
                        },
                        "CatalogSubscription": null,
                        "AccountCategory": aUpdatedData[j].ACCOUNTCATEGORY,
                        "Accountings": {
                            "SplitAccountings": []
                        },
                        "MaxAmount": {
                            "Amount": parseFloat(aUpdatedData[j].MAXAMOUNT_AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].MAXAMOUNT_CURRENCYUNIQUENAME,
                                "Name": "",
                            }
                        },
                        "StartDate": await this._getCompletionDate(aUpdatedData[j].STARTDATE),
                        "BillingAddress": aUpdatedData[j].BILLINGADDRESS,
                        "ParentLineNumber": aUpdatedData[j].PARENTLINENUMBER,
                        "NumberInCollection": aUpdatedData[j].NUMBERINCOLLECTION,
                        "IsRecurring": aUpdatedData[j].ISRECURRING,
                        "ItemCategory": aUpdatedData[j].ITEMCATEGORY,
                        "CommodityCode": {
                            "UniqueName": aUpdatedData[j].COMMODITYCODE_UNIQUENAME,
                            "Name": aUpdatedData[j].COMMODITYCODE_NAME

                        },
                        "IsObsolete": aUpdatedData[j].ISOBSOLETE,
                        "MaxQuantity": parseFloat(aUpdatedData[j].MAXQUANTITY),//================
                        "MaxAmountTolerancePercent": parseFloat(aUpdatedData[j].MAXAMOUNTTOLERANCEPERCENT),
                        "LineType": {
                            "Category": aUpdatedData[j].LINETYPE_CATEGORY,
                            "UniqueName": aUpdatedData[j].LINETYPE_UNIQUENAME,
                            "Name": aUpdatedData[j].LINETYPE_NAME
                        },
                        "HideUnitPrice": aUpdatedData[j].HIDEUNITPRICE,
                        "LimitType": aUpdatedData[j].LIMITTYPE,
                        "Milestone": {
                            "SupplierContact": aUpdatedData[j].SUPPLIER_CONTACT,
                            "NotificationDays": aUpdatedData[j].NOTIFICATION_DAYS,
                            "Title": aUpdatedData[j].TITLE,
                            "VerifierUser": {
                                "PasswordAdapter": aUpdatedData[j].VERIFIERUSER_PASSWORDADAPTER,
                                "UniqueName": aUpdatedData[j].VERIFIERUSER_UNIQUENAME,
                                "Name": aUpdatedData[j].VERIFIERUSER_NAME
                            }
                        },
                        "Amount": {
                            "Amount": parseFloat(aUpdatedData[j].AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].AMOUNT_CURRENCYUNIQUENAME,
                                "Name": ""
                            }
                        },
                        "IsHardReleaseMaximum": aUpdatedData[j].ISHARDRELEASEMAXIMUM,
                        "AccountType": aUpdatedData[j].ACCOUNTTYPE,
                        "RollUpAccumulatorsToParent": false,
                        "CompoundPricingTerms": false,
                        "ERPLineItemNumber": "",
                        "ShouldDefaultAccounting": false,
                        "HideAmount": aUpdatedData[j].HIDEAMOUNT,
                        "ShipTo": aUpdatedData[j].SHIPTO
                        
                    };
                    if (aUpdatedData[j].Accounting !== undefined && aUpdatedData[j].Accounting.length > 0) {
                        for (let i = 0; i < aUpdatedData[j].Accounting.length; i++) {
                            aSplitAccountings = {
                                "WBSElement": aUpdatedData[j].Accounting[i].WBSELEMENT,
                                "Percentage": parseFloat(aUpdatedData[j].Accounting[i].PERCENTAGE),
                                "Amount": {
                                    "Amount": parseFloat(aUpdatedData[j].Accounting[i].AMOUNT),
                                    "Currency": {
                                        "UniqueName": aUpdatedData[j].Accounting[i].AMOUNT_CURRENCYUNIQUENAME,
                                        "Name": ""
                                    }
                                },
                                "Quantity": parseFloat(aUpdatedData[j].Accounting[i].QUANTITY),
                                "InternalOrder": aUpdatedData[j].Accounting[i].INTERNALORDER,
                                "NumberInCollection": aUpdatedData[j].Accounting[i].ACCOUNTINGS_NUMBERINCOLLECTION,
                                "Type": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].TYPE_UNIQUENAME,
                                    "Name": aUpdatedData[j].Accounting[i].TYPE_NAME
                                },
                                "ActivityNumber": aUpdatedData[j].Accounting[i].ACTIVITYNUMBER,
                                "CostCenter": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].COSTCENTER
                                },
                                "GeneralLedger": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].GENERALLEDGER
                                },
                                "Network": aUpdatedData[j].Accounting[i].NETWORK,
                                "Asset": aUpdatedData[j].Accounting[i].ASSET,
                                "CompanyCode": aUpdatedData[j].Accounting[i].COMPANYCODE
                            }

                            oItemObj.Accountings.SplitAccountings.push(aSplitAccountings);
                        }
                        // aLineItems.push(oItemObj);
                    }
                    if(sAction === 'Get'){
                        var sHeader={
                        "HanaLineItemSource": aUpdatedData[j].SOURCE,
                        "HanaLineItemCreator" :aUpdatedData[j].CREATOR_ROLE,
                        "HanaLineItemSourceType": aUpdatedData[j].SOURCE_TYPE }
                    oItemObj.hanaHeader = sHeader;
                    }
                    aLineItems.push(oItemObj);
                }
                else {
                    oItemObj =
                    {
                        // "HanaLineItemSource": aUpdatedData[j].SOURCE,
                        // "HanaLineItemCreator" :aUpdatedData[j].CREATOR_ROLE,
                        // "HanaLineItemSourceType": aUpdatedData[j].SOURCE_TYPE,
                        "IsHardReleaseMinimum": aUpdatedData[j].ISHARDRELEASEMINIMUM,
                        "Description": {
                            "Description": aUpdatedData[j].DESCRIPTION,
                            "UnitOfMeasure": {
                                "UniqueName": aUpdatedData[j].UNITOFMEASURE_UNIQUENAME,
                                "Name": aUpdatedData[j].UNITOFMEASURE_NAME
                            },
                            "Price": {
                                "Amount": parseFloat(aUpdatedData[j].PRICE_AMOUNT),
                                "Currency": {
                                    "UniqueName": aUpdatedData[j].PRICE_AMOUNT_CURRENCYUNIQUENAME,
                                    "Name": ""
                                }
                            },
                            "CommonCommodityCode": {
                                "Domain": aUpdatedData[j].COMMONCOMMODITYCODE_DOMAIN,
                                "UniqueName": aUpdatedData[j].COMMONCOMMODITYCODE_UNIQUENAME,
                                "Name": aUpdatedData[j].COMMONCOMMODITYCODE_NAME
                            },
                            "SupplierPartAuxiliaryID": aUpdatedData[j].SUPPLIERPARTAUXILIARYID,//
                            "SupplierPartNumber": aUpdatedData[j].SUPPLIERPARTNUMBER//
                        },
                        "CatalogSubscription": null,
                        "AccountCategory": aUpdatedData[j].ACCOUNTCATEGORY,
                        "Accountings": {
                            "SplitAccountings": []
                        },
                        "MinQuantity": aUpdatedData[j].MINQUANTITY,
                        "MaxAmount": {
                            "Amount": parseFloat(aUpdatedData[j].MAXAMOUNT_AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].MAXAMOUNT_CURRENCYUNIQUENAME,
                                "Name": "",
                            }
                        },
                        "BillingAddress": aUpdatedData[j].BILLINGADDRESS,
                        "ParentLineNumber": 0,
                        "NumberInCollection": aUpdatedData[j].NUMBERINCOLLECTION,
                        "IsRecurring": aUpdatedData[j].ISRECURRING,
                        "ItemCategory": aUpdatedData[j].ITEMCATEGORY,
                        "CommodityCode": {
                            "UniqueName": aUpdatedData[j].COMMODITYCODE_UNIQUENAME,
                            "Name": aUpdatedData[j].COMMODITYCODE_NAME

                        },
                        "IsObsolete": aUpdatedData[j].ISOBSOLETE,
                        "MaxQuantity": aUpdatedData[j].MAXQUANTITY,//================
                        "MaxAmountTolerancePercent": parseFloat(aUpdatedData[j].MAXAMOUNTTOLERANCEPERCENT),
                        "LineType": {
                            "Category": aUpdatedData[j].LINETYPE_CATEGORY,
                            "UniqueName": aUpdatedData[j].LINETYPE_UNIQUENAME,
                            "Name": aUpdatedData[j].LINETYPE_NAME
                        },
                        "HideUnitPrice": aUpdatedData[j].HIDEUNITPRICE,
                        "LimitType": aUpdatedData[j].LIMITTYPE,
                        "MaxReleaseQuantity": aUpdatedData[j].MAXRELEASEQUANTITY,

                        // start pricing terms changes
                        "MinReleaseAmount": {
                            "Amount": parseFloat(aUpdatedData[j].MINRELEASEAMOUNT_AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].MINRELEASEAMOUNT_CURRENCYUNIQUENAME,
                                "Name": ""
                            }
                        },
                        "MinAmount": {
                            "Amount": parseFloat(aUpdatedData[j].MINAMOUNT_AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].MINAMOUNT_CURRENCYUNIQUENAME,
                                "Name": ""
                            }
                        },
                        "MaxReleaseTolerancePercent": parseFloat(aUpdatedData[j].MAXRELEASETOLERANCEPERCENT),

                        "MaxReleaseAmount": {
                            "Amount": parseFloat(aUpdatedData[j].MAXRELEASEAMOUNT_AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].MAXRELEASEAMOUNT_CURRENCYUNIQUENAME,
                                "Name": ""
                            }
                        },
                        // end pricing terms changes
                        // "Milestone": {
                        //     "SupplierContact": aUpdatedData[j].SUPPLIER_CONTACT,
                        //     "NotificationDays": aUpdatedData[j].NOTIFICATION_DAYS,
                        //     "Title": aUpdatedData[j].TITLE,
                        //     "VerifierUser": {
                        //         "PasswordAdapter": "PasswordAdapter1",
                        //         "UniqueName": "puser1",
                        //         "Name": "Puser1"
                        //     }
                        // },
                        "Amount": {
                            "Amount": parseFloat(aUpdatedData[j].AMOUNT),
                            "Currency": {
                                "UniqueName": aUpdatedData[j].AMOUNT_CURRENCYUNIQUENAME,
                                "Name": ""
                            }
                        },
                        "MinReleaseQuantity": aUpdatedData[j].MINRELEASEQUANTITY,
                        "MaxQuantityTolerancePercent": aUpdatedData[j].MAXQUANTITYTOLERANCEPERCENT,
                        "IsHardReleaseMaximum": aUpdatedData[j].ISHARDRELEASEMAXIMUM,
                        "AccountType": aUpdatedData[j].ACCOUNTTYPE,
                        "RollUpAccumulatorsToParent": false,
                        "CompoundPricingTerms": false,
                        "ERPLineItemNumber": "",
                        "ShouldDefaultAccounting": false,
                        "HideAmount": aUpdatedData[j].HIDEAMOUNT,
                        "ShipTo": aUpdatedData[j].SHIPTO
                    };
                    if(sAction === 'Get'){
                        var sHeader={
                        "HanaLineItemSource": aUpdatedData[j].SOURCE,
                        "HanaLineItemCreator" :aUpdatedData[j].CREATOR_ROLE,
                        "HanaLineItemSourceType": aUpdatedData[j].SOURCE_TYPE }
                    oItemObj.hanaHeader = sHeader;
                    }
                    if (aUpdatedData[j].Accounting !== undefined && aUpdatedData[j].Accounting.length > 0) {
                        for (let i = 0; i < aUpdatedData[j].Accounting.length; i++) {
                            aSplitAccountings = {
                                "WBSElement": aUpdatedData[j].Accounting[i].WBSELEMENT,
                                "Percentage": parseFloat(aUpdatedData[j].Accounting[i].PERCENTAGE),
                                "Amount": {
                                    "Amount": parseFloat(aUpdatedData[j].Accounting[i].AMOUNT),
                                    "Currency": {
                                        "UniqueName": aUpdatedData[j].Accounting[i].AMOUNT_CURRENCYUNIQUENAME,
                                        "Name": ""
                                    }
                                },
                                "Quantity": parseFloat(aUpdatedData[j].Accounting[i].QUANTITY),
                                "InternalOrder": aUpdatedData[j].Accounting[i].INTERNALORDER,
                                "NumberInCollection": aUpdatedData[j].Accounting[i].ACCOUNTINGS_NUMBERINCOLLECTION,
                                "Type": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].TYPE_UNIQUENAME,
                                    "Name": aUpdatedData[j].Accounting[i].TYPE_NAME
                                },
                                "ActivityNumber": aUpdatedData[j].Accounting[i].ACTIVITYNUMBER,
                                "CostCenter": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].COSTCENTER
                                },
                                "GeneralLedger": {
                                    "UniqueName": aUpdatedData[j].Accounting[i].GENERALLEDGER
                                },
                                "Network": aUpdatedData[j].Accounting[i].NETWORK,
                                "Asset": aUpdatedData[j].Accounting[i].ASSET,
                                "CompanyCode": aUpdatedData[j].Accounting[i].COMPANYCODE
                            }

                            oItemObj.Accountings.SplitAccountings.push(aSplitAccountings);
                        }
                        // aLineItems.push(oItemObj);
                    };
                    if (aUpdatedData[j].PricingTermPricingInfo !== undefined && aUpdatedData[j].PricingTermPricingInfo.length > 0) {
                        if (aUpdatedData[j].PricingTermPricingInfo[0].PRICINGTERMSTYPE === "TermBasedPricingTerms") {
                            var aPricingTiers;
                            aTermPricingInfo =
                            {
                                "PricingTermsType": "TermBasedPricingTerms",
                                "PricingTiers": []
                            }
                            for (let k = 0; k < aUpdatedData[j].PricingTermPricingInfo.length; k++) {
                                if (aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_DISCOUNTPERCENT === null && aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_STARTDATE === null )
                                {
                                    aPricingTiers = {
                                        "StartDate": await this._getCompletionDate(aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_DISCOUNTEDPRICESTARTDATE),
                                        "DiscountedPrice": {
                                            "Amount": parseFloat(aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_DISCOUNTEDPRICEAMOUNT),
                                            "Currency": {
                                                "UniqueName": aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_DISCOUNTEDPRICECURRENCYUNIQUENAME,
                                                "Name": ""
                                            }
                                        }
                                        
                                        // ,"DiscountPercent": 0
                                    }
                                    aTermPricingInfo.PricingTiers.push(aPricingTiers);
                                }
                                else {
                                    aPricingTiers = {
                                        "StartDate": await this._getCompletionDate(aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_STARTDATE),
                                        "DiscountPercent": aUpdatedData[j].PricingTermPricingInfo[k].PRICINGTIERS_DISCOUNTPERCENT
                                    }
                                    aTermPricingInfo.PricingTiers.push(aPricingTiers);
                                }

                            }
                            oItemObj.TermPricingInfo = aTermPricingInfo;
                        }
                        else if (aUpdatedData[j].PricingTermPricingInfo[0].PRICINGTERMSTYPE === "TierBasedPricingTerms") {
                            var aTieredPricingSteps;
                            aTierPricingInfo = {
                                "IsTierPricingCumulative": aUpdatedData[j].PricingTermPricingInfo[0].ISTIERPRICINGCUMULATIVE,
                                "TierValueType": aUpdatedData[j].PricingTermPricingInfo[0].TIERVALUETYPE,
                                "PricingTermsType": "TierBasedPricingTerms",
                                "TieredPricingSteps": [],
                                "TierType": aUpdatedData[j].PricingTermPricingInfo[0].TIERTYPE,
                                "AmountCurrency": {
                                    "UniqueName": aUpdatedData[j].PricingTermPricingInfo[0].AMOUNTCURRENCY_CURRENCYUNIQUENAME,
                                    "Name": ""
                                }
                            }
                            for (let l = 0; l < aUpdatedData[j].PricingTermPricingInfo.length; l++) {
                                aTieredPricingSteps = {
                                    "TierValue": parseFloat(aUpdatedData[j].PricingTermPricingInfo[l].TIEREDPRICINGSTEPS_TIERVALUE),
                                    "MinTierValue": parseFloat(aUpdatedData[j].PricingTermPricingInfo[l].TIEREDPRICINGSTEPS_MINTIERVALUE)
                                }
                                aTierPricingInfo.TieredPricingSteps.push(aTieredPricingSteps);
                            }

                            oItemObj.TierPricingInfo = aTierPricingInfo;
                        }
                        else if (aUpdatedData[j].PricingTermPricingInfo[0].PRICINGTERMSTYPE === "DiscountedPrice") {
                            aPricingInfo = {
                                "PricingTermsType": "DiscountedPrice",
                                "DiscountedPrice": {
                                    "Amount": parseFloat(aUpdatedData[j].PricingTermPricingInfo[0].DISCOUNTEDPRICE_AMOUNT),
                                    "Currency": {
                                        "UniqueName": aUpdatedData[j].PricingTermPricingInfo[0].DISCOUNTEDPRICE_CURRENCYUNIQUENAME,
                                        "Name": ""
                                    }
                                }
                            }
                            oItemObj.PricingInfo = aPricingInfo;

                        }
                        else if (aUpdatedData[j].PricingTermPricingInfo[0].PRICINGTERMSTYPE === "DiscountedPercent") {
                            aPricingInfo = {
                                "PricingTermsType": "DiscountedPercent",
                                "DiscountPercent": parseFloat(aUpdatedData[j].PricingTermPricingInfo[0].DISCOUNTPERCENT),
                                "DiscountedPrice": {
                                    "Amount": 0,
                                    "Currency": {
                                        "UniqueName": "",
                                        "Name": ""
                                    }
                                }
                            }
                            oItemObj.PricingInfo = aPricingInfo;
                        }
                    }
                    aLineItems.push(oItemObj);
                }
            }
        }

        oFinalPayload = {
            "LineItems": aLineItems
        };
        // throw oFinalPayload;
        return oFinalPayload;

    },
    _getCrLineitemsFromHana: async function(connection, sDocId) {
        try {
            // let aLinetypeUniquename = "_MilestoneItem"
            let aCRLineitems,aCRLineitemAccounting,aPricingTermsPricingInfo;
            
            aCRLineitems = await connection.run(
                    SELECT 
                        .from`${connection.entities['CR_LINEITEMS']}`
                        .where({ UNIQUE_NAME: sDocId})
            );
            if(aCRLineitems.length !== 0){
                for(var index =0;index<aCRLineitems.length; index++){
                aCRLineitemAccounting = await connection.run(
                    SELECT 
                        .from`${connection.entities['CR_LINEITEM_ACCOUNTING']}`
                        .where({ UNIQUE_NAME: sDocId,NUMBERINCOLLECTION: aCRLineitems[index].NUMBERINCOLLECTION  }));

                aPricingTermsPricingInfo = await connection.run(
                    SELECT .from`${connection.entities['PRICINGTERMS_PRICING_INFO']}`
                            .where({UNIQUE_NAME:sDocId,NUMBERINCOLLECTION:aCRLineitems[index].NUMBERINCOLLECTION })
                );
                aCRLineitems[index].Accounting = aCRLineitemAccounting;
                aCRLineitems[index].PricingTermPricingInfo = aPricingTermsPricingInfo
            }
        }
       // and LINETYPE_UNIQUENAME:
            if (aCRLineitems.length > 0) return aCRLineitems;
            else return [];

        }
        catch (error) { throw error; }
    },
    _getAPIConfig: async function (connection) {
        try {
            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['ARIBA_API_CONFIG']}`
                    .where({ SR_NO: 1 }));

            if (aResult.length > 0) return aResult[0];
            else return null;

        }
        catch (error) { throw error; }
    }



}