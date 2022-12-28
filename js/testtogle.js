
 $(document).ready(function(){
  activaTab('aaa');
});

function activaTab(tab){
  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};   
