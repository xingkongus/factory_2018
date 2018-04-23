// $(document).ready(function() {
	
	function getpage(d,p,a,n,ni,it) {
		var turn;
		
		if( ni == 1 ) {
			if( $(it).attr('lastni') != 0 ) {
				turn = parseInt($(it).attr('lastni'));
			}else {
				turn = Math.ceil(a/ni);
				$(it).attr('lastni',turn);
			}
		}else if( ni == 4 ) {
			turn = Math.ceil(a/ni);
		}else if( !ni ){
			turn = a/n;
		}

		if( d == -1 ) {
			if( p > 1 ) {
				p = parseInt(p) - 1;
			}else {
				p = turn;
			}
		}else if( d == 1 ) {
			if( p < turn ) {
				p = parseInt(p) + 1;
			}else {
				p = 1;
			}
		}
		return p;
	}

	function showdot(d,p) {
		var dotkid = d.children();

		for( var j = 0; j < dotkid.length; j++) {
			if ( j == (p - 1) ) {
				$(dotkid[j]).css('background-image','url(image/stagedoth.png)');
			}else {
				$(dotkid[j]).css('background-image','url(image/stagedot.png)');
			}
		}
	}

	function runmethod(it,method,m,data) {
		m = parseInt(m) - 1;

		if( method == 1) { 
		  // 星空网banner 后工坊记录
			it.fadeOut(600,function() {
				it.css('background-image','url(' + data[m].img + ')');
			}).fadeIn(550);

		}else if( method == 2) {
		  // 星空网产品
			it.fadeOut(550,function() {
				it.find("div").css('background-image','url(' + data[m].img + ')');
				it.find("p").text(data[m].text);
			}).fadeIn('fast');

		}else if(method == 3) {
		  // 星足迹
			it.hide(800,function() {
				it.find("#showimg").css('background-image','url(' + data[m].img + ')');
				it.find("p").text(data[m].name + " " + data[m].time );
				it.find(".illstra").text(data[m].text);
			}).show(800);

		}else if( method  == 4) {
		  //街坊
			it.fadeOut(600,function() {
				it.find(".video_iframe").attr('src',data[m].src);
				it.find(".vname").text(data[m].name);
				it.find(".vtime").text(data[m].time);
			}).fadeIn(500);

		}else if( method == 5) {
		  // 推文
			it.find("#acti_img").fadeOut(550,function() {
				it.find("#acti_img").css('background-image','url(' + data[m].img + ')');
			}).fadeIn(800);

			it.find(".acti_text").hide(600,function() {
				it.find("#text_head").text(data[m].head);
				it.find("#text_con").text(data[m].content);
				it.find("#text_time").text(data[m].time);
				it.find("#text_author").text(data[m].author);
			}).show(750);

			it.find('.tag').fadeOut(600,function() {
				it.find('#tag1').text(data[m].tag1);
				it.find('#tag2').text(data[m].tag2);
				it.find('#tag3').text(data[m].tag3);
			}).fadeIn(700);

		}else if( method == 7 ) {
		  // 星空网传媒板块 video
			it.fadeOut(200,function() {
				it.find('.con').attr('src',data[m].src);
				it.find('p').text(data[m].text);
			}).fadeIn(200);

		}else if( method == 8 ) {
		  // 星空网传媒板块 design&photograph
			it.fadeOut(200,function() {
				it.find('.con').css('background-image','url(' + data[m].img + ')');
				it.find('p').text(data[m].text);
			}).fadeIn(200);

		}
	}
	
    function getdata(da,ni,a,n) {
		if( ni && ( a % n ) ) {
			for( var i = 0; i < n - 1; i++) {
				if( ni == 1){
					da.push(da[i]);
				}else if( ni == 4) {
					da.push({
						"src" : " ",
						"name" : " ",
						"time" : " "
					});
				}
			}
		}
		return da;
	}

	function lunbo(account,num,numinterval,direction,item,dots,method,data) {
		// account     轮播的总项目数；正数；四舍五入
		// num         单次轮播的项目数；正数；四舍五入
		// numinterval 
		// direction   执行的方向，1为向右，-1为向左
		// item        轮播的项目
		// dots        轮播是否有圆点显示第几个项目;ture or false
		// method     
		// data        轮播的数据

		if( account <= 0 || num <= 0 ) {
			return false;
		}else {
			account = parseInt(account);
			num = Math.round(num);
		}

		var page = item.attr('page');
		if( numinterval == 999 ) {
			page = getpage2(direction,page,account);
		}else {
			page = getpage(direction,page,account,num,numinterval,item);
		}
		item.attr('page',page);

		data = getdata(data,numinterval,account,num);

		if( num > 1 ) {	
			var itemkid = item.children();
			var str;
			for( var i = 1; i <= num; i++) {
				if(numinterval == 1) {
					str = parseInt(i) + parseInt(page) - 1;
				}else {
					str = parseInt(i) + num * (page - 1);
				}
				if( numinterval == 999 ) {
					if( i == 1 ) {
						runmethod(item.find("#video1"),method,str,data);
					}else if( i == 2) {
						runmethod(item.find("#video2"),method,str,data);
					}
				}else {
					runmethod($(itemkid[i - 1]),method,str,data);
				}
			}
		}else {
			runmethod(item,method,page,data);
		}

		if( dots ) {
			showdot(dots,page);
		}
		
	}

	var timer;

	function autoplay(account,num,numinterval,direction,item,dots,method,data,delay) {
		timer = setTimeout(function() {
			lunbo(account,num,numinterval,direction,item,dots,method,data);
			autoplay(account,num,numinterval,direction,item,dots,method,data,delay);
		},delay);
		item.attr('timer',timer);
	}

	function stopplay(item) {
		clearTimeout(item.attr('timer'));
	}


	function getda(attrvalue,data,datanum) {
		var index = jQuery.inArray(attrvalue,datanum);
		var da;
		switch(index) {
			case 1 : da = data[0];;break;
			case 2 : da = data[1];break;
			case 3 : da = data[2];break;
			case 4 : da = data[3];break;
			case 5 : da = data[4];break;
			case 6 : da = data[5];break;
			case 7 : da = data[6];break;
			case 9 : da = data[7];break;
			case 9 : da = data[8];break;
			case 10 : da = data[9];break;
		}
		return da;
	}

	function getpage2(direction,yp,end) {
		if( direction == -1 ) {
			if( yp > 1 ) {
				yp = parseInt(yp) - 1;
			}else {
				yp = 1;
			}
		}else if( direction == 1 ) {
			if( yp < end ) {
				yp = parseInt(yp) + 1;
			}else {
				yp = end;
			}
		}
		return yp;
	}

// });