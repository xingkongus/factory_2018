// $(document).ready(function() {

	// 改变分类数据
	var category = $('#category');
	var categorylen = $(classifyname).length;

	for( var i = 0; i < categorylen; i++) {
		$(category).append('<p class="kinds" classify=" ' + i + '">' + classifyname[i] + '</p>');
	}


	// 加载默认数据
	var size;
	var showa;
	var simple = $('#simple');
	var sizea = parseInt(simple.css('width')) * 0.2026;
	var sizeb = parseInt(simple.css('width')) * 0.4202;
	var apartstr = $('#turnapart').attr('apartment');
		if( !!apartstr ) {
			showa = 4;
			size = sizea;
		}else {
			showa = 2;
			size = sizeb;
	}
	turnclassify(classify[0],showa,size);

	// 切换分类
	function addsimpleitem(start,len,end,data,size) {
		var sizeh;
		if( size > 200) {
			sizeh = size * 9 /16;
		}

		for( var i = start; i < len; i++) {
			if( !!data[i].content ) {
				$(simple).append('<div class="simpleitem" style="width:' + size + 
					'px;"> <div class="content" style=" background-image:url(' + data[i].content +
					'); height: ' + sizeh + ' px; "></div> <div class="iteminfor"><p class="itemname">' + data[i].name + 
					'</p> <p class="itemauthor">' + data[i].author +  '</p> </div> </div>'
				);
			}else if( !!data[i].src ) {
				$(simple).append('<div class="simpleitem" style="width:' + size + 
					'px;"> <iframe class="content" style="height: ' + sizeh + 'px;" src=" ' + data[i].src + 
					'" allowfullscreen="" frameborder="0" > </iframe> <div class="iteminfor" <p class="itemname">' + data[i].name + 
					'</p> <p class="itemauthor">' + data[i].author +  '</p> </div> </div>'
					);
			}
 		}
		for( var j = len; j < end; j++) {
			$(simple).append('<div class="simpleitem" style="width:' + size + 'px;"><div class="content" style="height: ' + sizeh + 
				'px;"></div> <div class="iteminfor" <p class="itemname"> </p> <p class="itemauthor"> </p> </div> </div>'
			);
		}
	}

	function turnclassify(data,showa,size) {
		var simplekid = simple.children();
		var len = $(data).length;

		showa = parseInt(showa);
		if( len > showa * 3 ) {
			len = showa * 3;
		}

		var simplekid = $('#simple').children();
		for( var i = 0; i < $(simplekid).length; i++) {
			$(simplekid[i]).remove();
		}

		addsimpleitem(0,len,showa * 3,data,size);
	}

	function turnkinds(th,classifyda) {
		var apartstr = $('#turnapart').attr('apartment');

		if( apartstr == "js" ) {
			showa = 4;
			size = sizea;
		} else {
			showa = 2;
			size = sizeb;
		}
		var simplekid = simple.children();
		for( var i = showa * 3; i < $(simplekid).length; i++) {
			$(simplekid[i]).remove();
		}

		var nowclassify = parseInt( th.attr('classify') );
		turnclassify(classifyda[nowclassify],showa,size);
		$(simple).attr('classify',nowclassify);

		var len = $(classifyda[nowclassify]).length;
		if( len > showa * 3) {
			$(more).show();
		}

		$(simple).attr('page',0);
	}

	$('.kinds').click(function() {
		turnkinds($(this),classify);
		$('.kinds').css('color','rgb(69,87,102)');
		$(this).css('color','#4290e9');
	});


// 点击更多显示数据
	var more = $('#more');
	$(more).click(function() {
		var nowclassify = parseInt( $(simple).attr('classify') );
		var catekids = category.children();

		var apartstr = $('#turnapart').attr('apartment');
		if( !!apartstr ) {
			var nowdata = getnowdata();
			var	classify = nowdata.classify;

			if( apartstr == "js" ) {
				showa = 4;
				size = sizea;
			} else {
				showa = 2;
				size = sizeb;
			}
		}else {
			classify = putclassify();
			showa = 2;
			size = sizeb;
		}
		
		if( $(catekids[nowclassify]).html() == "推文" && parseInt( $(simple).attr('page') ) == 2) {
			$(more).find('a').attr('href','http://mp.weixin.qq.com/mp/homepage?__biz=MjM5MDIwNTg4MA==&hid=2&sn=ab505afe1ddc74744e241146bc00e183&scene=18#wechat_redirect');
		}else{
			var len = $(classify[nowclassify]).length;
			var simplekid = $(simple).children();
			var smlen = $(simplekid).length;
			var page = Math.ceil(len / (showa * 3) );
			var p = $(simple).attr('page');

			if( len > smlen) {
				var start = parseInt(p) * showa * 3;
				var end = parseInt(showa * 3) + start;
				var less = len - smlen;
				if( less > showa * 3) {
					less = showa * 3;
				}
			
				addsimpleitem(start,start + less,end,classify[nowclassify],size);

				p++;
				$(simple).attr('page',p);

				if( less < showa * 3) {
					$(more).hide();
				}
			}
		}

	});

// });