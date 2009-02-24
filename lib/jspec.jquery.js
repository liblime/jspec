
// JSpec - jQuery - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

// TODO: fix stupid sizzle bug
// TODO: have_attr('attr', value)
// TODO: events etc

(function(JS){
  
  // --- Dependencies

  JS.requires('jQuery', 'when using jspec.jquery.js')
  
  // --- Async Support

  jQuery.ajaxSetup({ async : false })

  // --- Helpers

  JS.defaultContext.element = jQuery
  JS.defaultContext.elements = jQuery
  JS.defaultContext.defaultSandbox = JS.defaultContext.sandbox
  JS.defaultContext.sandbox = function() { return jQuery(JS.defaultContext.defaultSandbox()) }

  // --- Matchers

  JS.addMatchers({
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


