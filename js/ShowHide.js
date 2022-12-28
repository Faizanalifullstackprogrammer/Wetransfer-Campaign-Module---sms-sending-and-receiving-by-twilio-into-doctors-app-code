
jQuery(document).ready(function($) {
JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function (e, context) {
    callChangeFunction();
});
    callChangeFunction();
function callChangeFunction(){
        showHidField();
    // dropdown custom field change function
    $("#customfield_10625").change(function() {
        showHidField();
    });
        showHidSubTaskField();
    $("#customfield_10640").change(function() {
        showHidSubTaskField();
    });
  
}
  
function showHidField(){
    //drop down field selected value
    var dropDownFieldval =$.trim($("#customfield_10625 :selected").text());
    //test field1
        $("#customfield_10639").closest('div.field-group').hide();
    if(dropDownFieldval == 'Project'){
        $("#customfield_10639").closest('div.field-group').show();
    }if(dropDownFieldval == 'Release'){
        $("#customfield_10639").closest('div.field-group').show();
    }
}
function showHidSubTaskField(){
  
    //drop down field selected value
    var dropDownFieldval =$.trim($("#customfield_10640 :selected").text());
    //test field1
        $("#customfield_10645").closest('div.field-group').hide();
    if(dropDownFieldval == 'Project Audit'){
        $("#customfield_10645").closest('div.field-group').show();
    }if(dropDownFieldval == 'Release Audit'){
        $("#customfield_10645").closest('div.field-group').show();
    }
  
}
  
});
  
