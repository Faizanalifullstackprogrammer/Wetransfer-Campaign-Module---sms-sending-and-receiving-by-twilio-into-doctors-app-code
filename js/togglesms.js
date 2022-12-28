window.onload = function () {
    document.getElementById('sendsmsbutton').disabled = false;
};

$(document).ready(function () {
    $('.btn-toggle').click(function () {
        $(this).find('.btn').toggleClass('active');
        if ($(this).find('.selecprim').size() > 0) {
            $(this).find('.btn').toggleClass('selecprim');
        }
        $(this).find('.btn').toggleClass('btn-default');
    });
});

$(function () {
    $('#grp-btn').on('click', function () {
        $('.group-country_mob').hide();
        $('#grp-toggle').show();
        $('#MessageType').val(2);
        $('#variablesDiv').show();
        $('#ContactNo').val('');
    });
    $('#single-btn').on('click', function () {
        $('.group-country_mob').show();
        $('#grp-toggle').hide();
        $('#MessageType').val(1);
        $('#variablesDiv').hide();
    });
});

function beginPaging(args) {
    var mtype = document.getElementById("MessageType").value;
    var msg = document.getElementById("MessageText").value;
    if (msg == '' || msg == null) {
        $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Message is required.</span><div class=\"cls\"></div></div>");
        document.getElementById('MessageText').focus();
        return false;
    }
    if (mtype == 1) {
        var countryid = document.getElementById("CountryId").value;
        var mob = document.getElementById("ContactNo").value;
        var mobile = mob.trim();
        if (countryid == null || countryid == 0) {
            $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Select Country.</span><div class=\"cls\"></div></div>");
            document.getElementById('CountryId').focus();
            return false;
        }
        if (mobile == '' || mobile == null) {
            $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Enter Contact Number.</span><div class=\"cls\"></div></div>");
            document.getElementById('ContactNo').focus();
            return false;
        }
    }
    if (mtype == 2) {
        var groupids = document.getElementById("SendGroupId").value;
        if (groupids == '' || groupids == null) {
            $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Select Group.</span><div class=\"cls\"></div></div>");
            document.getElementById('SendGroupId').focus();
            return false;
        }
        else { return true; }
    }
    $('#loading').show();
    // Animate
    $('#alerts').fadeOut('normal');
}

function successPaging(data) {
    var message = data;
    if (message.indexOf("Success!smghtyruhgfgb") != -1) {
        message = message.replace('Success!smghtyruhgfgb', 'Success!');
        var preMcount = document.getElementById('TotalMassage').value;
        var prevMcost = document.getElementById('EstimatedCost').value;
        var chgCost = prevMcost / preMcount;
        document.getElementById('TotalMassage').value = 1;
        document.getElementById('EstimatedCost').value = chgCost;
        $('#estMsg').html('Total Message : 1');
        $('#estCost').html('Estimated Cost : $' + chgCost);
        $('#campCost').val(chgCost);
    }
    if (message.indexOf("Success!gmpsmsejuyjjd") != -1) {
        message = message.replace('Success!gmpsmsejuyjjd', 'Success!');
        document.getElementById('TotalMassage').value = 0;
        document.getElementById('EstimatedCost').value = 0;
        document.getElementById('SendGroupId').value = ',';
        $('#estMsg').html('Total Message : 0');
        $('#estCost').html('Estimated Cost : $ 0 ');
        $('#campCost').val(0);
    }

    if (message.indexOf("Success") != -1) {
        document.getElementById("ContactNo").value = '';
        if (document.getElementById("MessageTextHiddenType").value != '1') {
            document.getElementById("MessageText").value = '';
            $('#messagecount').text("0 Characters | 1 SMS(s)");
            document.getElementById('MCounts').value = 1;
        }
    }
    else {
    }

    $('.chzn-container li.search-choice').remove();
    $(".chzn-results li").removeClass("result-selected");
    $(".chzn-results li").addClass("active-result");
    document.getElementById('SendGroupId').value = ',';
    $('#SendGroupId').val('').trigger('chosen:updated');

    // to update dashboard balance
    var cookies = document.cookie;
    var arr = cookies.split('&');
    var bal = "";
    for (var i = 0; i < arr.length; i++)
        if (arr[i].indexOf("CustomerFund") != -1) { bal = arr[i]; }
    bal = bal.replace('CustomerFund=', '');
    $('#dashboradbalance').html('Balance : $ ' + bal);

    $('#loading').hide();
    $('#alerts').html(message);
    // Animate
    $('#alerts').fadeIn('normal');
    $('a').tooltip();
}

function failurePaging() {
    alert("Error ! Please Try Again.");
}

function begindelete(args) {
    // Animate
    $('#alerts').fadeOut('normal');
}

$(".chzn-select").chosen();
$(".chzn-select-deselect").chosen({ allow_single_deselect: true });

var someDate = new Date();
jQuery(function ($) {

    $('#hdnMsgCount').val(1);

    $.ajax({
        cache: false,
        type: "GET",
        url: "/appv2/Message/GetServerTime",
        async: false,
        data: {},
        success: function (data) {
            if (data != null && data !== "") {
                var parsedDate = new Date(parseInt(data.substr(6)));
                someDate = parsedDate;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert('Failed to retrieve states.');

        }
    });

    //$('#datetimepicker').datetimepicker({
    //    maskInput: true,
    //    startDate: someDate,
    //    pickSeconds: false,
    //    startTime: '13:00'
    //});

    $('#SendTime').datetimepicker({
        footer: true,
        modal: true,
        format: 'yyyy-mm-dd HH:MM',
        value: '2022-01-09 19:27',
        mode: 'ampm',
        change: function (e) {
            document.getElementById('SendOn').checked = true;
        },
        datepicker: {
            disableDates:  function (date) {
                var currentDate = new Date();
                currentDate.setDate(currentDate.getDate() - 1);
                return date >= currentDate ? true : false;
            }
        }
    });

    //$('#datetimepicker').datetimepicker({
    //    maskInput: true,
    //    pickSeconds: false,
    //    pickTime: false,
    //    format: '01/MM/yyyy',
    //    viewMode: 1,
    //    minViewMode: 1
    //});

    GetBalance(1);
});


function isUnicode() {
    var text = $('#MessageText').val();
    if (text != '') {
        $('#MessageText').val(
            text.replace(/’/g, "'")
            .replace(/…/g, "...")
            .replace(/”/g, "\"")
            .replace(/“/g, "\"")
            .replace(/ /g, " ")
            .replace(/：/g, ": ")
            .replace(/‼️/g, "!!")
            .replace(/–/g, "-")
            .replace(/·/g, ".")
            .replace(/​/g, "")
            .replace(/‪/g, "")
            .replace(/‬/g, "")
            .replace(/‭/g, "")
            .replace(/•/g, "*")
            .replace(/‘/g, "'")
            .replace(/	/g, " ")
            .replace(/—/g, "-"));
    }
    var UnicodeFound = false;
    s = $('#MessageText').val();
    var ascii = s.charCodeAt(s.length - 1);

    //for (var i = 0, n = s.length; i < n; i++) {
    //    if (s.charCodeAt(i) > 127) {
    //        UnicodeFound = true;
    //    }
    //}

    var regexp = new RegExp("^[A-Za-z0-9 \\r\\n@£$¥èéùìòÇØø¤Åå\u0394_\u03A6\u0393\u039B\u03A9\u03A0\u03A8\u03A3\u0398\u039EÆæßÉ!\"#$%&'()*+,\\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\\\\\[~\\]|\u20AC]*$");

    UnicodeFound = !regexp.test(s);

    if (UnicodeFound) {
        document.getElementById("isunicodespan").innerHTML = "| UNICODE ";
        $('#isunicodespanhidden').val('1');
        // count again for unicode sms

        var WordCount = (160 - s.length);
        var MessageLength = s.length;
        //if (MessageLength > 160) { return false; }
        var doubleChars = ['{', '}', '|', '^', '[', ']', '~', '€', '\\'];
        var MessageLength = 0;
        for (i = 0; i < s.length; i++) {
            var found = $.inArray(s[i], doubleChars);
            if (found != -1) {
                MessageLength = MessageLength + 2;
            }
            else {
                MessageLength = MessageLength + 1;
            }
        }
        var c = 0;
        if (MessageLength > 70){
            c = MessageLength / 67.00;
        }
        else {
            c = MessageLength / 70.00;
        }
        c = Math.ceil(c);
        /* CHECK FOR MULTIPLE SMS */
        //if (s.length > 160) { MessageLength = (68 * c) - s.length; } else { MessageLength = (160 - s.length); }
        document.getElementById('MCounts').value = c;
        var totalmsg = document.getElementById('TotalMassage').value;
        var totalcost = document.getElementById('EstimatedCost').value;
        var ctotalmsg = c * totalmsg;
        var ctotalcost = parseFloat((c * totalcost).toFixed(4));
        $('#messagecount').text(MessageLength + " Characters | " + c + " SMS(s)");
        $('#estMsg').html('Total Message : ' + ctotalmsg);
        $('#estCost').html('Estimated Cost : $ ' + ctotalcost);
        $('#campCost').val(ctotalcost);
        $('#hdnMsgCount').val(c);
    }
    else {
        document.getElementById("isunicodespan").innerHTML = "";
        $('#isunicodespanhidden').val('0');
        // count again for unicode sms

        var msgs = $('#MessageText').val();
        var doublesFound = 0;

        var SMScntOld = 1;

        var doubleChars = ['{', '}', '|', '^', '[', ']', '~', '€', '\\'];

        var MessageLength = 0;
        for (i = 0; i < msgs.length; i++) {
            var found = $.inArray(msgs[i], doubleChars);
            if (found != -1) {
                MessageLength = MessageLength + 2;
                doublesFound = doublesFound + 1;
            }
            else {
                MessageLength = MessageLength + 1;
            }
        }

        var xSMSCount = 0;
        if (MessageLength > 160) {
            xSMSCount= MessageLength / 153.00;
        }
        else {
            xSMSCount = MessageLength / 160.00;
        }
        xSMSCount = Math.ceil(xSMSCount);
        if (xSMSCount == 0) xSMSCount++;

        document.getElementById('MCounts').value = xSMSCount;
        var totalmsg = document.getElementById('TotalMassage').value;
        var totalcost = document.getElementById('EstimatedCost').value;
        var ctotalmsg = xSMSCount * totalmsg;
        var ctotalcost = parseFloat((xSMSCount * totalcost).toFixed(4));
        $('#messagecount').text(MessageLength + " Characters | " + xSMSCount + " SMS(s)");
        $('#estMsg').html('Total Message : ' + ctotalmsg);
        $('#estCost').html('Estimated Cost : $ ' + ctotalcost);
        $('#campCost').val(ctotalcost);
        $('#hdnMsgCount').val(xSMSCount);
    }
}

function datepicRadioselect() {
    document.getElementById('SendOn').checked = true;
}

function getprice() {
    var selectedID = document.getElementById('CountryId').value;
    var count = document.getElementById('MCounts').value;
    if (selectedID != '' || selectedID != null) {
        $.ajax({
            type: "Get",
            url: '/appv2/Message/GetCountryPrice',
            data: { id: selectedID },
            dataType: 'json',
            success: function (data) {
                var price = data.price * count;
                document.getElementById('TotalMassage').value = 1;
                document.getElementById('EstimatedCost').value = data.price;
                $('#estMsg').html('Total Message : ' + count);
                $('#estCost').html('Estimated Cost : $ ' + price);
                $('#campCost').val(price);
            },
            error: function (data) {
            }
        });
    }
    else {
        $('#estMsg').html('Total Message : 0');
        $('#estCost').html('Estimated Cost : $ 0');
        $('#campCost').val(0);
    }
};

function getgroupprice() {
    var selectedID = ',';
    var count = document.getElementById('MCounts').value;
    var array = $('#SendGroupId').val();
    if (array != null) {
        for (i = 0; i < array.length; i++)
        { selectedID += array[i] + ','; }
    }
    if (selectedID != ',' || selectedID != null) {
        $.ajax({
            type: "Get",
            url: '/appv2/Message/GetGroupPrice',
            data: { ids: selectedID },
            dataType: 'json',
            success: function (data) {
                var msgcount = count * data.msgCount;
                var costcount = count * data.msgCost;
                var UScount = count * data.msgUSCount;
                var UScountAvail = count * data.msgUSAvail;
                document.getElementById('TotalMassage').value = data.msgCount;
                document.getElementById('EstimatedCost').value = data.msgCost;
                $('#estMsg').html('Total Message : ' + msgcount);
                $('#estCost').html('Estimated Cost : $ ' + costcount);
                $('#campCost').val(costcount);
                document.getElementById('TotalUSMsg').value = UScount;
                document.getElementById('TotalAvailUS').value = UScountAvail;
            },
            error: function (data) {
            }
        });
    }
    else {
        $('#estMsg').html('Total Message : 0');
        $('#estCost').html('Estimated Cost : $ 0');
        $('#campCost').val(0);
    }
};

function getvariables() {
    var selectedID = document.getElementById('Variables').value;
    if (selectedID == '1') { insertAtCursor("@FirstName"); }
    if (selectedID == '2') { insertAtCursor("@LastName"); }
    if (selectedID == '3') { insertAtCursor("@ContactNumber"); }
    if (selectedID == '4') { insertAtCursor("@CF1"); }
    if (selectedID == '5') { insertAtCursor("@CF2"); }
    if (selectedID == '6') { insertAtCursor("@CF3"); }
    if (selectedID == '7') { insertAtCursor("@CF4"); }
    if (selectedID == '8') { insertAtCursor("@CF5"); }
}

function insertAtCursor(text) {
    var field = document.getElementById("MessageText");

    if (document.selection) {
        var range = document.selection.createRange();

        if (!range || range.parentElement() != field) {
            field.focus();
            range = field.createTextRange();
            range.collapse(false);
        }
        range.text = text;
        range.collapse(false);
        range.select();
    } else {
        field.focus();
        var val = field.value;
        var selStart = field.selectionStart;
        var caretPos = selStart + text.length;
        field.value = val.slice(0, selStart) + text + val.slice(field.selectionEnd);
        field.setSelectionRange(caretPos, caretPos);
    }
}

function totalcount() {
    var val = $('#isunicodespanhidden').val();
    var msgcountpresent = $('#TotalMassage').val();
    if (val == 0) {
        var text = $('#MessageText').val();
        var messageequal = 0;
        $.ajax({
            type: "Get",
            url: '/appv2/Message/EnglishMessageCount',
            data: { msg: text },
            dataType: 'json',
            success: function(data) {
                alert(data);
                messageequal = data;
                var price = data.price * count;
                document.getElementById('TotalMassage').value = count;
                document.getElementById('EstimatedCost').value = price;
                $('#estMsg').html('Total Message : ' + count);
                $('#estCost').html('Estimated Cost : $ ' + price);
                $('#campCost').val(price);
            },
            error: function(data) {
                alert('error');
            }
        });
        alert('total count');
        $('#ComposeForm').submit();
    } else {
        $('#ComposeForm').submit();
    }
}

function SendSms() {
    var CustomerBalance = $('#hdnCustomerBalance').val();
    var CampCost = parseFloat($('#campCost').val());
    var balance = parseFloat(CustomerBalance);
    var USCount = parseFloat($('#TotalUSMsg').val());
    var USAvailCount = parseFloat($('#TotalAvailUS').val());
    if (CampCost > balance) {
        $('#myModalLabel').html('Campaign Cost Exceeds');
        $('#costModalSpan').html('Your campaign cost (<b>$' + CampCost + '</b>) exceeds your current balance : <b>$' + balance + '</b>.');
        $('#CostExceedModal').modal('show');
        $("#CostExceedModal").removeData("validator");
        $("#CostExceedModal").removeData("unobtrusiveValidation");
        $.validator.unobtrusive.parse("#CostExceedModal");
    } else {
        var msgCount = $('#hdnMsgCount').val();
        //msgCount = msgCount.replace("Total Message : ", "");
        if (msgCount != "1") {
            $('#myModalLabel').html('Message Count');
            $('#costModalSpan').html('Your message length is more than 160 characters and you will be charged as ' + msgCount + ' messages. Do you want to continue? ');
            $('#CostExceedModal').modal('show');
            $("#CostExceedModal").removeData("validator");
            $("#CostExceedModal").removeData("unobtrusiveValidation");
            $.validator.unobtrusive.parse("#CostExceedModal");
        } else {
$('#ComposeForm').submit();            }
    }
}

//function ShowDemoMsg() {
//    $('#myModalLabel').html('Demo Account');
//    $('#costModalSpan').html('Your account is currently on trial mode so your messages will contain "[EXPERTTEXTING DEMO]" inserted randomly. To send a fully custom message, please upgrade your account to a paid one by adding credit by clicking <a href="/Payment">here</a>.');
//    $('#CostExceedModal').modal('show');
//    $("#CostExceedModal").removeData("validator");
//    $("#CostExceedModal").removeData("unobtrusiveValidation");
//    $.validator.unobtrusive.parse("#CostExceedModal");
//}

function SendAnyway() {
    $('#ComposeForm').submit();
}

function ShowTimeZone() {
    $('#loading').show();
    $.ajax({
        url: "/appv2/Message/TimeZone",
        data: {  },
        type: 'Get',
        success: function (result) {
            $("#timeZoneForm").html(result);
            $('#timeZoneForm').modal('show');
            $('#loading').hide();
        },
        error: function () {
            alert("Error");
            $('#loading').hide();
        }
    });
}

function showPopup(name, heading, message) {
    if (heading != '') {
        $('#' + name).find('h4').html(heading);
    }
    if (message != '') {
        $('#' + name).find('p').html(message);
    }
    $('#' + name).modal('show');
}

function hidePopup(name) {
    $('#' + name).modal('hide');
}

function SendTestMessage() {
    if (document.getElementById("MessageText").value !== "") {
        $('#loading').show();
        var msg = document.getElementById("MessageText").value;
        var senderId = $('#SenderId').val();
        if (senderId == '') {
            senderId = 0;
        }
        $.ajax({
            url: "/appv2/Message/SendTestMessage",
            data: { "messageText": msg, "senderId": senderId },
            type: 'Get',
            success: function (result) {
                hidePopup('PreviewConfirmation');
                $('#loading').hide();
                $('#alerts').html('<div class=\"alert fade in\" style=\"background:#13a51a;color:#ffffff\"> <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>  <span id=\"alertmessage\"><strong>Success!</strong> Preview message has been sent successfully to your registered cell number.</span> </div>');
            },
            error: function () {
                hidePopup('PreviewConfirmation');
                $('#loading').hide();
                $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Unable to process your request. Try again!</span><div class=\"cls\"></div></div>");
            }
        });
    } else {
        hidePopup('PreviewConfirmation');
        $('#alerts').html("<div class=\"alert fade in\"><button data-dismiss=\"alert\" class=\"close\" type=\"button\">x</button> <span id=\"alertmessage\"><strong>Info!</strong> Please add some message text first!</span><div class=\"cls\"></div></div>");
        return false;
    }
}

function GetBalance(type) {
    $.ajax({
        url: "/appv2/Dashboard/GetCustomerBalance",
        data: { type: type },
        type: 'Get',
        success: function (result) {
            if (result.indexOf("|") >= 0) {
                var arr = result.split('|');
                $("#blncText").html(arr[0]);
                $("#dashboradbalance").html(arr[1]);
            }
            else {
                $("#dashboradbalance").html(result);
                result = result.replace("Balance : $", "");
                $('#hdnCustomerBalance').val(result);
            }
        },
        error: function() {
            alert("Error");
        }
    });
}

$("#SelectedTemplateCode").change(function () {
    var templateName = $(this).find("option:selected").text();
    if (templateName != '-- Select Template --') {
        var templateCode = $(this).find("option:selected").val();
        $('#loading').show();
        $.ajax({
            url: "/appv2/Message/GetCustomerTemplate",
            data: { "id": templateCode },
            type: 'Get',
            success: function (result) {
                $('#loading').hide();
                $('#MessageText').val(result);
                $('#MessageText').keyup();
            },
            error: function () {
                $('#loading').hide();
                showPopup('error', '', '');
            }
        });
    }
});





