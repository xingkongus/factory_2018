// $(document).ready(function() {

  // 加载数据
	var API_URL = "json/data-sdzx.json";
	$.ajax({
		url: API_URL,
		async: false,
		success: function(res) {
			js = res.js;
			yc = res.yc;
			cm = res.cm;
		},
		dataType: "json"
	});

  // aside锚点跳转
	function getName() {
		var name1 = [$("#actshow"),$("#activity"),$("#work")];
		return name1;
	}

  // 是否轮播
	var whetherlunbo = 'yes';

  // 切换中心
	// $('.apartment').bind('mouseenter',function() {
	// 	if($(this).attr('clickflag') == 'no') {
	// 		$(this).attr('clickflag','focus');
	// 		$(this).css('color','#ffffff').css('background-color','#ffce24').css('background-image','url(image/aparth.png)');
	// 	}
	// }).bind('mouseleave',function() {
	// 	if($(this).attr('clickflag') == 'focus') {
	// 		$(this).css('color','rgb(114,136,162)').css('background-color','#ffffff').css('background-image','url(image/apart.png)').attr('clickflag','no');
	// 	}
	// });

	var size;
	var simple = $('#simple');
	var sizea = parseInt(simple.css('width')) * 0.2026;
	var sizeb = parseInt(simple.css('width')) * 0.4202;
	$('.apartment').click(function() {
		// $('.apartment').attr('clickflag','no');
		// $(this).attr('clickflag','yes');
		$('#simple').attr('page',1);

		// 改变CSS
		// $('.apartment').css('color','rgb(114,136,162)').css('background-color','#ffffff').css('background-image','url(image/apart.png)');
		// $(this).css('color','#ffffff').css('background-color','#1f86d8').css('background-image','url(image/aparth.png)');
		$('.apartment').css('color','rgb(114,136,162)');
		$(this).css('color','#007ae4');

		var apart = $(this).attr('id');
		var showaccount;
		$('#turnapart').attr('apartment',apart);
		if( apart == "cm" ) {
			showaccount = 2;
			size = sizeb;
		} else if( apart == "yc" ) {
			showaccount = 2;
			size = sizeb;
		} else {
			showaccount = 4;
			size = sizea;
		}
		
		var nowdata = getnowdata();
		var show =           nowdata.show;
		var	classifyname =   nowdata.classifyname;
		var	classify =       nowdata.classify;
		var	activityrecord = nowdata.activityrecord;
		var	workrecord =　   nowdata.workrecord;

		// actshow 增删dots
		$(".dot").remove();
		var showlen = $(show).length;
		for( var i = 0; i < showlen; i++) {
			$('#singledots').append('<li class="dot"></li>');
		}
		dotCSS(showlen);
		$(window).resize(function() {
			dotCSS(showlen);
		});

		// classify 改变分类数据
		var category = $('#category');
		var categorylen = $(classifyname).length;
		var clen = $(classify[0]).length;
		var cend = parseInt(showaccount * 3);

		$('.kinds').remove();
		for( var i = 0; i < categorylen; i++) {
			$(category).append('<p class="kinds" classify=" ' + i + '">' + classifyname[i] + '</p>');
		}
		var simplekid = $('#simple').children();
		for( var i = 0; i < $(simplekid).length; i++) {
			$(simplekid[i]).remove();
		}

		if( cend < clen) {
			clen = cend;
		}
		addsimpleitem(0,clen,cend,classify[0],size);

		$('.kinds').click(function() {
			turnkinds($(this),classify);
		});
		turnclassify(classify[0],showaccount,size);
		$('#more').show();

		// actshow
		$('#single').css('background-image','url(' + show[0].img + ')');
		$(".actname").text(show[0].name);
		$(".actauthor").text(show[0].author);
		$(".acttime").text(show[0].time);
		$(".illstration").text(show[0].text);

		// record
		function showusual(len,item,data) {
			for( var i = 0; i < len; i++) {
				$(".repart").remove();
				item.append('<div class="repart" part="' + i + ' ">');

				var da = $(data[i])[0];
				var itemkid = item.children();
				$(itemkid[i]).append(
					'<div class="name">' + da.name + 
					'</div> <div class="illustation">' + da.illustation + 
					'</div> <div class="mediashow" part="' + i +
					'"> <span class="prearrow" id="mspre"></span> <div class="imgshow" page="1" lastni="0">' + 
					'<div class="smallimg smallleft"></div> <div class="bigimg"></div>' +
					'<div class="smallimg smallright"></div> </div> <span class="nexarrow" id="msnex"></span> </div>'
				);
				$(itemkid[i]).find(".smallleft").css('background-image','url(' + da.imgs[0].img + ')');
				$(itemkid[i]).find(".bigimg").css('background-image','url(' + da.imgs[1].img + ')');
				$(itemkid[i]).find(".smallright").css('background-image','url(' + da.imgs[2].img + ')');
				
			}
		}
		
		var acrecordshow = $('#acrecordshow');
		var alen = $(activityrecord).length;
		showusual(alen,$(acrecordshow),activityrecord);

		var worecordshow = $('#worecordshow');
		var wlen = $(workrecord).length;
		showusual(wlen,$(worecordshow),workrecord);

	});

	function getnowdata() {
		var apart = $('#turnapart').attr('apartment');
		if( apart == "cm") {
			da = cm;
		}else if( apart == "yc") {
			da = yc;
		}else {
			da = js;
		}
		return da;
	}
	
	var nowdata = getnowdata();

	var show =           nowdata.show;
	var	classifyname =   nowdata.classifyname;
	var	classify =       nowdata.classify;
	var	activityrecord = nowdata.activityrecord;
	var	workrecord =　   nowdata.workrecord;

	

// });