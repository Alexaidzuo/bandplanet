/**********************************
 * Hide nav when scroll down
**********************************/ 
$(document).ready(function () {
  
  'use strict';
  
   var c, currentScrollTop = 0,
       navbar = $('nav');

   $(window).scroll(function () {
      var a = $(window).scrollTop();
      var b = navbar.height();
     
      currentScrollTop = a;
     
      if (c < currentScrollTop && a > b + b) {
        navbar.addClass("scrollUp");
      } else if (c > currentScrollTop && !(a <= b)) {
        navbar.removeClass("scrollUp");
      }
      c = currentScrollTop;
  });
  
});

/**********************************
	* DOM Filter 
 **********************************/
// Section Editor's pick
$(document).ready(function() {
    $('.pick-filter-editor span a').click(function() {
      // fetch the class of the clicked item
      var ourClass = $(this).attr('class');
      // reset the active class on all the buttons
      $('.pick-filter-editor span').removeClass('pick-filter--active');
      // update the active state on our clicked button
      $(this).parent().addClass('pick-filter--active');

      var cacheDom = "";
      if(ourClass == 'all') {
        // show all items
        $('#pick-filter-editor-wrapper').children('div#editors-box-item').append(cacheDom);
      }
      else {
        // hide all elements that don't share ourClass
        $('#pick-filter-editor-wrapper').children('div:not(.' + ourClass + ')').detach();
        // show all elements that do share ourClass
        $('#pick-filter-editor-wrapper').children('div:not(.' + ourClass + ')').append(cacheDom);
      }
      return false;
    });
});

// Section Latest 
$(document).ready(function() {
    $('.pick-filter-latest span a').click(function() {
      // fetch the class of the clicked item
      var ourClass = $(this).attr('class');
      // reset the active class on all the buttons
      $('.pick-filter-latest span').removeClass('pick-filter--active');
      // update the active state on our clicked button
      $(this).parent().addClass('pick-filter--active');
      if(ourClass == 'all') {
        // show all items
        $('#pick-filter-latest-wrapper').children('div.latest-song').fadeIn(200);
      }
      else {
        // hide all elements that don't share ourClass
        $('#pick-filter-latest-wrapper').children('div:not(.' + ourClass + ')').fadeOut(200);
        // show all elements that do share ourClass
        $('#pick-filter-latest-wrapper').children('div.' + ourClass).fadeIn(200);
      }
      return false;
    });
});