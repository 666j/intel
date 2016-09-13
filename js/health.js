function initHeartData(){
	var myChart = echarts.init(document.getElementById('heartRate'));
	function randomData() {
	    now = new Date(+now + oneDay);
	    value = value + Math.random() * 21 - 10;
	    return {
	        name: now.toString(),
	        value: [
	            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
	            Math.round(value)
	        ]
	    }
	}
			
	var data = [];
	var now = +new Date(1997, 9, 3);
	var oneDay = 24 * 3600 * 1000;
	var value = Math.random() * 1000;
	for (var i = 0; i < 1000; i++) {
	    data.push(randomData());
	}
	
	option = {
	    title: {
	        text: 'Heart Rate'
	    },
	    tooltip: {
	        trigger: 'axis',
	        formatter: function (params) {
	            params = params[0];
	            var date = new Date(params.name);
	            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
	        },
	        axisPointer: {
	            animation: false
	        }
	    },
	    xAxis: {
	        type: 'time',
	        splitLine: {
	            show: false
	        }
	    },
	    yAxis: {
	        type: 'value',
	        boundaryGap: [0, '100%'],
	        splitLine: {
	            show: false
	        }
	    },
	    series: [{
	        name: '模拟数据',
	        type: 'line',
	        showSymbol: false,
	        hoverAnimation: false,
	        data: data
	    }]
	};
	var app = {}; 
	app.timeTicket = setInterval(function () {

	    for (var i = 0; i < 5; i++) {
	        data.shift();
	        data.push(randomData());
	    }
	
	    myChart.setOption({
	        series: [{
	            data: data
	        }]
	    });
	}, 1000);
//  myChart.setOption(option);    //载入图表
}

function initTempData(){
	var myChart = echarts.init(document.getElementById('temperature'));
			function randomData() {
			    now = new Date(+now + oneDay);
			    value = value + Math.random() * 21 - 10;
			    return {
			        name: now.toString(),
			        value: [
			            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
			            Math.round(value)
			        ]
			    }
			}
			
			var data = [];
			var now = +new Date(1997, 9, 3);
			var oneDay = 24 * 3600 * 1000;
			var value = Math.random() * 1000;
			for (var i = 0; i < 1000; i++) {
			    data.push(randomData());
			}
			
			option = {
			    title: {
			        text: 'Temperature'
			    },
			    tooltip: {
			        trigger: 'axis',
			        formatter: function (params) {
			            params = params[0];
			            var date = new Date(params.name);
			            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
			        },
			        axisPointer: {
			            animation: false
			        }
			    },
			    xAxis: {
			        type: 'time',
			        splitLine: {
			            show: false
			        }
			    },
			    yAxis: {
			        type: 'value',
			        boundaryGap: [0, '100%'],
			        splitLine: {
			            show: false
			        }
			    },
			    series: [{
			        name: '模拟数据',
			        type: 'line',
			        showSymbol: false,
			        hoverAnimation: false,
			        data: data
			    }]
			};

		    myChart.setOption(option);    //载入图表
}
function initActivityData(){
	var myChart = echarts.init(document.getElementById('activityMount'));
	var option = {
	    title: {
	        text: 'activityMount',
	        subtext: '纯属虚构'
	    },
	    tooltip: {
	        trigger: 'axis'
	    },
	    legend: {
	        data:['最新成交价', '预购队列']
	    },
	    toolbox: {
	        show: true,
	        feature: {
	            dataView: {readOnly: false},
	            restore: {},
	            saveAsImage: {}
	        }
	    },
	    dataZoom: {
	        show: false,
	        start: 0,
	        end: 100
	    },
	    xAxis: [
	        {
	            type: 'category',
	            boundaryGap: true,
	            data: (function (){
	                var now = new Date();
	                var res = [];
	                var len = 10;
	                while (len--) {
	                    res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
	                    now = new Date(now - 2000);
	                }
	                return res;
	            })()
	        },
	        {
	            type: 'category',
	            boundaryGap: true,
	            data: (function (){
	                var res = [];
	                var len = 10;
	                while (len--) {
	                    res.push(len + 1);
	                }
	                return res;
	            })()
	        }
	    ],
	    yAxis: [
	        {
	            type: 'value',
	            scale: true,
	            name: '价格',
	            max: 30,
	            min: 0,
	            boundaryGap: [0.2, 0.2]
	        },
	        {
	            type: 'value',
	            scale: true,
	            name: '预购量',
	            max: 1200,
	            min: 0,
	            boundaryGap: [0.2, 0.2]
	        }
	    ],
	    series: [
	        {
	            name:'预购队列',
	            type:'bar',
	            xAxisIndex: 1,
	            yAxisIndex: 1,
	            data:(function (){
	                var res = [];
	                var len = 10;
	                while (len--) {
	                    res.push(Math.round(Math.random() * 1000));
	                }
	                return res;
	            })()
	        },
	        {
	            name:'最新成交价',
	            type:'line',
	            data:(function (){
	                var res = [];
	                var len = 0;
	                while (len < 10) {
	                    res.push((Math.random()*10 + 5).toFixed(1) - 0);
	                    len++;
	                }
	                return res;
	            })()
	        }
	    ]
	};
	myChart.setOption(option);    //载入图表
}
$(document).ready(function(){
	initHeartData();
	initTempData();
	initActivityData();
});
