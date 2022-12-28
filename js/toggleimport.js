function beginPaging(args) {
    // Animate
    $('#importHistoryContainer').fadeOut('normal');
    $("#loading").show();
}

function successPaging() {
    $("#loading").hide();
    // Animate
    $('#importHistoryContainer').fadeIn('normal');
    $('a').tooltip();
}

function failurePaging() {
    alert("Could not retrieve list.");
}