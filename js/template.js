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
    