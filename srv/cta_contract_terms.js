const cds = require('@sap/cds')
const dbClass = require("sap-hdbext-promisfied")
const hdbext = require("@sap/hdbext")
const connect = require('passport/lib/framework/connect')

const lib_ariba = require('./LIB/cta_ariba_api');
const lib_cta = require('./LIB/cta_library');
const lib_email = require('./LIB/cta_email_lib');
const lib_email_content = require('./LIB/cta_email_content');

module.exports = cds.service.impl(function (srv) {

    const {MasterCTAAttachments}=srv.entities;
    srv.after('READ',MasterCTAAttachments,async (req)=>{      
        try{     
            req[0].FILE_CONTENT="VlVWelJFSkNVVUZDWjBGSlFVRkJRVWxSUW1rM2NERnZXR2RGUVVGS1FVVkJRVUZVUVVGblExY3dUblppYmxKc1ltNVNabFpJYkhkYVdFNWtURzVvZEdKRFEybENRVWx2YjBGQlEwRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGRGMyeE5kRTkzZWtGUlVtWmtTUzlGVUd0TVZYSmpjMnRCU1U1bE1rTjRlRWx4VlZRM1FYaEtVRWR4YlU1aWJtMXNjQzgxTmtvcmVFSkRiMUpXY1U0M1JWTjZPWGczVFhaSVRtRk1TblZpWW1GRGFVMWhOMVZuZVV4blkycEJWbFkwWWs1NUwwWjRLM2RzZG5oaldtdHVTbUZYWlN0blJrSjBRVTFTYkdaWU5ERnRiWGREV1dOaVprUlZhbEpGTkZWR1MzSkNjRzlHVWxrclowOVBaREp6WkZkRlpDOUhkVkY1Y1ZkeFp6VjVUblpDTkVVMVZ6Tm9SVFI1Y1c1VVJVOVFVa1U1VW5GaFUydzNXSFpRYWt4VmEwVnBlVW8zTTBKYU1saHhWbEZKVm1oVVMxZEtVM1ZZVERac01IVXJZM2xwTkUwNVZtZFpkMHhsVFVsaFVYWlJOMlI2ZERoSGRUYzBNMGhyTURCSGNrdHdhWFpUY1ZkellWRmhlWFV2WmtaNE9HVnlPRzlxYjNZd1ZWQnhOazVvVm05WWVURmlibXREUWtsWlRGTXlRVUpSWVRSMU1FWnhNSGxpY3prNWVFUTRWbTh3ZWt3NFRVbG5NMlp6YkRSU1RXTjRUamhpV2t4eFpXbzFRbXRVYUdkcFlsTjZaM0JqWldWU1JUZzFUbmx4UTJaeFprbDVZbWMwZDBVdmRGbDRlRGhpY1dKU1FpdFJSVkptYWk5R1VGbFNObUp5ZW5kRlNWRjVZMEZvU2tneVNEZGxSRWsyVkhRM04wNUViRmMwVUhVNFdtSndabnBNSzBKblFVRXZMemhFUVVaQ1RFRjNVVlZCUVZsQlEwRkJRVUZEUlVGMFZsVjNTUzlSUVVGQlFrMUJaMEZCUTNkQlNVRnNPWGxhVjNoNlRIazFlVnBYZUhwSlMwbEZRV2xwWjBGQlNVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGTGVWTlVWUzlFVFVGNVJ6Y3dhamhvT0dvek1XUXlVVVZGU2t4a01FWkpkWGxHVldadlFrb3pRU3N4YW1GTmEwYzVNaTlLZUhkUlZrSnhSRUV3WkM5MldEYzRlWFIyWkZCSk0zRjVRMGd5TkdwVGMybDRTVlZQZVU4eVpEWXlSMnd2Y0hoa1VXTnhTbTVMVjFKdVIzTTBZMUZTWkhSWU1URm1ZVnBTTUhBMVMwaGhPV3A1Y1hKMVMybG9Vemh1Wmtrd1lsUTRWVk40UlUwNGRWWjRiMHBGTmxWamFHaFpPVzFaUm1GNGF6RmFNMjFNTkhKblNGWlJiRkIwY2xsaGQzUjZaV2MyY0ZCUWJUTXZXR3h4WW5CRVZDdEpUMVY2Y3pCd2ExWjVTRTVwV2psdGRXWk5hSE5KWmxnMVIyeFdWR0ZFYkhCelIwdGxZMnB2YVdWV09XdGlUVVI2VWtwMUwwVXZNVGhNVlRaamVVWkphVTVDVERSTmN6bEllSGxYWnpsWU9XRjBSRlI0ZVRVeE5YaEVZMHAzTm5aSk9FMXRRMmw0SzI4elowVkJRVkF2TDBGM1FsRlRkMDFGUmtGQlIwRkJaMEZCUVVGb1FVOVpTSGh2Vm1WQmQwRkJjV2RuUVVGQk9FRkJRVUkwWWtNNU0ySXpTbkpaYlRsMllYazFOR0pYZVhOV1YwWjJjWHBaVlM5VU5YQXZkMGcxVDNkVlZFbEJhM0ZtV1VsQlYzRlliVXRWY1hwa2NFMXhWbE0yV1Zsb1ZYZE5ObHBLT1daVUt5czJOR2hLVHpOTVRrZFdPVkUwYlU0M1kzWm9ia2gxVUhwbFYxaFlWbFp4Y2pGVE1HcE9ZeXQzYUdOdE1HMXBaRGh2ZWxaNmVqYzJabHBRYjAwMlV6RnJkRkZhUzFoc1RtWm1Va2RYTDFSc05uUmtaa3h5WkdOMlJIaDRMM0ZKUWxGT016WnhTa041T0ZGNWFsUlJkR0ZyWm1GRFRqZFRSMnhhZVV4cGEyZFphVzFsYW1KUlVXeFhWblJSUzNGMlUzTkZlbFJPVTNKRFlXcFJaMlZQU1dORVNqZHVURXRWVWxRM2RVc3hia2xCUldKUmEwVjFhVE5DVjNaaFJXRXhTM28wUjNKcFNHcHdSMm96YkZaUlRWRlVObmhyT0hFd1NGSldjVlpsZEdaUVRsSm1hM0ZSVkZwUEszaHZUM2RGTDBZdk4xbG9UVmxoTTNkU1RFbzJLM0ZYUTNBMGVUTk9OVUZrUkVkUlVIQkZVSHBaVG1wRUsydFpTR1ZoWnk5UFVXSkZVRkZXTmxweFpVZEJiRE5GSzNsalp6bFpOMmhGVFcxNkswNW9jMFpoZGxaak9GTk9ORzR3V25kRVRuZDBaRmhsWVhOd1NHVkVaRlJZVTA1R09VcHdVM0JXU1hFd2EzSlpkM3BLYlc1dGIzbHJUU3RhV1dWS01FTldOa3B4ZDFsNVYzTlhkRkJhZUVWVVJ6RmpTRTlMZDBWRWNVZ3hVVk5wY0hGSmRXMURNWGhMYzNSeFppdHpOMkp4YzFKalJrSjRUbkpoTDNCWWVIZFRSblpSVFZkQmFtNVJhM1JSYWxRck1rdDVSVXh5VWs5dGFubElkRmwyYlcxeWFGcGllazFuVDJ4RWVFaG1NV2xYU0ZobVZIZDZiamRyTVU5MkwzZFpRV3RXWm05T01FUjZkMGQxTlM4eFFTOHdhRVJsWVdKRFYwWkNkbVpZTUZFd2F5dHdZVGhSZEhGb2RVNXNLMVl4TlVSWWRraHJjMVUyUm1oNEt5OW9WRWN5ZHpOcmR6RXdUVXhDTjNFNWJVMWtOa1ZET1dOUVdXNXViMUpyUjJkU01HNDVibU5SU1RGM2RqVmhVMVI0WWpacFEzUndTRTV3VkhaYVIyeEtaSFZOUzA1eU1rOWFWV05oTXpoNk9YQmhkaXRvTWxwakt6WTBSWEUzVUhKcWRFWjBaVFo1T1VkdGNUZGxNVnB1Wms5emFqTmFjVmxGTkhrd2RETklRMjVrYldkamRITjJNemRPVFVadFFXWmpNamRFUVZSdVRTOVZZbHBqZDBkamNDdEJjSGhrY0ZNeFNIb3daMVpKTUZWRmNtY3diRmg2WjFwTWVHcHNUaTlVUVVzemRuUm1jVE4wY1RNMmRXZEZVbll4WTI0eVYzZHpjV1psU1dFMGVqTkdaSGhtUTNkc1dtSnZVMjExY2paM1JHc3ljbHB0UzI5RWREVXdPSEVyUWpSemVHOUpaSFJOTldsRFJIUXlUVW8wTlhWNksyRlhVSEpOYm14eU5uZEplWFF5Y0c1RlZXZzBOSEZyUkhKdGRtWXZhbk5QZFdRM2J6Tm1SRGhYZVVsRlNuVkNSV3htTkV0MWVuQnViRWxYYmtSVlNVRnFOSFpwWTJKUGNsQlJia0ZDUms4NFIwcGlkVTgxY1ZsbGFHRXJkRTlzUlhsalMxazBWM05hVFdONVUzSTFLMU5sVUcxd2JsSlFNREpLTjBkRFVIRjFNMXBxZWpOV1NuWjJXbmN5VVN0VVQzcHlPVWRJZW1WbGRFazFXRE12T1V3NFJqTnZURFpyY0RSYWJrNTVaRWRpYWpSMWRIZHplalI1T1dsVVpWQTVPRzAxZDJORmVXcEpUSG8wTkZBeFQzWm9la1V2T0hoMmMwdzBlRFJSWVdaalJsWXlPWFpWUjBjeGVUbFVZMEZCUVVRdkwzZE5RVlZGYzBSQ1FsRkJRbWRCU1VGQlFVRkpVVU5DVUhCVFdEaDNRVUZCVEc5RFFVRkJZVUZCWjBKbFIzZDJXRE5LYkdKSVRYWmtNamw1WVRKS2RtSXljM1ZsUnpGelRHNUtiR0pJVFdkdloxRkNTMHRCUVVGUlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVOelZXc3hUSGhFUVZGMlVYWXJhSHBDTTIweldWWkZaR3d3VEhsTWMxWmxjMUJEVFcwd1MyUnpiVWxVVGlzNVRqaGlTM0p3WkZkT1dreE1kMDUyYUc1dWRucGpaREk1ZWxWUE5HZE5WRGxqUlhKeFNXOVRRa2h2VkdKUE9EZENWeTlPT0Rnd1JFTkhUSFJ5VWpaRFVuZFZWRVYxZW5FMk5uWjBRM2MyWVdONFR6VlFjRXhKVEVvMFZVOVBZalJMUTFWYWFEWlBiVWxyVkRCMVpFdEhUa2R5VDAxSVZYbGhibEJSU0dOd1RsZGtOMHgwVDFOQksyOVNWRGRMTWtOMFRHVXpTVXB2Y0ZwMVdDOTFWVkJpT1dkaFptZHVhMll3WmsxYVExVnJPRVJZYTBFd1pXcFZTVk4yTkhkVldESkRVRXM0TDBkYVRtVmpOWEozWVZBMlJFOVZZM0V3YzJWeGFsVTVaa2xhTUVsSlprbFNlRGt2UzFwS2VqVmhTMXAxTVZoMk5GaFNReXM0YjNCMk9YWjVURTEyTURjeVltdDVZMlpXTTNkQlFVRlFMeTlCZDBKUlUzZE5SVVpCUVVkQlFXZEJRVUZCYUVGUVVrZDViekF3UVhkQlFXaG5aMEZCUW1kQlFVRkNOR0pET1ROaU0wcHlZekpvYkZwWVVucE1NMDV2V2xkV01FMVROVFJpVjNsamF6bDFUekpxUVZGb2RUaHlPVkl3Y3pONFVFaG5XRU5KUTB0MGNWWTJhbU5XVkRGbFJ6SmtRMHhQUzFreWRXRjNjWFp5ZFc1YVowVldhMHR4V1VKR05GUkVlbm92VkU5bGVXWjZjSEJIZEhsQlQzVlZZVmhNUzI4MVoxTmhTMUZ3Vmt4UVNqWlpMM1o1T0VkVlJYVmtSbFUwYW1GT1NrUlVWak5FTUdGbVNIaDNMM2h2TjA1YVZrRktOR2R2V0VVMWNtSjZabHBaZHpWWFdVVlhUR3BKTjJGUVEydE9SbGxNYWpNdmRHaHliV1JDVmtkRlNVWXlla3BKTjBoVVFYWldNRVJOYUhNdlkzZFVSbXR4UTFNNVJ6ZHFWVEF2WjNsNFZVRjFVQ3RpZEVzM1ZuaFFNQzlKWlc1Q1dqSjFPVGhPY0U1Rk4xSkxlRlp5Wm5oeVowWkxhVnBpWW1GT1RXRkxaRmt4TVc0dmFFbFRTRXQ1SzBVemQwNHJlR3gzZGsxaVNtRXlhMDVqTmxWUWEwbDVUeXRrT0Zjdk5rMTZXbWxSUmpsS2RDOVlaR2dyU1doYVQwdHBNbWRXWkZVNGNqWlZaVWh3YUVwV1psazRTakozT0ZGWVYxaHdaazQ1Y1hKSk5sb3JOQ3QzZWxFNGJtRktjakIwTHpsd1kzVTFiMWhEUkhKa1ZrVlJkR3hVYWk5NFlrcFdVWFJ3YVVnclptMXdORTlxWlRkSmExZzJNamxSWnk5VFFVZHdlVk5rYW5wWWVHMTRZbmg0VlN0cGNFaHZaMnRPVEVaT1MzSkJlbmhFV0dWbU1IVmFNM2N6TUVWRWRIbHFRVXhuY0hZNU56TmhUV2Q2TUVZd2MwdExUVmNyT1d3dlRqaFVUMjlVWlZaU1RuTlZlVEo2YmtwcGRHTllZMEpKU0VaSlYycEtSekp3TUhSVFNYZEtWbTlvVnpoaFdIRTRWM0F5UTFCeGRrRldOM0ZhVWsxck1UVlBhMW92YzJkaWJtdzJjR3hWYVV3emVtaDJPVFlyZWtaUE9XRmFaM1pqWVV0SGFEZDVkV2t2UVZobllVRjBRakpCVkhsT1NtcDVaVVJUWmpOeE5rcHVaMHRFZEVsbFVFaGplRGt6Umt4Uk9WcG1TbmRMY0UxUFozSmhTRmxIYkRNemFEUXlVSFJUUW5SbksyVlFXbnBDY2tsUFp6ZFRSSEJPVDB0cVQweFVlSFJ1VlhONlRVVXZRVUZCUVM4dk9FRkJRVVF2THpSNlV6WjNOa05KUW1sQk5GWjBhRmhGUVdNeFJYRklZa0pXY0ZoWldYcDBialZhUlRKa01UazRTRTFCTTNoME9Wa3ZRazA0WW1WRU1rZDFWMjVsY1RacGIzQXlkSE5FZEZSc2JVZEtiRGN4VW1rM2VXeExUVzVwZVhVMmRYcDVWWFJ5VlhWMWJIbFVSbU00ZDFaTVZYcDFOR042YWtoSWVVSTBXWFU1ZEV4TGEyZDJRbUZyTDFsbk9FWTRPRlZDUTNVMFRFSlZXR3RwZVUxVmMxTTRTMHRDU21ac1JrTnpabGhIUTFscVRVcFpkazVPUkZjeVVTOTRjelkzVEV0VVRXUnRORTFWWkd4WllsQm1Va1ZIZVVSaFMwNTNiekIwYVVaRmMzcDZhV3gzVmxKTVpVaHJZWFJRY25sM2RVTlRPREJEYVhobFpHZzRLMU5JYm0xVUsyNHlPRUZCUVVRdkwzZEJRVUZRTHk5emFXeEpWRVV2TVZSVGVFdDZPSGR5Vm5Ob1NsUlRkWGhXVkV4UlRURmtVMHROY0UxNk5FTjRVeTlKVEhkTFMyMVRaM0JLSzFOVmJDdGlhM2RZYTFweFdXdHdjVVZaYUc1eVMxTlJiSEE1WmtGMVVHOHlPVzV2YkN0aldGcFNaRzV3UzJGWE1rRkZRVUZCUkM4dmQwMUJWVVZ6UkVKQ1VVRkNaMEZKUVVGQlFVbFJRakZRY0d4d2EzZFpRVUZKZDJGQlFVRlVRVUZCUVdWSGQzWmtSMmhzWWxkVmRtUkhhR3hpVjFWNFRHNW9kR0pQZUZwWE5IWmlVbWhTSzB3dlVTOURUREEzZG10dGVYWmpVV0ppVG14UE1uVjNiVWxsZFdzMVNFWnphall6U21wcVVrZE5PVFpPUTFsSFUxQlFWMnhWUldoTVdIZHdPVFl3VFhCRVZGUlJNRXBtSzIxSlYwVk9kakJTVUZSUFUzSmFiakZQU25aTWNISlJiR0V4YVdzd1dHWlBaa2hRVHpCVVkxaFlZbmd3VERaaVQwVlZORFZaVlc1aWNsWTJiM1ZCTlU5NGJYaERhMnh1WW5aVVZXTnNTbkYxZDNkV1MwcHZhWGxDVEdaa1NtVmlkWEJrTWxCUU4zRkpaR3RUUlZrcmVVRm1ZMG96VlU1MVRtaEthblpzVFhRNFJFMHlTVmd5UW5wdVRVTjZTMVYwYWtwUFFUSnVXbFZ1UzFSdlIzWjZSWFF4ZVhGV2IwSjNhbXR5YUU5bmJVcDNaVE13TmtwWFVITkVTMVpNWkRObWJIWkZMMmhPYUVaalRtOTRjR1ZwUW1SWk9FNURXVk5sU0ZaWmJtZFRlRGRUTVVSc1EzUlBNVU5RZUU0eVVFMVVNMmhQZEZGNFFWVTRZVXh6VmpsbFpWZGtlU3RYTUZVMWRWSk5WVmRYT0RGMWIxQTFlWFU1ZUdkamJHaFVabUZoZWpCaWNGUjZMMDg1YjB4UU1uSjNRbFZpVDB3MmFsZzNVVVE1WWl0R1FVTk9lSHBFVTJwSmRuVXdLeXN5ZFdvd0wzZ3ljV2MzVGt4cGRUbG1iekZoYzBkWWRrNW1NeXRFWXpobFdGQjNRM1JSTlhRdlluZEJPRWRKVlZSU2QwTjBVV2gyWTNSTlYyNVZVWE12UVVzeFEwZEVlbUozYWxWeGJqVjZWVTEyUVVwR2JFTlRTRWNyYVV0SU9WUkVNVmRxV0d0RGJXcFdObnAzYkhVNFRrZHlXR05sV1VkRFlXeG9XR3dyZUdsNWFFdDRjbVJhYVdSS1pXeEJkMEpKU1VWWFEwcEpOVmw2ZGtWVmFtRkhTMUV3VkVwTFExaFBTSEJzUmxWSWFIcHNSRUZQZWxwV1lWcFdRM0IzTXk4MU9EbFRWbWxuYW1GM1ZXbDZiSEo1UVVOa09XOXJibmRqVUdzM1NsaE1WR1JVT0VkeWNUQkhaVkF6ZERJNGRrUndlV05PWmxSNE5EbFBibTQwWXprMk0yTnRXRmxZVlVoS1ZFeGtOeXRqVGxobU16TXpkV1pRYmt3NUt5OW1VSGd4TVhaV2NGQk9abmhNTXpjMk5ITldkblkzTDB0UVdYazBRMDFZZW1JMU5qaGxVSEpySzJKa1ppOTJTR3BaTkhZelZHOXdSMDl1ZUVsWmMzbGtZUzlxV1hWamJHbEhTME5HVUhnMmJHSXlXWGhxUWtGNFRFWkJSWFpwTW5VcmVVbDVaMDVsVjJsT2NIZFlWM2xIT0VoWlMwdHRUVVJZYkRkalRtSm5aVkpQYkVORlJYWlFWalpRV1VGUE5IcFNjbk56ZEZGaVozRjFlRXhwTDBKM2EyTjZjMjVoWTB4SVdHTlViMU5PWWpONVJrdHFRVlF6UmpOUFVWWXlTbnBIVldKWmIwaHRSRzlyVTJkSFZUWjNZMDlSZW1SdmFYaGFXRkl6UTBSSWFYVnJMMGRMWlU1elMzQjNOM2hQYTJsWlp6TkthMGw1VFZGcGNVMXljRUZaT0hKTE1FVlpVbFZITjBoYWRpc3hNRWRpVjA1MWIyVlFWRU5UT0VadmFHRjVRVGg0VG1OS05FZFRNRVZwYlRCMWFIbHBiV1Z6UkROclNXaHpTa0VyVnpaV2FrZzVZbTFCVkUwNGQxcFZOUzluYW0wek1sWjRVRmxpZUdFd2NTdERkM1JxVkhacksxaHpXV3hOUWxSdE1DdGtlRVJxVDI1SlNHcHpUVWw0VkZCeVduaEtSWFZ1V1ZRdloyaHNRMmg1WW1wQ2FHY3JPSG80ZHpKU09UVkJTR3hIZUU0NU1qSkRhbGhUWmt4UlV6TlJSbmd4VTJ0WFFubERaVXd4U2t4TWVUVnBXamNyVDFOVWFFWlhTMmRRWVdJd2FEWlVTa2w2T1dZeVZYTjJkaTlxVEV4aVRtWnZZMDVPTTNVclJqTlZka3BOVXpaNmRERTFXbE5IWWpoUU9VSTFWemRvZUdKS1JGRjNkbmtyWWswNVZVYzBVSGRwTXlzM09GZzNiVE4yT0hadVRHUmhTRkZKVGpkR1Yyd3lkRE5QVDNSREwyTndiMlpTUVV4RGJtVTBNbkowZW0xR1pXMW5lV2RWVnpCeE1VMDFlWFphUjJKU00wTmFZbmhOVFRORGVFWjVjMXBLYldacFRXbFBaMmRSYms1Wk5FWm1WazV1VkVkak9XTjZOM04zV21nelZ5OWhiRmxpV1c1NlMzUTViemxNVDBvNVRuTnVNbkU1VjNFelNuUnROSE5IVWt0T2IzSXZjbTlrT1dodmFWRjNaVTVaWnlzeVpIRTVNblJVVHpGV01UUlNhMHhhZGxGclRISjZRMUpTZERWQ2IzSkNiMmhETmpocGIxVmFNa3hwZUdGR2FGcE9ObGcyVm5Gc1ZWY3hOa1ZCWVhWMWMzZE5URXBuWlZaWE1pOVhPVGRDZDBGMGJGTkpORzl1VFZVeldXdHpUWEYxVkUwMk5WcHVjR0pOUzJ4bFFXSkRTMWRHVmtGclpXMVhOVXh3TVdWSVNqQlhZVzA1VW5GWlRrVnNjVFZ0VTFNd1RXOTZVVUpQWmxaeFVpdGpia2RsZFZjd1ZrdEVXRzk1Umt0MU0yOWhSRkpoVERaUVdFVnpVazloVlU1T1RrZFdaMmxpVDJOa2MwNDJhalpqYWxrelVuWlBNVTlaWkRoUWJDOUZZMkZ2Wmt4Q1V5dHBUWHBuT0VjMGN6QmxLMGhtVW14dWJVdFNZemw0UzAxek5FVndNRTFxVjBscFkwTndVVEJ1WTJSMVdIY3hPVlpCUlRaVmFHbHNkVEZDYjB4M2NubFlXRUZzYmpWME5VZEVjRXAwU25oMFRYQklaM001TjFaeFRHcElVakpEZDNGbVlWbFlNWEZVU2k5bE4wTXdXa0YwU1Rrd1JUQlBXRnBIWkVwSVpWSkdRbWxtY1UxeFFYcG5hRWhKTlM5eGJHc3dTbmRVVDAwNVpFTldkRlJtY1ZscmNHd3hNemxSUmtoV1ZVNWhUelpFZUVNcldYbHBhVE5yUjFaNVN6WndjVkIxTVdwSVVUZDJTWGhSTUVFelVYcHBZWGxSYmpKdVYyWmtjelprY1VkVWJFNU9TWE0xTURGQlZrOVhkbUY0WmxRNVZHWkpZWEV5U1ZOT1ZtaHNNSEV5TWtSaWVsRjFkRnBMTmpaQ1VYSmlVRVZIWWxCMVlUQjNTVWR5VjJsTk5FOWhXa3gzY0hjeFMzbzRNV0ZVTW1wcmRVTk1Va2xDUm5acGRIQTBhbkpLUmpReU5XdG1OMFUxV0hKYWQyZFdkWFJMVm1acWNYYzBaaXRpV1V0T04yOUtORGxQUVZWbFJVVkdWalp0UlV4M09IQm5hMVptWkc4MlkzbFJZVGhKZG1SRmRtdGhSVXN5WlZKcmNsbzNkaXRLTTNaTVJHMW9ObFpMTUNzcldIWk1jRmhMVkZnNVZISXpWVGhtTVRaMFpUbFlTemN4ZFRkUlJrMU1RMHRMY1RNM01qQlhWVUZDTVVZd2JWZzVObFZsTUdKdU1TOXBNVlp1WW1oVVIweDVNSGc1V0dscmNqUjFjbnBUTjFjeUwyWlBURkV3UWpBM1oyVXhVV0YyWlRabllXeFdjakI2UzBodE9XSnlVRlZEYjA1MWNWSmxSV3BrTm1kR0wzSk9NWFZEUWpaNGQzQnpUbVZ3YURFM1VXSTFZVU5oYUdsWGRrdEJhVFpVWkdKd1dWcFljVE5YT0ZKeFpsbzVlbTlRT0cxVlRXcEVlVlJxZW5kWFJVWTNSbUV2WkhaQlFVRkJMeTg0UkVGR1FreEJkMUZWUVVGWlFVTkJRVUZCUTBWQmFIZFJlblpxT0VSQlFVUkxRMUZCUVVSUlFVRkJTR2h6VEROT01HVlhlR3hqZVRVMFlsZDZSVlowZFU4eWVtZE5abE1yZHk5NVJHOHpaVkJNTWtkclV6SkRObUY1VW1kdk1FTXdWMjFHYldkeU5HOTBTakJLTVUxWFVtd3hkV3hwTHpjeWEwdzBhMGd3TWpWdWNIa3pNa3BhUlc5cGFuZHJSSGx0Ym1KNmIyeDVVVTh6Y2xSQk5tOHJSbFpSUVc1WWNHRnRSVE50WmpCNkwzWkRWekZNVTA5eFdYSktiek50UjFRemVHeHlOMHBtTTNWV2RIVTBheXRrTWtKak1HWkJhRWMwZW1WdVEzVlhablFyVjNnMk5GbDFNbFpoWW1sSGF6bHdXWGhTZUhNM1pEVjJSemgwV2pGbFNXeEtaakJ2UTBKaEsxbHJURlIzWTBwaGJHTTRlRzl3YWpsa1IzazRNSEZwUjA5aVJWUlZjbWhVWWpSelUxWmhOMlkzWWxkNFlrTmpRbUZvWmtkeVExSmtkVXhCVWpabGVtdHdTbU1yT0dGT1JXRlZNWEpoYm1OR1pHNHhWREUyVEd0VUswZDFMMHBZVUhsdmMyeHpVSGQ1VXpKSWFVSTVSMm95UkhZM1VXdDFlR0l2YlVSM1VFeFNVRXN5VG1ScE1IQjZWa2MzYWtWWlFVWkdUM2N2Y1ZST1dEZHlRVWsyYW5keFNsZHVOMWRtZVhkRFVrbFJkWEp1WVZkdGEzTmpVa0kyVTBKNmRsVlJlbmhSWlU1SGVXSkdlbWR3VlhFMWExTTRhbE5KU1hoVU1ERlNOekZzU1VSamJ6bENTRWhCVDJGUVRqSm9NV2t2TXpGaWRITjNZV1ZSWTNCaFFsRmFRMjVSUWxoSWNsTTNaMnhKZW5Jck1VMUViMWR3WnpsUlFWcHFjalp5ZG1KbWMwWkZZa28zU1V4bVR6UlJiMnBoTW1kcE5tSmpXREJQWVVJeFIyVlRiRFEzZVVsRlZpdDNVQ3RQT1ZCQk56ZzBORUl3ZWt3d01IRjNkbVJHVFZsMGNXMUhMMDlpTUVnelVXRkNiREZDTW1sVmNWVTFRMVkzZW1wV1ZWbFlZMWs0UmxoWmQyVnVjVmhtV1N0dGFGQkZjMlJKUlN0SmJqWlZMMEpRWlM5NEwyRTVUa2t2TlVKMFlWVllUVzgzZWxCUVNDdHNlRU0zU2xOMVNuWnhiME4xV0dWUllUVm9Ua05MZG5CNVdIZGFWbmRQTlZKdk1sZE5ZVFYwWTBneWVrZDZPRWx5VDJ0eE9DOHlMM2wxYjBWUFlrRmxTblYzY0hCSGJsUmpPVlppVUU1b0x6RmhTM1pXV1dOYWQxbEhSR1F3SzJKTmJrSlhVRVZhVVhOWmVHZFNWSEoxWkdKV016ZzBURmROVWl0bFNrdFlTbmhDZDBkc01FRXZSSEJCVjB4UGRrRmpURm9yUTJkdVQwSnNLMHB4UTJWQ1JrUXlSMkpqWlUxbGRrMUZXVXA2VG5GTlpqaEtiVlZOTVZNM2J6VkNUelpMSzNkRGJYaFhNMWxYYmtGV1lrWTBXbEJZVFM5cWMwSlZTM1psVFRKUE1IUXlaa1I2VGpaWFppOVBTek5HVld0SmFGSTJkeTk0V1VaNGRrbHhUMWc1V0hWalYzVkZRMlptUkU5MlZ6bG9lazFCTDA5V2NWSXdZamwyVGpZNVdESTVjMms0Y0dKQ1duVnVSakY2ZW5oV2MyeHRObmxZZUhwWFlUZE1WbHBDUms1Nk9FMHpkRFJtSzBSYU4ySTRWR2RJYUdoMlJ6UnNVRTAxTWtSSVdVVm1NMlZTV2xoVE1rZGxSRE4yUVZoWll5dDVjbUZDUnpoVVkweEJTelkyUkRCSmMxaGlUMnQwUmpsbFNsWjVVbWgwUmpORmJUbDFhMU5IWWxscmVHTXJlalJGWm1oelRrUnFLME5VZEZKUFMxTTJSMjVYYXpCV2JXdDFhRk5NUkRsc2VVUTRjVkpNS3pWVFRYTXZkMGxCUVZBdkwwRjNRbEZUZDAxRlJrRkJSMEZCWjBGQlFVRm9RVTFDUXpKMlJYWkJVVUZCVUdkSlFVRkNVVUZCUVVJMFlrTTVlbUZIUm5sYVYxSlVaRWhLY0dKdFpIcE1ibWgwWWtoNFV6SXdja1ZOUWtJNVJpOTVTRWxsT1hVeFozTnBNRzVoVWt4WmIxQjVjMHQxU0RWQ2RIQTVkRUZyYjIxYWNXSndMMkkwY1drd2IwdFFZemcxWTNwemJFcHpabkozUkhRMGQzTmhWbEZ4ZGxCR1ZXZEhSMmhzYjJKRWNWWTJNbVF5WmpOVGFHZE5ZVVV4YW1kTFZ6WnZhWE5XZEZod1UyTkZjMnRIWTBSc05tOVlhV0prWVdNNVQycE9OM2xuYVVORmVraFRWblpLU21ad2IwUnJiVTVETXpOcFQwdGtkbXhuZFhJM1ZUTk9hV2h2WVVGcFV6Y3hOSEJIU1VvNVNGaEVPVVJXZVhGeGJVSmlSbFpKT1hSdlYxZHhkRUpxT1ZsWWMzSkVhV05uYWxaNWF6SjVWVGRIVGt0aVdXTlpibU5WUldGM2NHbEhjRzU1ZW5sVE1uTTBNRnBhTmtVeVVqVTBNak5RYkZJeFVsSmtSSGx1YkhSNmNtMTBaVEZOZW1jdk5XbzJORWhTTTNacWNHMTBablIyVldObmNIRmpUVEpzYldWMlJDdERSUzlYU1ZWMVQwSTNjRVZJYW1GVldrdzFNbUV6ZURBclRHVllSV2xVYzJOUVUwRnBOREZFZDNkbk1VOW9VVVUyVWtWVGRtTk5aV00wYjBsUk0xSnJlR2t2ZUdVeEwyNHZTM1JRUVVGQlFTOHZPRVJCUmtKTVFYZFJWVUZCV1VGRFFVRkJRVU5GUVRGWksyTjVjVEJDUVVGQk1rRjNRVUZGVVVGSlFWZFNkbGt4UW5saU0wSjZUREpPZG1OdFZYVmxSekZ6U1V0SlJVRlRhV2RCUVVWQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVdaS1NsSmlPWE5uUlUxbVprb3ZWVGRYVEhjM1dVdG1jRWx3VXpRd2JISnNjVnBWYlVwa1QyMTJWa2MwU21sM01rbE1hbFU1VkRjNVRVVTJZMXBMY2paNGRETTVLMWhJTXpWNFlqTTNNREprZGxsRlVESndiMnhMVTJGTldrZERhMVprY0hOc0sxUklXbkJZVUZOU1dsRkhRMVp4WVRKQ1NrOW5hbXQyY25JMWMzQkRUMU1yZG1oMU4yTlBVRWR2U1ZkVFUxcDNTMVppYTJneWFUUTFVVWQxV1U1SGFFVnNWVzFHYURoMFlqUlNSMFZQTDNCVk4wbDJaR2REVEZKdE4yOTNNbWRWUVVsR04xbEhOVWMwYm10cFJsSjVVa3h4UkhKNFRrRlRVVzh4VGtkQmR6QkhTbE13VEUxWGQxUm1hSGQzZFhCamNVWnpUa2haZFhwdVVuTTVOVXQwTlVaQll6RmxPVUpxT0VzeVlsTm1kRTVNVlZJcmVTOXZjaXRsYm1SU2J6RXhObUl6VTJkTGNFWnJjSGt4Um1oRWRHRkVibGw2ZVVaM09ITm1hMFJwYTNoNVFWZHdRV1ZDTVd4amNqUm1PRU50UjNkMFQyZERWbUp3T1V0MlpXdzNOa1p5Y2xaWmFVRnhlV2RUUmtGVWNIUmpVRFJzVVZBclMyaElWblJSYWpSSVVDOHlWbGxRTmpGc1ZuSnlaRkZQZDJrMU4ycE1PSFI2UmpjMGVGQjRVREZVTDNFMFZUTXpSM3BKT0dWdk5sVlVTalJQZGxsUVMyOXJkRGc0VUZKVksxUnNPV1ZPZVhOVFJsZDVXWEJoZW5VMWVrNU9jMWRqUmpFNU5YbFlOek56TVROa056RXdZa1Z6TW5oNU1DdEtOVmN6VHpWdWJrcE9iWHBQY0hsWFpucHBOa2xLTUVOV1JteFZaMkpMTTNab2RtSnNSMHRWWkU1b2FWaGhTVEJEUkRCa1VIQm1NR2RrWW01d01WUTRRVUZCUkM4dmQwMUJWVVZ6UkVKQ1VVRkNaMEZKUVVGQlFVbFJRM0phYWpSbGJYZEZRVUZGVFVSQlFVRlJRVUZuUWxwSE9XcFZTRXAyWTBoTmRsbFlRbmRNYm1oMFlrTkRhVUpCUlc5dlFVRkNRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVRktlVlIzVnpkaVRVRjVSemQzVURKRWIySjFhbHA0ZFV0SldrRldja2RzUnpOd1dYTlJRa295ZWsxdU1EZEdVVmQ2U2tWT2Eyb3lPVXRPZERGSVZ6WnVXRzlxSzFKUEwxQnNTMU4xVkRZeVZGaGlRVkpFTmtkUmFUQllkV052ZDNWR2FqWnpReTlWTDJVM1NIaFNaVlpGVlUxdmIxbHJRa016VmtOVmRHWXlOSGRsZWxOaVNFUjRRalJ3UlRSMFFXaGhjVnAxTlZoWE5VZHdjMmRTV1dsQ01VZHhiVVp3WjFOa1RtVjRObko1UkcwcmFXVXlOSGh6VERkTk9IbDFUbEk0V2xGWmJtNVNWRmxhY1dSR2QyUXJUREp0V2xoUk9VaDZNM05VY0RCQlZ5OVBNVFo0Y25ablIxWkxaU3RrWkdsb1VYSjZjalJtU0ZSYVIzb3dWV3BrUm5Rd2VqaHVlbmxsV2tkNk1VOTZaR1JFWjFkdmVIUkNVVEpvTUdFNFJtTTBkbEZNTWpCRVVIQkZNVUl4TkdRd1NFWk5SMlpyTDNOeVdreHNaakJIZDJnMmJsVkJaRWxJWjBsTVZuUTRNa3ByVUdOa1RWUktVSE5pTUZKRVZXbHJPVWhUVFVKaFNHTk9ORGRxTHpGdWRYaDNZVXBFYUhZM1FURkhSVUpJVDBWWVpXVkhObEptTVZGWlV5ODBaRFJQVTJObFIwVmlaVVZYWm1JNE5ERnVlblp0UjJ0bFYydE9PVFV6UlVkRFVGTlpVWEJYYzJVeVp6TkRVekJvVkRrNVQwZEtOM0owWkhaQlNFZHNkekptUmpneU1taHZVMnhZVFhBd1FURlFRak5OY0hsVmVVMXRNekpVVkM5aWFtNHJXbFJUZFc5aGQzZ3ZURVkwYkN0b1puazBVRFExSzNkNU5uUkdMMmx0V0d4NlEzSkhaak0ySzNVeFprRkJRVUV2THpoRVFVWkNURUZSU1hSQlFsRkJRbWRCU1VGQlFVRkpVVUpwTjNBeGIxaG5SVUZCU2tGRlFVRkJWRUZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQ1lsRXlPWFZrUjFaMVpFWTVWV1ZZUW14ak1UQjFaVWN4YzFWRmMwSkJhVEJCUmtGQlIwRkJaMEZCUVVGb1FVeFdWazFEVURCQlFVRkJWRUZKUVVGQmMwRkJRVUZCUVVGQlFVRkJRVUZCUVVGQmJIZE5RVUZHT1hsYVYzaDZUSGsxZVZwWGVIcFZSWE5DUVdrd1FVWkJRVWRCUVdkQlFVRkJhRUZQV1VoNGIxWmxRWGRCUVhGblowRkJRVGhCUVVGQlFVRkJRVUZCUVVGQlFVRkJRWFpCV1VGQlNHaHpURE5rZG1OdGRHbGlNamx5VEc1b2RHSkdRa3hCVVVsMFFVSlJRVUpuUVVsQlFVRkJTVkZEUWxCd1UxZzRkMEZCUVV4dlEwRkJRV0ZCUVVGQlFVRkJRVUZCUVVGQlFVRkJRVVZqUzBGQlFqUmlRemxtWTIxV2MyTjVPVE5pTTBweVdXMDVkbUY1TlRSaVYzZDFZMjFXYzJNeFFreEJVVWwwUVVKUlFVSm5RVWxCUVVGQlNWRkVNRkp6Y1U1T1FVMUJRVWxaU1VGQlFWbEJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVaHZUVUZCUWpSaVF6a3pZak5LY21NeWFHeGFXRko2VEROT2IxcFhWakJOVXpVMFlsZDRVVk4zUlVOTVVVRlZRVUZaUVVOQlFVRkJRMFZCWkZRMldtRmFUVWRCUVVOTlIyZEJRVVYzUVVGQlFVRkJRVUZCUVVGQlFVRkJRVVJyUkhkQlFXVkhkM1prUjJoc1lsZFZkbVJIYUd4aVYxVjRURzVvZEdKR1FreEJVVWwwUVVKUlFVSm5RVWxCUVVGQlNWRkRTRUpFVHl0UWQwMUJRVTF2U2tGQlFVNUJRVUZCUVVGQlFVRkJRVUZCUVVGQlFVdG5WMEZCUWpSaVF6bDZaRWhzYzFwWVRYVmxSekZ6VlVWelFrRnBNRUZHUVVGSFFVRm5RVUZCUVdoQlRVSkRNblpGZGtGUlFVRlFaMGxCUVVKUlFVRkJRVUZCUVVGQlFVRkJRVUZCUVVGRmFHOUJRVWhvYzB3elRtOVpXRXBzV2taT01HTnRiSFZhTTAxMVpVY3hjMVZGYzBKQmFUQkJSa0ZCUjBGQlowRkJRVUZvUVU1WFVHNU5jWFJCVVVGQlRtZE5RVUZDUlVGQlFVRkJRVUZCUVVGQlFVRkJRVUZCWTNoelFVRkhVblpaTVVKNVlqTkNla3d5VG5aamJWVjFaVWN4YzFWRmMwSkJhVEJCUmtGQlIwRkJaMEZCUVVGb1FVdDBiVkJvTm1KQlVVRkJVWGROUVVGQ1FVRkJRVUZCUVVGQlFVRkJRVUZCUVVGQlZuZzBRVUZIVW5aWk1VSjVZak5DZWt3eVJuZGpRelUwWWxkNFVWTjNWVWRCUVVGQlFVRnZRVU5uUTBGQlowRkJTME5GUVVGQlFVRT0=";  
        }catch(oError){

        }   
    })

    this.on('PostContractRequests',async(req)=>{
        try{

            var 
            connection = "";
            oCrData = "";
            sBuyerEmail = "";
            sSupplierEmail = "";
            oEmailContent = "";
            oEmailResponse = "";

            let sResponse,Result,responseObj,Message;
            const client = await dbClass.createConnectionFromEnv();
            const dbConn = new dbClass(client);   
            
            const {
                sAction,
                sReleaseType,
                aContractReqAssignData,
                aCRlineitemsData,
                aPricingTermsPricingInfoData,
                aCRlineitemAccountingData,
                aEventsData  
                   
            } = req.data;
             
            
            var aContractReqData =[];
            var aCRlineitemMilestoneData =[];
            var aCRlineitemAccMilestonedata =[];
            var aEventLogData = [];
            var varsAction = req.data.sAction;
            var sUniqueName = "";

            if (varsAction == "CREATE"){
                var lv_unique_name = aContractReqAssignData[0].UNIQUE_NAME;
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CTA_POST_LINEITEM_DATA');   
    
                sResponse = await dbConn.callProcedurePromisified(loadProc,   
                    [varsAction,lv_unique_name,sReleaseType,aContractReqAssignData, aCRlineitemsData,aPricingTermsPricingInfoData, aCRlineitemAccountingData,aEventsData]
                );
                Result = sResponse.outputScalar;
    
                if (Result.OUT_SUCCESS !== null) {
                    Message = Result.OUT_SUCCESS || "";
    
                    connection = await cds.connect.to('db');
                    oCrData = aContractReqAssignData[0];
                    sBuyerEmail = oCrData.REQUESTER_EMAIL || "";
                    sSupplierEmail = oCrData.VENDOR_EMAIL || "";
                    oEmailContent = await lib_email_content._getEmailContent(connection, varsAction, aContractReqAssignData[0]) || ";"
                    oEmailResponse = await lib_email.sendEmail([sSupplierEmail], [sBuyerEmail], "html", oEmailContent.subject, oEmailContent.emailBody) || {};
                }
                else {
                    Message = "CR submission failed."
                }
                responseObj = {
                    "Message": Message  
                };
                req.reply(responseObj);
            }
            else if (varsAction === "VENDOR_UPDATE"){
                
                var lv_unique_name = aCRlineitemsData[0].UNIQUE_NAME;
                
                const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CTA_POST_LINEITEM_DATA');   
    
                sResponse = await dbConn.callProcedurePromisified(loadProc,   
                    [varsAction,lv_unique_name,sReleaseType,aContractReqAssignData, aCRlineitemsData,aPricingTermsPricingInfoData, aCRlineitemAccountingData,aEventsData]
                );
                Result = sResponse.outputScalar;
    
                if (Result.OUT_SUCCESS !== null) {
                    Message = Result.OUT_SUCCESS || "";
    
                    connection = await cds.connect.to('db');
                    oCrData = aContractReqAssignData[0];
                    sBuyerEmail = oCrData.REQUESTER_EMAIL || "";
                    sSupplierEmail = oCrData.VENDOR_EMAIL || "";
                    oEmailContent = await lib_email_content._getEmailContent(connection, varsAction, aContractReqAssignData[0]) || ";"
                    oEmailResponse = await lib_email.sendEmail([sSupplierEmail], [sBuyerEmail], "html", oEmailContent.subject, oEmailContent.emailBody) || {};
                }
                else {
                    Message = "CR updation failed."
                }
                responseObj = {
                    "Message": Message 
                };
                req.reply(responseObj);
            }
    
            else if (varsAction === "SEND_BACK" || varsAction === "BUYER_APPROVAL" || varsAction === "DELETE_CR_DATA") {
                if (aContractReqAssignData.length > 0) { //-----------------------------------------------------------------------------
    
                    aContractReqData = aContractReqAssignData || [];
                    // aReqMilestoneData = [];
                    var aEventLogData = aEventsData || [];
                    var lv_unique_name = aContractReqAssignData[0].UNIQUE_NAME;
    
                    const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CTA_POST_LINEITEM_DATA');
                    sResponse = await dbConn.callProcedurePromisified(loadProc,
                        [varsAction,lv_unique_name,sReleaseType,aContractReqAssignData, aCRlineitemsData,aPricingTermsPricingInfoData, aCRlineitemAccountingData,aEventsData]
                    );
    
                    Result = sResponse.outputScalar;
                    //Create response message
                    Message = null;
                    if (Result.OUT_SUCCESS !== null) {
                        Message = Result.OUT_SUCCESS || "";
    
                        if (varsAction !== "DELETE_CR_DATA") {
                            connection = await cds.connect.to('db');
                            oCrData = aContractReqData[0];
                            sBuyerEmail = oCrData.REQUESTER_EMAIL || "";
                            sSupplierEmail = oCrData.VENDOR_EMAIL || "";
                            var sToEmail = "";
                            if (varsAction === "SEND_BACK") sToEmail = sSupplierEmail;
                            else if (varsAction === "BUYER_APPROVAL") sToEmail = sBuyerEmail;
                            else if (varsAction === "BUYER_APPROVAL") sToEmail = sBuyerEmail;
    
                            oEmailContent = await lib_email_content._getEmailContent(connection, varsAction, aContractReqData[0]) || ";"
                            oEmailResponse = await lib_email.sendEmail([sToEmail], [], "html", oEmailContent.subject, oEmailContent.emailBody) || {};
                        }
                    }
                    else {
                        Message = "CR submission failed.";
                    }
                    responseObj = {
                        "Message": Message
                    };
                    req.reply(responseObj);
                }
            }
            else if (varsAction === "PUBLISH") {
                if (aContractReqAssignData.length > 0) { //-----------------------------------------------------------------------------
    
                        aContractReqData = aContractReqAssignData || [];
                        aCRlineitemMilestoneData = aCRlineitemsData || [];
                        aCRlineitemAccMilestonedata = aCRlineitemAccountingData || [];

                        aEventLogData = aEventsData || []; 
                        sUniqueName = aContractReqAssignData[0].UNIQUE_NAME;
                        let sAction="";
    
                        let connection = await cds.connect.to('db');

                        let aAPIConfig = await lib_ariba._getAPIConfig(connection);
                        let sRealm = aAPIConfig.REALM;
                        let sApiKey = aAPIConfig.API_KEY;

                        var oToken = await lib_ariba._getAribaToken() || "";
                        var oCrCreateResponse = null;
                        var oCrUpdateResponse = null;
                        var oMilestoneObj = null;
                        var aCreateMilestone = [];
                        var aUpdateMilestone = [];
                        var aCrCreateMilestonePayload = null;
                        var aCrUpdateMilestonePayload = null;
                        // var aCreateMilestone = 0;
                        // var aUpdateMilestone = 0;

                        var aCrMilestones = await lib_ariba._getCrLineitemsFromHana(connection, sUniqueName) || [];
                        

                        for (let index = 0; index < aCrMilestones.length; index++) {

                            oMilestoneObj = aCrMilestones[index];

                            if(oMilestoneObj.SOURCE === "ARIBA") {
                                aUpdateMilestone.push(oMilestoneObj);
                            } else if (oMilestoneObj.SOURCE === "CTA"){
                                aCreateMilestone.push(oMilestoneObj);
                            }
                        }
                        
                        // Update existing milestones on Ariba
                        if (aUpdateMilestone.length > 0) {
                            aCrUpdateMilestonePayload = await lib_ariba._getCrLineitemPayload(aUpdateMilestone,sAction) || [];
                            await lib_ariba.sleep(500);
                            oCrUpdateResponse = await lib_ariba._UpdateContractRequestsLineItems(oToken, sRealm, sApiKey, sUniqueName, aCrUpdateMilestonePayload) || [];
                        }
                        // throw("sdfghjk");
                        // Create existing milestones on Ariba
                        if (aCreateMilestone.length  > 0) {
                            aCrCreateMilestonePayload = await lib_ariba._getCrLineitemPayload(aCreateMilestone,sAction) || [];
                            await lib_ariba.sleep(500);
                            oCrCreateResponse = await lib_ariba._PostNewContractRequestsLineItems(oToken, sRealm, sApiKey, sUniqueName, aCrCreateMilestonePayload) || [];
                        }
                        
                        var bSuccess = false;
                        if ((oCrUpdateResponse && oCrUpdateResponse.status === "200") && (oCrCreateResponse && oCrCreateResponse.status === "200")) {
                            bSuccess = true;
                        } else if (((aUpdateMilestone.length > 0 && oCrUpdateResponse && oCrUpdateResponse.status === "200") && (aCreateMilestone.length === 0)) ) {
                            bSuccess = true;
                        } else if (((aCreateMilestone.length > 0 && oCrCreateResponse && oCrCreateResponse.status === "200") && (aUpdateMilestone.length === 0)) ) {
                            bSuccess = true;
                        }
    
    
                        if (bSuccess) {
                            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CTA_POST_LINEITEM_DATA');
                            sResponse = await dbConn.callProcedurePromisified(loadProc,
                                [varsAction,sUniqueName,sReleaseType,aContractReqAssignData, [], [],[],aEventsData]
                            );
    
                            Result = sResponse.outputScalar;
                            //Create response message
                            Message=null;
                            if (Result.OUT_SUCCESS !== null) {
                                Message = Result.OUT_SUCCESS || "";
    
                                connection = await cds.connect.to('db');
                                oCrData = aContractReqData[0];
                                sBuyerEmail = oCrData.REQUESTER_EMAIL || "";
                                sSupplierEmail = oCrData.VENDOR_EMAIL || "";
                                oEmailContent = await lib_email_content._getEmailContent(connection, varsAction, aContractReqData[0]) || ";"
                                oEmailResponse = await lib_email.sendEmail([sSupplierEmail], [sBuyerEmail], "html", oEmailContent.subject, oEmailContent.emailBody) || {};
                            }
                            else {
                                Message = "CR submission failed.";
                            }
                        } else {
                            throw oCrUpdateResponse || oCrCreateResponse;
                        }
    
                        responseObj = {
                            "Message": Message,
                            "CreateResponse": oCrCreateResponse || [],
                            "UpdateResponse": oCrUpdateResponse || []
                        };
    
                    } else {
                        throw { message: "CR milestone content is missing in the payload data." };
                    }
                } else {
                    throw { message: "Invalid or No Action Found" };
                }
    
                req.reply(responseObj);
             
        
    }
        catch(error){
            // Result = {
            //     // OUT_ERROR_CODE: null,
            //     OUT_ERROR_MESSAGE: error.message ? error.message : error
            // }
            if(error.message[0].message)
                {
                    var vMsg = error.message[0].message
                }
                else{
                    var vMsg = error.message;
                    
                }
            req.error({ code: "500", message: vMsg });
        }

    }),
    this.on('GetContractRequestsLineItems', async (req) => {
        try {

            var sDocId = req.data.sDocId || "";
            var bIncludeHeader = req.data.bHeader || false;
            
            var bIncludeEventsLog = req.data.bEventsLog || false;
            var bIncludeHanaLineitem = req.data.bHanaLineitem || false;
            var sAction = "Get";


            if (sDocId === "") {
                throw { message: "DocId is missing" };
            }
            let connection = await cds.connect.to('db');

            let aAPIConfig = await lib_ariba._getAPIConfig(connection);
            let sRealm = aAPIConfig.REALM;
            let sApiKey = aAPIConfig.API_KEY;


            var oToken = await lib_ariba._getAribaToken() || "";
            

            var oCrDataResponse = await lib_ariba._getContractRequestsLineItems(oToken, sRealm, sApiKey, sDocId) || { "LineItems": [] };
            var responseObj = [];
 
            if (bIncludeHeader) {
                await lib_ariba.sleep(2000);
                var oCrHeaderResponse = await lib_ariba._getContractRequests(oToken, sRealm, sApiKey, [sDocId], "") || [];
                var aFilteredCrDataResponse = await lib_cta._getCurrentStatus(connection, oCrHeaderResponse) || [];
                oCrDataResponse.Header = aFilteredCrDataResponse[0];
            }
            
            if (bIncludeHanaLineitem) {
                var aCrLineitem = await lib_ariba._getCrLineitemsFromHana(connection, sDocId) || [];
                var aCrGetPricingTermsPayload = await lib_ariba._getCrLineitemPayload(aCrLineitem,sAction) || [];
                oCrDataResponse.HANA_Lineitem = aCrGetPricingTermsPayload;
            }

            if (bIncludeEventsLog) {
                var oCrEventsLog = await lib_cta._getCrEventsLog(connection, sDocId) || [];
                oCrDataResponse.CR_EventsLog = oCrEventsLog;
            }

            if (oCrDataResponse.LineItems.length >= 0) { //-----------------------------------------------------------------------------
                responseObj = oCrDataResponse;
            }

            return responseObj;

        } catch (error) {
            Result = {
                // OUT_ERROR_CODE: null,
                OUT_ERROR_MESSAGE: error.message ? error.message : error
            }

            req.error({ code: "500", message: error.message ? error.message : error });
        }
    }),
    this.on('GetContractRequests', async (req) => {
        try {

            var aCrData = JSON.parse(req.data.aFilters) || [];
            var sStatusString = req.data.sStatusString || '';

            

            connection = await cds.connect.to('db');

            let aAPIConfig = await lib_ariba._getAPIConfig(connection);
            let sRealm = aAPIConfig.REALM;
            let sApiKey = aAPIConfig.API_KEY;
            
            // let sStatusString = "";
            // let sStatusString = "Composing";

            var oToken = await lib_ariba._getAribaToken() || "";

            var oCrDataResponse = await lib_ariba._getContractRequests(oToken, sRealm, sApiKey, aCrData, sStatusString) || "";
            var responseObj = [];

            if (oCrDataResponse.value.length > 0) { //-----------------------------------------------------------------------------
                var aFilteredCrDataResponse = await lib_cta._getCurrentStatus(connection, oCrDataResponse) || [];
                responseObj = aFilteredCrDataResponse;
            }
            else {
                throw { message: "No Contract Requests found." };
            }

            req.reply(responseObj);

        } catch (error) {
            Result = {
                // OUT_ERROR_CODE: null,
                OUT_ERROR_MESSAGE: error.message ? error.message : error
            }

            req.error({ code: "500", message: error.message ? error.message : error });
        }
    })
    

    this.on('PostExcelAttachments',async (req)=>{
        try{
            const client = await dbClass.createConnectionFromEnv();
            const dbConn = new dbClass(client);                  
            const {
                sAction,
                aMasterCTAAttachments   
            } = req.data;
                  
            const loadProc = await dbConn.loadProcedurePromisified(hdbext, null, 'CTA_POST_ATTACHMENTS');   

            sResponse = await dbConn.callProcedurePromisified(loadProc,   
                [sAction, aMasterCTAAttachments]
            );
            Result = sResponse.outputScalar;
            Message="Excel sheet posted successfully"
            responseObj = {
                // "Message": Message,
                "results": Result   
            };
            req.reply(responseObj);
        }
        catch(error){
            Result={
                OUT_ERROR_MESSAGE: error.message ? error.message : error
            }
            req.error({ code:"500", message :error.message ? error.message : error});
        }
    })

})