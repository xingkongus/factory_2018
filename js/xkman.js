$(document).ready(function() {
	// var APT_URL = "json/data-xkman.json";

	// $.ajax({
	// 	url: APT_URL,
	// 	async: false,
	// 	success: function(res) {
	// 		xkmandata = res.xkmandata;
	// 	},
	// 	dataType: "json"
	// });


	var graduatedshow = $('#graduatedshow');
	var glen = $(xkmandata).length;

	for( var i = 0; i < glen; i++) {
		$(graduatedshow).append('<div class="part" part="' + i + ' ">')
		var data = $(xkmandata[i]);
		var gslen = $(data).length;

		for( var j = 0; j < gslen; j++) {
				$($('.part')[i]).append(
					'<div class="xkman"> <div class="ownphoto"> <img src=" ' + data[j].photo + 
					' "> </div> <div class="infor"> <p class="name">姓名：' + data[j].name + 
					'</p> <p class="xkjob">曾任：' + data[j].xkjob + 
					'</p> <p class="currentjob">现任：' + data[j].currentjob + 
					'</p> </div> </div>'
					);
		}
	}

	// 时光轴样式
	var graduatedarr = ["2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006"];

	for( var j = 0; j < glen; j++) {
		$('.graduated').find('#line').append('<span class="linedot" dot="' + j + '">' + graduatedarr[j] + '</span>');
	}
	var grkid = $(graduatedshow).children();
	var grlinedot = $('.graduated').find('#line').children();
	for( var i = 0; i < $(grkid).length; i++) {
		var _top = $(grkid[i]).offset().top;
		$(grlinedot[i]).offset({top:_top + 10,left:170});
	}
	$(graduatedshow).scroll(function() {
		for( var i = 0; i < $(grkid).length; i++) {
			var _top = $(grkid[i]).offset().top;
			$(grlinedot[i]).offset({top:_top + 10,left:170});
		}
	});

});