function viewExcel() {
    $('#viewExcelfile').modal('show');
}

function viewCsv() {
    $('#viewCsvfile').modal('show');
}


function SubmitUpload() {
    if (document.getElementById('termcheck').checked && document.getElementById('ddgroup').value != '') {
        $('#alerts').html("");
        $("#loading").show();
        $('#UploadForm').submit();
    } else {
        $("#loading").show();
        if (document.getElementById('termcheck').checked) {
            $('#alerts')
                .html(
                    "<div class=\"alert fade in\" style=\"background:#f43857;color:#ffffff\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Error ! </strong> Please Select Group to Upload contacts!</span><div class=\"cls\"></div></div>");
        } else {
            $('#alerts')
                .html(
                    "<div class=\"alert fade in\" style=\"background:#f43857;color:#ffffff\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Error ! </strong> Please Accept Terms & Conditions!</span><div class=\"cls\"></div></div>");
        }
        $("#loading").hide();
    }
};



$('#NumberNotInFormat').click(function () {
    $('#FormatDiv').show();
});

$("#closeBtn").on('click',
    function () {
        $("#myModal").modal('hide');
    })

$('#NumberInFormat').click(function () {
    $('#FormatDiv').hide();
});

$(document).ready(function () {
    $("#NumberFormat").prop("checked", false);

    $('#SearchDiv').hide();

    $(function () {
        $('#aManage').on('click',
            function () {
                $('#ManageDiv').show();
                $('#SearchDiv').hide();
                $('#liManage').addClass('active');
                $('#liSearch').removeClass('active');
            });

        $('#aSearch').on('click',
            function (response) {
                $.get(window.location.pathname,
                    function (response) {
                        $("#importHistoryContainer").html(response)
                        $('#ManageDiv').hide();
                        $('#SearchDiv').show();
                        $('#liManage').removeClass('active');
                        $('#liSearch').addClass('active');
                    })

            });
    });


});