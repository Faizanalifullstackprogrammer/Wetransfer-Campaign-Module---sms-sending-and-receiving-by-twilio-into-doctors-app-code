
dow.onload = function () {
    document.getElementById('sendsmsbutton').disabled = false;
};

$(document).ready(function () {
    $('.nav-tabs').click(function () {
        $(this).find('.tab1').toggleClass('active');
        if ($(this).find('.toto').size() > 0) {
            $(this).find('.tab1').toggleClass('toto');
        }
        $(this).find('.tab1').toggleClass('tabdefo');
    });
});


  $(function () {
    $('#aSearch').on('click', function () {
        $("#importHistoryContainer").html(response)
        $('#ManageDiv').hide();
        $('#SearchDiv').show();
        $('#liManage').removeClass('active');
        $('#liSearch').addClass('active');
    });

  
  
    $('#aManage').on('click', function () {
        $('.group-country_mob').show();
        $('#grp-toggle').hide();
        $('#MessageType').val(1);
        $('#variablesDiv').hide();
    });
});