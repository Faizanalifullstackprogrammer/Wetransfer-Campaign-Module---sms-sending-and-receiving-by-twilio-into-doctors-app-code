<script type="text/javascript" defer="defer">
    google.load("visualization", "1", { packages: ["corechart"] });
    google.setOnLoadCallback(function () { fetchlinedata(); });

    function fetchlinedata() {
        $.ajax({
            type: "Get",
            url: '/appv2/Dashboard/_FillLineChart',
            data: { 'dayscount': 30 },
            dataType: 'JSON',
            async: true,
            success: function (data) {
                if (data.msg == "success") {
                var data1 = new google.visualization.DataTable();
                data1.addColumn('string', 'Date');
                data1.addColumn('number', 'Message Count');
                var rows=data.Data.length;
                data1.addRows(rows);
                $.each(data.Data,
                    function(index, value) {
                        var row = new Array();
                        row[0] = value.DateVal;
                        row[1] = value.NumVal;
                        data1.addRow(row);
                    });

                    drawlineChart(data1);
                }
            },
            error: function (data) {
            }
        });
    }

    function drawlineChart(data) {
        var chart = new google.visualization.LineChart(document.getElementById('linechartdiv'));
        var options = {
            curveType: "function",
            hAxis: { title: 'Days', titleTextStyle: { color: 'red' } }
        };
        chart.draw(data, options);
    }

    function checkline(days) {
           $("#lineq button").removeClass('active');
           $('#single-btn1_' + days).addClass('active');
        $.ajax({
            type: "Get",
            async: true,
            url: '/appv2/Dashboard/_FillLineChart',
            data: { 'dayscount': days },
            dataType: 'JSON',
            success: function (data) {
                if (data.msg == "success") {
                var data1 = new google.visualization.DataTable();
                data1.addColumn('string', 'Date');
                data1.addColumn('number', 'Message Count');
                var rows = data.Data.length;
                data1.addRows(rows);
                $.each(data.Data,
                    function(index, value) {
                        var row = new Array();
                        row[0] = value.DateVal;
                        row[1] = value.NumVal;
                        data1.addRow(row);
                    });

                var chart = new google.visualization.LineChart(document.getElementById('linechartdiv'));
                var view = new google.visualization.DataView(data1);
                var options = {
                    curveType: "function",
                    hAxis: { title: 'Days', titleTextStyle: { color: 'red' } }
                };
                    chart.draw(view, options);
                }
            },
            error: function (data) {
            }
        });
    }

    //google.load("visualization", "1", { packages: ["corechart"] });

    google.setOnLoadCallback(function () { fetchbardata(); });

    function fetchbardata() {
        $.ajax({
            type: "Get",
            url: '/appv2/Dashboard/_FillBarChart',
            data: { 'dayscount': 30 },
            dataType: 'JSON',
            async: true,
            success: function (data) {
                if (data.msg == "success") {
                var data1 = new google.visualization.DataTable();
                data1.addColumn('string', 'Date');
                data1.addColumn('number', 'Sent');
                data1.addColumn('number', 'Failed');
                var rows = data.Data.length;
                data1.addRows(rows);
                $.each(data.Data, function(index, value) {
                    var row = new Array();
                    row[0] = value.DateVal;
                    row[1] = value.Delivered;
                    row[2] = value.Pending;
                    data1.addRow(row);
                });
                    drawbarChart(data1);
                }
            },
            error: function (data) {
            }
        });
    }

    function drawbarChart(data) {
        var chart = new google.visualization.ColumnChart(document.getElementById('barchartdiv'));
        var options = {
            hAxis: { title: 'Days', titleTextStyle: { color: 'red' } }
        };
        chart.draw(data, options);
    }

    function checkbar(days) {
        $("#barq button").removeClass('active');
        $('#single-btn2_' + days).addClass('active');
        $.ajax({
            type: "Get",
            url: '/appv2/Dashboard/_FillBarChart',
            data: { 'dayscount': days },
            dataType: 'JSON',
            async: true,
            success: function (data) {
                if (data.msg == "success") {
                    var data1 = new google.visualization.DataTable();
                    data1.addColumn('string', 'Date');
                    data1.addColumn('number', 'Sent');
                    data1.addColumn('number', 'Failed');
                    var rows = data.Data.length;
                    data1.addRows(rows);
                    $.each(data.Data, function(index, value) {
                        var row = new Array();
                        row[0] = value.DateVal;
                        row[1] = value.Delivered;
                        row[2] = value.Pending;
                        data1.addRow(row);
                    });
                    var chart = new google.visualization.ColumnChart(document.getElementById('barchartdiv'));
                    var view = new google.visualization.DataView(data1);
                    chart.draw(view);
                }
            },
            error: function (data) {
            }
        });
    }

    

    $(document).ready(function () {
        GetUserBalance(1);
    });
</script>

        </div>
    </div>
    <div id="footer" style="height: 6.00600% !important">
        <div class="container">
            
        </div>
    </div>
    <!--footer-->
    <div id="BfOffer" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" data-backdrop="static" style="width: auto !important;">
        <div class="modal-body" style="overflow-y: auto !important; max-height: none !important; padding: 5px !important;">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true" style="top: 5px; position: absolute; right: 11px; color: white; opacity: 1;">×</button>
            <a href="https://www.facebook.com/events/1492696821035166/" target="_blank"><img src="Dashboard_Sms_fichiers/etbg2015_web.jpg"></a>
        </div>
    </div>
    <script src="Dashboard_Sms_fichiers/jquery"></script>

    
    <script src="Dashboard_Sms_fichiers/jquery-ui.js"></script>
    <link href="Dashboard_Sms_fichiers/jquery-ui.css" rel="stylesheet" type="text/css">
    <script src="Dashboard_Sms_fichiers/jqueryval"></script>

    <script src="Dashboard_Sms_fichiers/bootstrap"></script>

    <script src="Dashboard_Sms_fichiers/modernizr"></script>

    

    
    <script type="text/javascript" src="Dashboard_Sms_fichiers/bootstrap.js"></script>
    <script type="text/javascript">
    $(document).ready(function() {
        $("input").attr("autocomplete", "off");

        $("#sub-textone").click(function() {
            $("#sub-texttwo").animate({ height: 'toggle' }, "slow");
        });

        // Menu Sub-menu toggle
        $('.main-menu-li-1').click(function() {
            $('.sub-menu-li-1').toggle('slow');
        });

        //// First Time Popup Code
        ////localStorage.removeItem('bf-offer');
        //var isshow = localStorage.getItem('bf-offer');
        //if (isshow == null) {
        //    localStorage.setItem('bf-offer', 1);

        //    // Show popup here
        //    $('#BfOffer').modal('show');
        //}
    });

    function GetUserBalance(type) {
        $.ajax({
            url: "/appv2/Dashboard/GetCustomerBalance",
            data: { type: type },
            type: 'Get',
            success: function(result) {
                if (result.indexOf("|") >= 0) {
                    var arr = result.split('|');
                    $("#blncText").html(arr[0]);
                    $("#dashboradbalance").html(arr[1]);
                } else {
                    $("#dashboradbalance").html(result);
                }
            },
            error: function() {
                alert("Error");
            }
        });
        }

</script>

    <!--Start of Zopim Live Chat Script-->
    <script type="text/javascript">
        window.$zopim ||
            (function (d, s) {
                var z = $zopim = function (c) { z._.push(c) },
                    $ = z.s =
                        d.createElement(s),
                    e = d.getElementsByTagName(s)[0];
                z.set = function (o) {
                    z.set._.push(o)
                };
                z._ = [];
                z.set._ = [];
                $.async = !0;
                $.setAttribute('charset', 'utf-8');
                $.src = '//v2.zopim.com/?yRLkBcivNAMIXE2Jna0cjCRbaE8j1svq';
                z.t = +new Date;
                $.type = 'text/javascript';
                e.parentNode.insertBefore($, e)
            })(document, 'script');
    </script>
    <!--End of Zopim Live Chat Script-->

========================================================================

<script type="text/javascript" src="https://www.teletick.fr/portalassets\js\users\dashboard_specialist.js"></script>
<script type="text/javascript">
  $('#summary-first').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
  $('#summary-second').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
  $('#summary-third').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
</script>


============================================================================

<script type="text/javascript" src="https://www.teletick.fr/portalassets\js\users\dashboard_specialist.js"></script>
<script type="text/javascript">
  $('#summary-first').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
  $('#summary-second').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
  $('#summary-third').click(function() {
    $(this).find('i').toggleClass('fa-heart-o fa-heart')
  });
</script>

======================================================================

<script>

$(function() {
  var $tabButtonItem = $('#tab-button li'),
      $tabSelect = $('#tab-select'),
      $tabContents = $('.tab-contents'),
      activeClass = 'is-active';

  $tabButtonItem.first().addClass(activeClass);
  $tabContents.not(':first').hide();
      
//Date Slider In Month 
    var divs = $('.paymentinvoice1>div');
    var now = 0; 
    divs.hide().first().show();
    $("button[name=next]").click(function (e) {
      divs.eq(now).hide();
      now = (now + 1 < divs.length) ? now + 1 : 0;
      divs.eq(now).show(); 
    });
    $("button[name=prev]").click(function (e) {
      divs.eq(now).hide();
      now = (now > 0) ? now - 1 : divs.length - 1;
      divs.eq(now).show(); 
    });
//Date Slider In Month end
  $tabButtonItem.find('a').on('click', function(e) {
    var target = $(this).attr('href');

    $tabButtonItem.removeClass(activeClass);
    $(this).parent().addClass(activeClass);
    $tabSelect.val(target);
    $tabContents.hide();
    $(target).show();
    e.preventDefault();
  });

  $tabSelect.on('change', function() {
    var target = $(this).val(),
        targetSelectNum = $(this).prop('selectedIndex');

    $tabButtonItem.removeClass(activeClass);
    $tabButtonItem.eq(targetSelectNum).addClass(activeClass);
    $tabContents.hide();
    $(target).show();
      
          
  });
});
</script>

==================================================================