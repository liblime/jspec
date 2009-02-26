
// JSpec - jQuery - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// TODO: have_attr('attr', value)

(function($){
  
  // --- Dependencies

  $.requires('jQuery', 'when using jspec.jquery.js')
  
  // --- Async Support

  jQuery.ajaxSetup({ async : false })

  // --- Helpers

  $.defaultContext.element = jQuery
  $.defaultContext.elements = jQuery
  $.defaultContext.defaultSandbox = $.defaultContext.sandbox
  $.defaultContext.sandbox = function() { return jQuery($.defaultContext.defaultSandbox()) }

  // --- Matchers

  $.addMatchers({
    have_tag      : "jQuery(expected, actual).length == 1",
    have_tags     : "jQuery(expected, actual).length > 1",
    have_child    : "jQuery(actual).children(expected).length == 1",
    have_children : "jQuery(actual).children(expected).length > 1",
    have_class    : "jQuery(actual).hasClass(expected)",
    have_text     : "jQuery(actual).text() == expected",
    have_value    : "jQuery(actual).val() == expected",
    be_visible    : "jQuery(actual).css('display') != 'none'",
    be_hidden     : "jQuery(actual).css('display') == 'none'",
  })  
  
})(JSpec)


