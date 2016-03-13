$( window ).load( function(){

	//set the ul width at the total imgs width =====================================
	var sliderWidth= 0;
	var numSlide= $(".slider li").length;
	var i, animating=0, move=0;
	for(i=0;i<numSlide;i++){
		sliderWidth= sliderWidth + $(".slider li:eq("+i+")").width();
	}
	$(".slider").css("width",sliderWidth);

	//add clones to fill the page ==================================================
	i=1;
	while($("#space").width()>sliderWidth*i){
		i++;
		$(".slider:first-child").clone().prependTo(".slider_contenitor");
	}

	//add another 3 clones, need it for the mooove ====================================
	$(".slider:first-child").clone().prependTo(".slider_contenitor");
	$(".slider:first-child").clone().prependTo(".slider_contenitor");
	$(".slider:first-child").clone().prependTo(".slider_contenitor");

	//add the right width for the slider_contenitor ================================
	i+=3;
	$(".slider_contenitor").css("width",sliderWidth*i);

	//set the slider active and the slide active
	$(".slider:eq("+Math.floor(i/2)+")").addClass("sliderActive");
	$(".sliderActive ul li:first-child").addClass("active");

	//put the first slide of the slider more centered in the middle ================
	var center= (($("#space").width())/2 - ($(".active").width())/2) - sliderWidth*Math.floor(i/2);
	$(".slider_contenitor").css("left",center);

	//move the slider! =============================================================
	function slide(direction){
		$('.slider_contenitor').animate(
			{ left: "+="+move*direction },
			{
				duration: 500,
				complete: function(){ complete(direction) }
			}
		);
	}
	
	function complete(direction){
		if((direction==1)&&($(".sliderActive ul li:last-of-type").hasClass("active"))){
			$(".slider:first-child").clone().prependTo(".slider_contenitor");
			$(".slider_contenitor .slider:last-of-type").remove();
			$(".slider_contenitor").css("left","+="+(-sliderWidth));
		}
		if((direction==-1)&&($(".sliderActive ul li:first-child").hasClass("active"))){
			$(".slider:first-child").clone().appendTo(".slider_contenitor");
			$(".slider_contenitor .slider:first-child").remove();
			$(".slider_contenitor").css("left","+="+sliderWidth);
			console.log("sono nell'if");
		}
		animating=0;
	}

	//Take the click! ==============================================================
	$('.left').click(function(){
		if(animating==0){
			animating=1;
			if($(".sliderActive ul li:first-child").hasClass("active")){
				move= $(".active").width()/2;
				$('.active').removeClass();
				$('.sliderActive').removeClass(function(){
					$(this).prev().addClass("sliderActive");
					return "sliderActive";
				});
				$(".sliderActive ul li:last-of-type").addClass("active");
				move+= $(".active").width()/2;
				slide(1);
			}else{
				move= $(".active").width()/2;
				$('.active').removeClass(function(){
					$(this).prev().addClass("active");
					return "active";
				});
				move+= $(".active").width()/2;
				slide(1);
			}
		}
	});

	$('.right').click(function(){
		if(animating==0){
			animating=1;
			if($(".sliderActive ul li:last-of-type").hasClass("active")){
				move= $(".active").width()/2;
				$('.active').removeClass();
				$('.sliderActive').removeClass(function(){
					$(this).next().addClass("sliderActive");
					return "sliderActive";
				});
				$(".sliderActive ul li:first-child").addClass("active");
				move+= $(".active").width()/2;
				slide(-1);
			}else{
				move= $(".active").width()/2;
				$('.active').removeClass(function(){
					$(this).next().addClass("active");
					return "active";
				});
				move+= $(".active").width()/2;
				slide(-1);
			}
		}
	});

	$(document).keydown(function(e){
		if(e.keyCode==37){
			$('.left').click();
			return false;
		}
		if(e.keyCode==39){
			$('.right').click();
			return false;
		}
	});

});