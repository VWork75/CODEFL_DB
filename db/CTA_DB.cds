namespace CTA;

// entity CONTRACT_TERM_UPDATELOG {
//     key KEY_ID            : UUID;
//         TITLE             : String(100);
//         DESCRIPTION       : String(200);
//         SUPPLIER_CONTACT  : String(15);
//         NOTIFICATION_DAYS : Integer;
//         MAX_AMOUNT        : String(100);
//         CURRENCY_CODE     : String(100);
//         CURRENCY_DESC     : String(100);
//         CREATION_DATE     : DateTime;
// }

// entity CONTRACT_REQUEST_RESPONSE {
//     key KEY_ID           : UUID;
//         EXTERNAL_ID      : String(100);
//         UNIQUE_NAME      : String(100);
//         PREPARER_ID      : String(100);
//         VENDOR_ID        : String(100);
//         VENDOR_NAME      : String(100);
//         COMPANY_CODE     : String(10);
//         DESCRIPTION      : String(200);
//         HIERARCICAL_TYPE : String(50);
//         TERM_TYPE        : String(50);  
//         CR_RESPONSE      : String(5000);
//         CREATION_DATE    : DateTime;
//         TO_CHANGE_LOG    : Association to one CONTRACT_TERM_UPDATELOG
//                                on TO_CHANGE_LOG.KEY_ID = KEY_ID;
// }

entity MASTER_STATUS {
    key CODE        : Integer;
        DESCRIPTION : String(50);
        ICON        : String(50);
}

entity SMTP_CONFIG {
    key SR_NO        : Integer;
        HOST         : String(100);
        PORT         : Integer;
        SECURE       : Boolean;
        SENDER_EMAIL : String(100);
        USERNAME     : String(100);
        PASSWORD     : String(100);
        CREATED_ON   : Timestamp;
}

entity MASTER_SUBACCOUNT {
    key SR_NO       : Integer;
        SUBACCOUNT  : String(50) not null;
        PORTAL_LINK : String(100);
}

// used to strore header data of CR with CTA status 
entity CONTRACT_REQUESTS_ASSIGNED {
    key UNIQUE_NAME      : String(100);
        EXTERNAL_ID      : String(100);
        TITLE            : String(100);
        PREPARER_ID      : String(100);
        REQUESTER_EMAIL  : String(100);
        VENDOR_ID        : String(100);
        VENDOR_NAME      : String(100);
        VENDOR_EMAIL     : String(100);
        PURCH_ORG        : String(10);
        COMPANY_CODE     : String(10);
        DESCRIPTION      : String(200);
        HIERARCICAL_TYPE : String(50);
        TERM_TYPE        : String(50);
        RELEASE_TYPE     : String(10);
        STATUS           : Integer;
        EFFECTIVE_DATE   : DateTime;
        EXPIRITION_DATE  : DateTime;
        CREATED_ON       : DateTime;
        UPDATED_ON       : DateTime;
        TO_STATUS        : Association to one MASTER_STATUS
                               on TO_STATUS.CODE = STATUS;
}

entity MASTER_USER_ROLE {
    key CODE        : String(25);
        DESCRIPTION : String(100);
        TYPE        : String(50);
}

// entity MASTER_REQUEST_EVENTS {
//     key CODE        : Integer;
//         DESCRIPTION : String(50);
//         TYPE        : String(25);
// }

entity MASTER_CONTRACT_REQUESTS_USERS {
    key SR_NO        : Integer;
        USER_ID      : String(50);
        USER_ROLE    : String(50);
        FIRST_NAME   : String(500);
        LAST_NAME    : String(500);
    key EMAIL        : String(150);
        COMPANY_CODE : String(500);
        EMP_NO       : String(100);
        CREATED_ON   : Timestamp;
        UPDATED_ON   : Timestamp;
        ACTIVE       : String(1);
        TO_USER_ROLE : Association to one MASTER_USER_ROLE
                           on TO_USER_ROLE.CODE = USER_ROLE;
}

entity MASTER_CONTRACT_REQUESTS_EVENTS {
    key CODE        : Integer;
        DESCRIPTION : String(50);
        TYPE        : String(25);
}

// used to strore CR process events 
entity CONTRACT_REQUESTS_EVENTS_LOG {

    key UNIQUE_NAME   : String(100);
    key EVENT_NO      : Integer;
        EVENT_CODE    : Integer;
        EVENT_TYPE    : String(20);
        USER_ID       : String(100);
        USER_NAME     : String(100);
        REMARK        : String(100);
        COMMENT       : String(1000);
        CREATED_ON    : Timestamp;
        TO_EVENT_INFO : Association to one MASTER_CONTRACT_REQUESTS_EVENTS
                            on TO_EVENT_INFO.CODE = EVENT_CODE;
}

// entity CONTRACT_TERM_SUPPLIER_MILESTONES {
//     key UNIQUE_NAME       : String(100);
//     key UNIQUE_NO         : Integer;
//         LINE_TYPE         : String(100);
//         TITLE             : String(100);//
//         DESCRIPTION       : String(200);
//         SUPPLIER_CONTACT  : String(100);//
//         NOTIFICATION_DAYS : Integer;//
//         MAX_AMOUNT        : String(100);
//         CURRENCY_CODE     : String(100);
//         CURRENCY_DESC     : String(100);
//         CREATION_DATE     : DateTime; //
//         SOURCE            : String(15);
//         CREATOR_ROLE      : String(15);
// }

entity MASTER_CTA_ATTACHMENTS {
    key SR_NO            : Integer;
    key ATTACH_CODE      : Integer;
        ATTACH_GROUP     : String(30);
        ATTACH_DESC      : String(100);
        FILE_NAME        : String(100);
        FILE_CONTENT     : LargeBinary;
        FILE_MIMETYPE    : String(100);
        FILE_TYPE        : String(100);
        UPLOADED_ON      : Timestamp;
        // ATTACH_TYPE_CODE : String(10); // remove this column
        // ATTACH_TYPE_DESC : String(100); // remove this column
}

//Pricing Terms development
entity MASTER_ACCOUNT_ASSIGNMENT {
    key ID          : String(4);
        NAME        : String(100);
        DESCRIPTION : String(100);
}


entity MASTER_CURRENCY {
    key ID          : String(4);
        NAME        : String(100);
        DESCRIPTION : String(100);
}

entity MASTER_COUNTRY {
    key ID          : String(4);
        NAME        : String(100);
        NATIONALITY : String(100);
        LOCALE_ID   : String(100);
}

entity MASTER_TIERED_PRICING_TYPES {
    key ID              : String(25);
        NAME            : String(100);
        DESCRIPTION     : String(100);
        TIER_TYPE       : String(100);
        TIER_VALUE_TYPE : String(100);
}

entity MASTER_TERM_BASED_PRICING_TYPES {
    key ID          : String(25);
        NAME        : String(100);
        DESCRIPTION : String(100);
}

entity MASTER_COST_CENTER {
    key ID          : String(10);
        NAME        : String(100);
        DESCRIPTION : String(100);
}

entity MASTER_GL_ACCOUNT {
    key ID          : String(10);
        NAME        : String(100);
        DESCRIPTION : String(100);
}

entity MASTER_LOCATION_ADDR {
    key ID          : String(4);
        NAME        : String(100);
        STREET      : String(100);
        STREET2     : String(100);
        STREET3     : String(100);
        CITY        : String(100);
        REGION      : String(100);
        COUNTRY     : String(100);
        POSTAL_CODE : String(25);
        PHONE       : String(25);
        FAX         : String(25);
        EMAIL_ADDR  : String(25);
}

// Pricing terms data capture

entity CR_LINEITEMS {
    key UNIQUE_NAME : String(100);
    key NUMBERINCOLLECTION : Integer;
    LINETYPE_CATEGORY : Integer;
    LINETYPE_NAME : String(100);
    LINETYPE_UNIQUENAME : String(100);
    TITLE             : String(100);// 
    SUPPLIER_CONTACT  : String(100);//
    NOTIFICATION_DAYS : Integer;//
    CREATION_DATE     : Timestamp;  // 
    AMOUNT : Decimal; 
    AMOUNT_CURRENCYUNIQUENAME : String(100);
    BILLINGADDRESS : String(100);
    HIDEAMOUNT : Boolean;
    HIDEUNITPRICE : Boolean;
    ISOBSOLETE : Boolean;
    ISRECURRING : Boolean;
    ITEMCATEGORY : String(100);
    DESCRIPTION : String(100);
    SUPPLIERPARTNUMBER : String(100);
    SUPPLIERPARTAUXILIARYID : String(100);
    COMMONCOMMODITYCODE_NAME : String(100);
    COMMONCOMMODITYCODE_UNIQUENAME : String(100);
    COMMONCOMMODITYCODE_DOMAIN : String(100);
    COMMODITYCODE_NAME : String(100);
    COMMODITYCODE_UNIQUENAME : String(100);
    UNITOFMEASURE_NAME : String(100);
    UNITOFMEASURE_UNIQUENAME : String(100);
    PRICE_AMOUNT : Decimal;   //parseFloat(aCRLineitems[0].MAXAMOUNTTOLERANCEPERCENT)
    PRICE_AMOUNT_CURRENCYUNIQUENAME : String(100);
    LIMITTYPE : String(100);
    MINAMOUNT_AMOUNT : Decimal;
    MINAMOUNT_CURRENCYUNIQUENAME : String(100);
    MAXAMOUNT_AMOUNT : Decimal;
    MAXAMOUNT_CURRENCYUNIQUENAME : String(100);
    MAXAMOUNTTOLERANCEPERCENT : Decimal;
    MINQUANTITY : Integer;
    MAXQUANTITY : Integer;
    MAXQUANTITYTOLERANCEPERCENT : Decimal;
    MINRELEASEAMOUNT_AMOUNT : Decimal;
    MINRELEASEAMOUNT_CURRENCYUNIQUENAME : String(100);
    MAXRELEASEAMOUNT_AMOUNT : Decimal;
    MAXRELEASEAMOUNT_CURRENCYUNIQUENAME : String(100);
    MINRELEASEQUANTITY : Integer;
    MAXRELEASEQUANTITY : Integer;
    MAXRELEASETOLERANCEPERCENT : Decimal;
    ISHARDRELEASEMINIMUM : Boolean;
    ISHARDRELEASEMAXIMUM : Boolean;
    ACCOUNTTYPE : String(100);
    SHIPTO : String(100);
    ACCOUNTCATEGORY : String(100);  
    SOURCE : String(15);
    CREATOR_ROLE : String(15); 
    SOURCE_TYPE : String(1);
    VERIFIERUSER_PASSWORDADAPTER : String(100);
    VERIFIERUSER_UNIQUENAME : String(100);
    VERIFIERUSER_NAME : String(100);
    STARTDATE : Timestamp;
    PARENTLINENUMBER : Integer;
    To_PricingTerms_PricingInfo: Composition of many PRICINGTERMS_PRICING_INFO on To_PricingTerms_PricingInfo.UNIQUE_NAME=UNIQUE_NAME;  
    To_PricingTerms_Accounting: Composition of many CR_LINEITEM_ACCOUNTING on To_PricingTerms_Accounting.UNIQUE_NAME=UNIQUE_NAME ; 
}

entity PRICINGTERMS_PRICING_INFO {
    key UNIQUE_NAME : String(100);
    key NUMBERINCOLLECTION : Integer;
    key UNIQUE_NUMBER : Integer;
    PRICINGTERMSTYPE : String(100);
    DISCOUNTEDPRICE_AMOUNT : Decimal;
    DISCOUNTEDPRICE_CURRENCYUNIQUENAME : String(100);
    DISCOUNTPERCENT : Decimal;
    AMOUNTCURRENCY_CURRENCYUNIQUENAME : String(100);
    ISTIERPRICINGCUMULATIVE : String(10);
    TIERTYPE : String(100);
    TIERVALUETYPE : String(100);
    TIEREDPRICINGSTEPS_MINTIERVALUE : Decimal;
    TIEREDPRICINGSTEPS_TIERVALUE : Decimal;
    PRICINGTIERS_DISCOUNTPERCENT : Decimal;
    PRICINGTIERS_STARTDATE : DateTime;
    PRICINGTIERS_DISCOUNTEDPRICESTARTDATE : DateTime;
    PRICINGTIERS_DISCOUNTEDPRICEAMOUNT : Decimal;
    PRICINGTIERS_DISCOUNTEDPRICECURRENCYUNIQUENAME : String(100);
}

entity CR_LINEITEM_ACCOUNTING {
    key UNIQUE_NAME : String(100);
    key NUMBERINCOLLECTION : Integer;
    key ACCOUNTINGS_NUMBERINCOLLECTION : Integer;
    GENERALLEDGER : String(100);
    COSTCENTER : String(100);
    INTERNALORDER : String(100);
    ACTIVITYNUMBER : String(100);
    AMOUNT : Decimal;
    AMOUNT_CURRENCYUNIQUENAME : String(100);
    ASSET : String(100);
    COMPANYCODE : String(100);
    NETWORK : String(100);
    PERCENTAGE : Decimal;
    QUANTITY : Decimal;
    TYPE_NAME : String(100);
    TYPE_UNIQUENAME : String(100);
    WBSELEMENT : String(100);   
}

entity ARIBA_API_CONFIG {
    key SR_NO : Integer;
    REALM : String(100);
    API_URL : String(100);
    API_KEY : String(100);
    USER : String(100);
    PASSWORD : String(100);
    CREATED_ON   : Timestamp;
}