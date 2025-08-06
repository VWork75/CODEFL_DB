using {CTA} from '../db/CTA_DB';

service contractTermsService {
    entity CRlineitems as projection on CTA.CR_LINEITEMS;
    entity PricingTermsPricingInfo as projection on CTA.PRICINGTERMS_PRICING_INFO;
    entity CRlineitemAccounting as projection on CTA.CR_LINEITEM_ACCOUNTING; 

    entity MasterCTAAttachments as projection on CTA.MASTER_CTA_ATTACHMENTS;
    
    entity ContractRequestsAssigned as projection on CTA.CONTRACT_REQUESTS_ASSIGNED;
    entity ContractRequestsEventsLog as projection on CTA.CONTRACT_REQUESTS_EVENTS_LOG;

    entity UsersMaster as projection on CTA.MASTER_CONTRACT_REQUESTS_USERS;
    entity EventsMaster as projection on CTA.MASTER_CONTRACT_REQUESTS_EVENTS;
    entity StatusMaster as projection on CTA.MASTER_STATUS;
    entity RoleMaster as projection on CTA.MASTER_USER_ROLE;

    entity AccountAssignmentMaster as projection on CTA.MASTER_ACCOUNT_ASSIGNMENT;
    entity CostCenterMaster as projection on CTA.MASTER_COST_CENTER;
    entity GlAccountMaster as projection on CTA.MASTER_GL_ACCOUNT;
    entity CurrencyMaster as projection on CTA.MASTER_CURRENCY;
    entity CountryMaster as projection on CTA.MASTER_COUNTRY;
    entity TieredPricingTypesMaster as projection on CTA.MASTER_TIERED_PRICING_TYPES;
    entity TermBasedPricingTypesMaster as projection on CTA.MASTER_TERM_BASED_PRICING_TYPES;
    entity LocationAddressMaster as projection on CTA.MASTER_LOCATION_ADDR;


    action PostContractRequests(sAction:String,sReleaseType:String,aContractReqAssignData : many ContractRequestsAssigned, aCRlineitemsData:many CRlineitems,aPricingTermsPricingInfoData: many PricingTermsPricingInfo,aCRlineitemAccountingData: many CRlineitemAccounting, aEventsData: many ContractRequestsEventsLog) returns many String;
    function GetContractRequestsLineItems(sDocId: String, bHeader: Boolean,bHanaLineitem:Boolean,  bEventsLog: Boolean) returns many String;
    action PostExcelAttachments(sAction : String, aMasterCTAAttachments: many MasterCTAAttachments)returns String;
    function GetContractRequests(aFilters: many String, sStatusString : String) returns many String;



}