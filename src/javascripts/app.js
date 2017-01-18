/*
 * REQUIRED FILES / LIBS
 **/
import './modules'

var $ = require('jquery')

global.jQuery = $;
require('bootstrap-sass');
require('bootstrap-material-design');

/*
 * GLOBAL VARIABLES
 **/
var body = $('body');
var nav_container = $('.nav-container');
var nav = $('#navbar-primary');
var nav2 = $('#navbar-secondary');
var navbar_content = $('#navbarContent');
var progress = $('.progress-bar');
var contact = $('#contact');

var nav_height = $(nav).outerHeight(true);
var nav_offset = $(nav).offset().top;
var nav2_height = $(nav2).outerHeight(true);

/*
 * INIT FUNCTIONS
 **/
$.material.init();
pad_body();
// init_google_maps();

$(nav).resize(pad_body);

/*
 * EVENTS
 **/
$(window).on('activate.bs.scrollspy', function(test) {
  var active_nav = $(nav).find('.nav-link.active');
  if (!active_nav.length) {
    return;
  }
  var hash = $(active_nav).attr('href').substr(1);
  var elem = $('#' + hash);

  if (!elem.length) {
    return;
  }

  elem.attr('id', '');
  window.location.hash = hash;
  elem.attr('id', hash);
});

$(document).on('scroll', function() {
  var scroll_top = $(document).scrollTop();
  var ratio = (scroll_top / ($(document).height() - $(window).height())) * 100;
  $(progress).css('width', ratio + '%').attr('aria-valuenow', ratio);

  if (scroll_top > nav_offset) {
    $(nav_container).addClass('sticky');
    $(body).css('padding-top', nav_height + nav2_height);
  } else {
    $(nav_container).removeClass('sticky');
    $(body).css('padding-top', '');
  }
});

$('#navbar-primary a').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();
    var hash = this.hash;
    $('html, body').animate({
      scrollTop: $(hash).offset().top - nav_height
    }, 300, function() {
      window.location.hash = hash;
    });
  }

  if ($(navbar_content).hasClass('show')) {
    $(navbar_content).collapse('hide');
  }
});

/*
 * FUNCTION DEFINITIONS
 **/
function pad_body() {
  $(body).attr('data-offset', nav_height);
  nav_height = $(nav).outerHeight(true);
  nav_offset = $(nav).offset().top;
  // $(body).css('padding-top', nav_height);
}

function init_google_maps() {
  var contact_width = $(contact).outerWidth(true);
  var contact_height = $(contact).outerHeight(true);
  $(contact).find('.background').css('background-image', 'url("https://maps.googleapis.com/maps/api/staticmap?center=Southlake,TX&size=' + contact_width + 'x' + contact_height + '&scale=2&key=AIzaSyARRSeM4bHtBL-h93O5rW9Tn1IkssWBtOc")');
}
