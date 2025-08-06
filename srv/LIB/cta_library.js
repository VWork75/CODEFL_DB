const cds = require("@sap/cds");
// const crypto = require('crypto');

module.exports = {

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

    _getCurrentStatus: async function(connection, aCrData) {
        var aDataWithStatus = [];
        var sUniqueName = "";
        var oCrAssigned = false;

        if (aCrData.value.length > 0) {
            for (let index = 0; index < aCrData.value.length; index++) {
                sUniqueName = aCrData.value[index].UniqueName;
                oCrAssigned = await this._CheckIfCrAssigned(connection, sUniqueName);

                if(oCrAssigned && oCrAssigned.length > 0){
                    aCrData.value[index].STATUS = oCrAssigned[0].STATUS;
                    aCrData.value[index].STATUS_DESC = await this._getStatusDescription(connection, oCrAssigned[0].STATUS);
                } else {
                    aCrData.value[index].STATUS = 1;
                    aCrData.value[index].STATUS_DESC = await this._getStatusDescription(connection, 1);
                }

                aDataWithStatus.push(aCrData.value[index]);
            }
        }

        return aDataWithStatus;
    },

    _CheckIfCrAssigned: async function(connection, sUniqueName) {
        try {

            // connection = await cds.connect.to('db');

            let aResult = await connection.run(
                SELECT
                    .from`${connection.entities['CONTRACT_REQUESTS_ASSIGNED']}`
                    .where({ UNIQUE_NAME: sUniqueName }));

            if (aResult.length > 0) return aResult;
            else return null;

        }
        catch (error) { throw error; }

    },

    _getStatusDescription: async function(connection, iCode) {
        try {

            // connection = await cds.connect.to('db');

            let aResult = await connection.run(
                SELECT `DESCRIPTION`
                    .from`${connection.entities['MASTER_STATUS']}`
                    .where({ CODE: iCode }));

            if (aResult.length > 0) return aResult[0].DESCRIPTION;
            else return null;

        }
        catch (error) { throw error; }

    },

    _getCrMilestonesFromHana: async function(connection, sDocId) {
        try {

            let aResult = await connection.run(
                SELECT 
                    .from`${connection.entities['CONTRACT_TERM_SUPPLIER_MILESTONES']}`
                    .where({ UNIQUE_NAME: sDocId }));

            if (aResult.length > 0) return aResult;
            else return [];

        }
        catch (error) { throw error; }
    },

    _getAssignedCrFromHana: async function(connection) {
        try {

            let aResult = await connection.run(
                SELECT 
                    .from`${connection.entities['CONTRACT_REQUESTS_ASSIGNED']}`);

            if (aResult.length > 0) return aResult;
            else return [];

        }
        catch (error) { throw error; }
    },

    _getCrEventsLog: async function(connection, sDocId) {
        try {

            let aResult = await connection.run(
                SELECT 
                    .from`${connection.entities['CONTRACT_REQUESTS_EVENTS_LOG']}`
                    .where({ UNIQUE_NAME: sDocId })
                    .orderBy("EVENT_NO asc"));

            if (aResult.length > 0) return aResult;
            else return [];

        }
        catch (error) { throw error; }
    },

    _getSubAccountDetails: async function(connection) {
        try {

            let aResult = await connection.run(
                SELECT 
                    .from`${connection.entities['MASTER_SUBACCOUNT']}`
                    .where({ SR_NO: 1 }));

            if (aResult.length > 0) return aResult[0];
            else return [];

        }
        catch (error) { throw error; }
    },


    sleep: async function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

}