$(document).ready(function() {
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
	timeline($(graduatedshow),$(xkmanyear),$('.graduated'),glen);

});