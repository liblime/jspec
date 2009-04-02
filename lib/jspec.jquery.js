
// JSpec - jQuery - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

(function($){

  // --- Dependencies

  JSpec.requires('jQuery', 'when using jspec.jquery.js')
  
  // --- Async Support

  $.ajaxSetup({ async : false })

  // --- Helpers

  JSpec.defaultContext.element = $
  JSpec.defaultContext.elements = $
  JSpec.defaultContext.defaultSandbox = JSpec.defaultContext.sandbox
  JSpec.defaultContext.sandbox = function() { return $(JSpec.defaultContext.defaultSandbox()) }

  // --- Matchers

  JSpec.addMatchers({
    have_tag      : "jQuery(expected, actual).length == 1",
    have_one      : "alias have_tag",
    have_tags     : "jQuery(expected, actual).length > 1",
    have_many     : "alias have_tags",
    have_child    : "jQuery(actual).children(expected).length == 1",
    have_children : "jQuery(actual).children(expected).length > 1",
    have_class    : "jQuery(actual).hasClass(expected)",
    have_text     : "jQuery(actual).text() == expected",
    have_value    : "jQuery(actual).val() == expected",
    be_visible    : "jQuery(actual).css('display') != 'none'",
    be_hidden     : "jQuery(actual).css('display') == 'none'",
    
    have_attr : {
      match : function(actual, attr, value) {
        return !!(value ? $(actual).attr(attr) == value : $(actual).attr(attr))
      }
    }
  })  
  
})(jQuery)


