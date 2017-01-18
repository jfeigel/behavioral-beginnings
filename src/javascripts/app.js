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
var nav1 = $('#navbar-primary');
var nav2 = $('#navbar-secondary');
var navbar_content = $('#navbarContent');
var progress = $('.progress-bar');

var nav1_height = get_outer_height(nav1, true);
var nav1_offset = $(nav1).offset().top;
var nav2_height = get_outer_height(nav2, true);
var nav_height = nav1_height + nav2_height;

/*
 * INIT FUNCTIONS
 **/
$.material.init();
calculate();

$(window).resize(function() {
  nav1_height = get_outer_height(nav1, true);
  nav1_offset = $(nav1).offset().top;
  nav2_height = get_outer_height(nav2, true);
  nav_height = nav1_height + nav2_height;

  calculate();
});

/*
 * EVENTS
 **/
$('body').on('activate.bs.scrollspy', function() {
  var active_nav = $(nav1).find('li.active');
  if (!active_nav.length) {
    return;
  }
  var link = $(active_nav).find('a');
  if (!link.length) {
    return;
  }
  var hash = $(link).attr('href').substr(1);
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

  calculate();
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
function calc_nav() {
  nav1_height = get_outer_height(nav1, true);
  nav1_offset = $(nav1).offset().top;
  nav2_height = get_outer_height(nav2, true);
  nav_height = nav1_height + nav2_height;
}

function pad_body() {
  $(body).attr('data-offset', nav_height);
  var scroll_top = $(document).scrollTop();

  if (scroll_top >= nav1_offset) {
    $(nav_container).addClass('sticky');
    $(body).css('padding-top', nav_height);
  } else {
    $(nav_container).removeClass('sticky');
    $(body).css('padding-top', '');
  }
}

function get_outer_height(elem, withMargin) {
  if (!elem || !$(elem).length) {
    return undefined;
  }

  if (!withMargin) {
    withMargin = false;
  }

  return $(elem).is(':visible') ? $(elem).outerHeight(withMargin) : 0;
}

function calculate() {
  $(body).attr('data-offset', nav_height);
  var scroll_top = $(document).scrollTop();
  var is_sticky = $(nav_container).hasClass('sticky');

  if (scroll_top > nav2_height) {
    $(nav_container).addClass('sticky');
    $(body).css('padding-top', nav_height);
  } else {
    $(nav_container).removeClass('sticky');
    $(body).css('padding-top', '');
  }
}
