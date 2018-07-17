	var subnavdata = {
		"sdzx" : {
			"texts" : ["作品展示","活动记录","工作记录"],
			"href" : "sdzx.html"
		},
		"zzfm" : {
			"texts" : ["集体合照","活动记录","星空人毕业去向"],
			"href" : "zzfm.html"
		},
		"zzsp" : {
			"texts" : ["视频展示","作品分类"],
			"href" : "zzsp.html"
		}
	}

	function showSub(data) {
		$("#sub").empty().animate({'height':'175px'}).css('line-height','175px');

		var href = data.href;
		var texts = data.texts;
		var len = texts.length;
		var subnavWidth = 1/len * parseInt($('#sub').css('width')) + 'px';
		for(var i = 0; i < len; i++) {
			$('#sub').append('<a href="' + href + '" class="subnav" style="width:' + subnavWidth + ';">' + texts[i] + '</a>')
		}

		$('.subnav').bind('mouseover',function() {
			$(this).removeClass('sub-nav').addClass('oversubnav');
		}).bind('mouseleave',function() {
			$(this).removeClass('oversubnav').addClass('sub-nav');
		});
	}

	$('article').mouseleave(function() {
		$("#sub").animate({'height':0},function() {
			$("#sub").empty()
		});
	});

	$('.firstnav').mouseover(function() {
		$(this).removeClass('firstnav').addClass('overnav');
	}).mouseleave(function() {
		$(this).removeClass('overnav').addClass('firstnav');
	});
	$('#sdzx').mouseover(function() {
		showSub(subnavdata.sdzx);
	});
	$('#zzfm').mouseover(function() {
		showSub(subnavdata.zzfm);
	});
	$('#zzsp').mouseover(function() {
		showSub(subnavdata.zzsp);
	});

