$(document).ready(function() {
  $('.filterable-items').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Vzdržte, načítám se...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Obrázek #%curr%</a> se nezdařilo načíst.',
      titleSrc: function(item) {
        return item.el.attr('title') + '<small>duo Minimax</small>';
      }
    }
  });
});

window.onload = function() {
 shuffleElements( $('.filterable-item') );
};

function shuffleElements($elements) {
	var i, index1, index2, temp_val;

	var count = $elements.length;
	var $parent = $elements.parent();
	var shuffled_array = [];


	// populate array of indexes
	for (i = 0; i < count; i++) {
		shuffled_array.push(i);
	}

	// shuffle indexes
	for (i = 0; i < count; i++) {
		index1 = (Math.random() * count) | 0;
		index2 = (Math.random() * count) | 0;

		temp_val = shuffled_array[index1];
		shuffled_array[index1] = shuffled_array[index2];
		shuffled_array[index2] = temp_val;
	}

	// apply random order to elements
	$elements.detach();
	for (i = 0; i < count; i++) {
		$parent.append( $elements.eq(shuffled_array[i]) );
	}
}


(function($, document, window){

	$(document).ready(function(){

		$("[data-background]").each(function(){
			var retina = window.devicePixelRatio > 1;
			var bg = $(this).data("background");
			if( retina ){
				var retinabg = bg.replace(".jpg","@2x.jpg");
				$(this).css("background-image","url("+retinabg+")");	
			} else{
				$(this).css("background-image","url("+bg+")");
			}
			
		});

		$("[data-bg-color]").each(function(){
			var bg = $(this).data("bg-color");
			$(this).css("background-color",bg);
		});

		$(".slider").flexslider({
			directionNav: false,
			controlNav: true,
		});

		$(".quote-slider").flexslider({
			directionNav: true,
			controlNav: false,
			prevText: "<i class='fa fa-caret-left'></i>",
			nextText: "<i class='fa fa-caret-right'></i>",
		});

		var eventCarousel = $(".event-carousel");
		eventCarousel.owlCarousel({
 
			autoPlay: 3000, //Set AutoPlay to 3 seconds
			rewindNav: false,
			items : 4,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3]

		});
		// Custom Navigation Events
		$("#event-next").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.next');
		});
		$("#event-prev").click(function(e){
			e.preventDefault();
			eventCarousel.trigger('owl.prev');
		});

		var $container = $('.filterable-items');

		$container.imagesLoaded(function(){
		    $container.isotope({
		        filter: '*',
		        layoutMode: 'fitRows',
		        animationOptions: {
		            duration: 750,
		            easing: 'linear',
		            queue: false
		        }
		    });
		});
		$('.filterable-nav a').click(function(e){
	    	e.preventDefault();
	        $('.filterable-nav .current').removeClass('current');
	        $(this).addClass('current');

	        var selector = $(this).attr('data-filter');
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });
	    $('.mobile-filter').change(function(){

	        var selector = $(this).val();
	        $container.isotope({
	            filter: selector,
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	         });
	         return false;
	    });
	    $(".mobile-menu").append($(".main-navigation .menu").clone());
	    $(".toggle-menu").click(function(){
	    	$(".mobile-menu").slideToggle();
	    });

	    if( $(".map").length ){
			$('.map').gmap3({
				map: {
					options: {
						maxZoom: 14,
						scrollwheel: false
					}  
				},
				marker:{
					address: "40 Sibley St, Detroit",
				}
			},
			"autofit" );
	    }

	});

	$(window).ready(function(){

	});

})(jQuery, document, window);