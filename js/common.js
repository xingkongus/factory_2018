$(document).ready(function() {
	var ajaxObj;

	ajaxObj = $.ajax({url:"header.html",async:false});//同步加载导航栏
	if(ajaxObj.status == 200){
		$("header").html(ajaxObj.responseText);
	}

	ajaxObj = $.ajax({url:"footer.html",async:false});//同步加载footer
	if(ajaxObj.status == 200){
		$("footer").html(ajaxObj.responseText);
	}


  // 样式修改
	var stage = $('#stage');
	var skip = $('.skip');
	var w = parseInt($(stage).css('width'));
	var h = w * 9 / 16;
	var sh = 0.5 * h - 10;

	$(stage).css('height',h);
	$(skip).css('height',sh * 2/3 + 8);
	$(skip).css('padding-top',sh *1/3 - 8);

  // aside固定
  	var asidekids = $("aside").children();
	var ot = parseInt($(asidekids[0]).offset().top);

	function FixedAside() {
		var st = parseInt($(window).scrollTop());
		var fot = parseInt($("footer").offset().top);
		var width = parseInt($("article").css('width')) * 0.3;
		var left = parseInt($("section").css('width')) + parseInt($("article").offset().left);
		// var ah = parseInt($("section").css('height'));

		if( st >= ot && ( st <= ( fot - 700) ) ) {
			$("aside").fadeIn(600,function() {
				$("aside").css('position','fixed').css('width',width).css('top',0).css('left',left).css('padding-top',0);
			});
		}else if( st > ( fot - 700 ) ) {
			$("aside").fadeOut(600);
		}else{
			$("aside").fadeIn(600,function() {
				$("aside").css('position','static');
				$('.little').css('padding-top',60);
			});
		}
	}

	function turnSkipCss() {
		var name = getName();
		var top1 = name[0].offset().top - 80;
		var top2 = name[1].offset().top - 80;
		var top3 = 99999;
		if(typeof(name[2]) != 'undefined') {
			top3 = name[2].offset().top - 80;
		}
		$('.skip').removeClass('actived');
		var st = $(window).scrollTop();
		if(st < top2) {
			$(asidekids[0]).addClass("actived");
		}else if(st >= top2 && st < top3) {
			$(asidekids[1]).addClass("actived");
		}else {
			$(asidekids[2]).addClass("actived");
		}
	}

	$(window).scroll(function() {
		FixedAside();
		turnSkipCss();
	});

	$(window).resize(function() {
		FixedAside();
	});

  // aside锚点点击跳转
	function turnSkip(itAside) {
		// $('.skip').removeClass('actived');
		$("html,body").animate({
			scrollTop: itAside.offset().top
		},'slow');
	}
	$(".skip").bind('click',function() {
		var index = parseInt($(this).attr('skip')) - 1;
		var name = getName();
		turnSkip(name[index]);
		// $(this).addClass("actived");
	});

  // 展示遮罩层
	var showcontainer = $('#bigshowcontainer');
	$(showcontainer).css('height',$(document).height());
	$(showcontainer).hide();

	function bigshow(con) {
		var w = parseInt( $(showcontainer).css('width') ) * 0.8;
		var h = parseInt(w) * 9 / 16;
		con.css('height',h);
		$(window).resize(function() {
			var w = parseInt( $(showcontainer).css('width') ) * 0.8;
			var h = parseInt(w) * 9 / 16;
			con.css('height',h);
		});

		$(showcontainer).append(con);
		$(showcontainer).show(600);
	}

	$(showcontainer).click(function() {
		$(showcontainer).hide(400);
		$(showcontainer).children().remove();
	});

	var simplecon = $('#simple').find('.content');
	$(simplecon).click(function() {
		bigshow($(this).clone().addClass("showcontent").css('margin-top',$(window).scrollTop()));
	});

	var single = $('#single');
	$(single).click(function() {
		bigshow($(this).clone().addClass("showcontent").css('opacity',1).css('margin-top',$(window).scrollTop()));
	});

	var img = $('.imgshow').find("div");
	$(img).click(function() {
		bigshow($(this).clone().addClass("showcontent").css('margin-top',$(window).scrollTop()));
	});

  // 轮播小点样式
	var showlen = $(show).length;
	for( var i = 0; i < showlen; i++) {
		$('#singledots').append('<li class="dot"></li>');
	}

	function dotCSS(len) {
		var w = parseInt($('#stage').css('width'));
		var h = w * 9 / 16 - 25;
		$('#singledots').css('width',parseInt(len * 15) + (parseInt(len) + 1) * 8).css('margin-top',h);

		var pl = ( w - parseInt( $('#singledots').css('width') ) )/2;
		$('#singledots').css('padding-left',pl);
	}

	dotCSS(showlen);
	$(window).resize(function() {
		dotCSS(showlen);
	});

  // 加载默认数据
    var index = parseInt(0);
	$('#single').css('background-image','url(' + show[index].img + ')');
	$(".actname").text(show[index].name);
	$(".actauthor").text(show[index].author);
	$(".acttime").text(show[index].time);
	$(".illstration").text(show[index].text);

	if( whetherlunbo == 'yes') {
		$('#stage').mouseout(function() {
			autoplay(showlen,1,0,1,$('.actshow'),$('#singledots'),6,$(show),2500);
		}).mouseover(function() {
			stopplay($('.actshow'));
		});
	}

});
