function cycleImages(cycler){
  var $active = $(cycler).find('.active');
  var $next = ($active.next().length > 0) ? $active.next() : $(cycler).find('img:first');
  $next.css('z-index',2);//move the next image up the pile
  $active.fadeOut(1000,function(){//fade out the top image
    $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
    $next.css('z-index',3).addClass('active');//make the next image the top one
  });
}

$(document).ready(function(){
  var counter = 0;
  $('.cycler').each(function(){
	var cycler = this;
	setTimeout(function(){
	  setInterval(function(){cycleImages(cycler)}, 3000);      
	}, 500*counter++);
  })
})

//function cycleImages(){
//	  $('.cycler').each(function(){
//		  var $active = $(this).find('.active');
//		  var $next = ($active.next().length > 0) ? $active.next() : $(this).find('img:first');
//		  $next.css('z-index',2);//move the next image up the pile
//		  $active.fadeOut(1500,function(){//fade out the top image
//			  $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
//			  $next.css('z-index',3).addClass('active');//make the next image the top one
//		  });
//	  });
//    }
//
//$(document).ready(function(){
//  // run every 3s
//  setInterval('cycleImages()', 3000);
//})