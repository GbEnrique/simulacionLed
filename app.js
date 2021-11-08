var provider = new firebase.auth.GoogleAuthProvider();

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChartBaja);
google.charts.setOnLoadCallback(drawChartAlta);

      function drawChartBaja() {

        var dataBaja = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Baja Pr', 0]
        ]);

        var options = {
          width: 220, height: 200,
		  redFrom : 102, redTo: 120,
          yellowFrom:80, yellowTo: 102,
          greenFrom: 60, greenTo: 80,
		  majorTicks: ['0', '10','20', '30', '40','50','60','70','80','90', '100','120'],
		  minorTicks: 5,
		  max:120,
   		  min:0
		
        };
        var formatterPresion = new google.visualization.NumberFormat({
        	suffix: 'Psi',
        	fractionDigits: 0
        });
        formatterPresion.format(dataBaja, 1);

        var chartBaja = new google.visualization.Gauge(document.getElementById('chart_baja'));

        chartBaja.draw(dataBaja, options,formatterPresion);

        var presBaja = firebase.database().ref('datos/presionBaja');

        presBaja.on('value',function(snapshot){
        	presBaja = snapshot.val();
        	
        });
        setInterval(function() {
          dataBaja.setValue(0, 1, presBaja);
          formatterPresion.format(dataBaja, 1);
          chartBaja.draw(dataBaja, options);
        }, 1300);

      }

      function drawChartAlta() {

        var dataAlta = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['Alta Pr', 0]
        ]);

        var options = {
          width: 200, height: 200,
          redFrom: 350, redTo: 500,
          yellowFrom:260, yellowTo: 350,
		  greenFrom: 200, greenTo: 260,
		  majorTicks: ['0', '50','100', '150', '200','250','300','350','400', '450', '500'],
		  minorTicks: 5,
		  max:500,
   		  min:0
		
        };
        var formatterPresion = new google.visualization.NumberFormat({
        	suffix: 'Psi',
        	fractionDigits: 0
        });
        formatterPresion.format(dataAlta,1);

        var chart = new google.visualization.Gauge(document.getElementById('chart_alta'));

        chart.draw(dataAlta, options,formatterPresion);

        var presBaja = firebase.database().ref('datos/presionAlta');
        presBaja.on('value',function(snapshot){
        	presBaja = snapshot.val();
        });
        setInterval(function() {
          dataAlta.setValue(0, 1, presBaja);
          formatterPresion.format(dataAlta,1);
          chart.draw(dataAlta, options);
        }, 1300);
      }

      document.querySelector("#check").addEventListener("click",function(){
	let bulb = document.querySelector("#light");
		var switche = firebase.database().ref('datos/switche');
	if(this.checked){
        firebase.database().ref('datos/switche').set(true);
	}else{
		firebase.database().ref('datos/switche').set(false);
	}

	switche.on('value',function(snapshot){
        	switche = snapshot.val();
       		if(switche){
       			bulb.classList.add("on");
       		}else{
       			bulb.classList.remove("on");
       		}
        	});

});