$(document).ready(function(){
	InitMap();
});
window.centerPoint = "济南市";
window.bradius =0.25;
/**********************点击显示路线按钮，得到以及处理该方式的点****/
function getInitPosition(themap){
	$.ajax({
		type:"get",
		url:"http://121.250.222.124/intel/",
		async:true,
		success:function(data){
			console.log(data);
			handleData(data);
		},
		error:function(XMLHttpRequest, textStatus, errorThrown) {
			 console.log(XMLHttpRequest);	 
		}
	});
	function handleData(data){
		data = JSON.parse(data);
		var points = [];
		for(var i = 0;i<data.length;i++){
			console.log(data.length);
			points.push(new BMap.Point(data[i][0],data[i][1]));
		}
		InitPosition(themap,points[0],"img/position/position.png");

		themap.centerAndZoom(points[0],18);	
		var curve = new BMapLib.CurveLine(points, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5}); //创建弧线对象
		themap.addOverlay(curve); //添加到地图中
	}
}



/***********************初始化地图*****************/
function InitMap(){
	var map = new BMap.Map("mymap");
//	map.centerAndZoom("山东省",15);
	map.enableScrollWheelZoom(true);
	map.enableDragging();

	$("#lost_btn").on("click",function(){
		InitPop();
	});
	var show = false;
	$("#near_btn").on("click",function(){
		if(!show){
			InitNeighbourhood(map,show);
			show = true;
		}else{
			deletePoint(map);
			show = false;
		}
		
		
	});
	var radius = 0.005 ;
	InitGPS(map,radius);
}



/****************************************显示点，以及某点的各种点击反应*/
function InitPosition(themap,point,imgurl){
	var myIcon1 = new BMap.Icon(imgurl, new BMap.Size(32,32));
	var vectorMarker = new BMap.Marker(point, {
	  icon:myIcon1
	});
	themap.addOverlay(vectorMarker);
	
}

function deletePoint(themap){
	var allOverlay = themap.getOverlays();
	for (var i = 0; i < allOverlay.length -1; i++){
		if(allOverlay[i].getLabel()){
			themap.removeOverlay(allOverlay[i]);
			return false;
		}
	}
}
function InitNeighbourhood(themap){
	var data_info = [{"phead":"img/position/p1.png","point":new BMap.Point(117.13,36.6543),"name":"咩咩咩"},
	{"phead":"img/position/p2.png","point":new BMap.Point(117.153,36.65243),"name":"旺旺网"},
	{"phead":"img/position/p3.png","point":new BMap.Point(117.1133,36.5553),"name":"喵喵喵"}];
	handlerData(data_info);
	function handlerData(data_info){
		for(var i = 0;i<data_info.length;i++){
			console.log(data_info[i].phead);
			var myIcon = new BMap.Icon(data_info[i].phead, new BMap.Size(40, 40), {    //小车图片
				imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
			});
			var carMk = new BMap.Marker(data_info[i].point,{icon:myIcon});
			var label = new BMap.Label(data_info[i].name,{offset:new BMap.Size(20,-10)});
			themap.addOverlay(carMk);
			carMk.setLabel(label);
		}
	}
}
/****************展示移动路线********************************/
function InitGPS(themap,radius){
	/******************模拟点坐标***********/
	var  imitatePosition = [];
	var rlng = Math.random()+117.1;
	var rlat = Math.random()+36.6;
	for(var i = 0; i<20;i++){
		rlng +=0.0005;
		rlat -=0.0005;
		imitatePosition.push(new BMap.Point(rlng,rlat));
	}
	
	
	/************设置头像***********************/
	var myIcon = new BMap.Icon("./img/position/phead.png", new BMap.Size(40, 40), {    //小车图片
		imageOffset: new BMap.Size(0, 0)    //图片的偏移量。为了是图片底部中心对准坐标点。
	});
	var carMk = new BMap.Marker(imitatePosition[0],{icon:myIcon});
	themap.addOverlay(carMk);
	
	
	var j = 0;
	var length = imitatePosition.length;
	themap.centerAndZoom(imitatePosition[0],17);
	var bound;
	function resetMkPoint(j){
		
		carMk.setPosition(imitatePosition[j]);
		bound = (Math.pow(imitatePosition[j].lng-imitatePosition[0].lng,2)+Math.pow(imitatePosition[j].lat-imitatePosition[0].lat,2))>Math.pow(radius,2)?true:false;
		console.log(bound);
		if(bound){
			InitPosition(themap,imitatePosition[j],"img/position/jiao.png");
		}
		if(j < length-1){
			setTimeout(function(){
				j++;
				resetMkPoint(j);
			},500);
		}
	}
	setTimeout(function(){
		resetMkPoint(0);
		console.log("222");
	},1500);
}


//弹出框，圈定宠物活动范围，设置中心点，以设定一个圆形区域。

function InitPop(){
	var scontent = '<div class="pop"><div class="contain_form"><div class="form-group"><label for="set_pname">中心地</label>'+
				   '<input type="text" name="mpswd" class="form-control" id="set_pname" placeholder="设置安全地点中心" required="required">'+
				   '</div><div class="form-group"><label for="set_bound">范围</label><select class="select" id="set_bound">'+
				   '<option value="0.005">0.005</option><option value="0.01">0.5</option><option value="0.02">0.02</option>'+
				   '<option value="0.03">0.03</option><option value="0.04">0.04</option></select></div>'+
				   '<div id="submit" class="submit_btn">确定</div></div><div class = "close"><img src="./img/position/close.png"/></div></div>';
	$(".content_wrap").append(scontent);
	$("#submit").on("click",function(){
		var cpname = $("#set_pname").val();
		var cbraduis = $("#set_bound").val();
		window.bradius = cbraduis;
		window.centerPoint = cpname;
	});
	$(".close").on("click",function(event){
		$(".pop").remove();
		event.stopPropagation();
		
	});
}

