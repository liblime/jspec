
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
    be_visible    : "!jQuery(actual).is(':hidden')",
    be_hidden     : "jQuery(actual).is(':hidden')",
    be_disabled   : "jQuery(actual).get(0).disabled === true",
    be_enabled    : "jQuery(actual).get(0).disabled === false && jQuery(actual).get(0).type != 'hidden'",
    
    have_attr : { match : function(actual, attr, value) {
        if (value) return $(actual).attr(attr) == value
        else return !! $(actual).attr(attr)
      }
    }
  })
  
  $.each('checkbox radio file password submit image text reset button'.split(' '), function(i, type){
    JSpec.matchers['be_a_' + type + '_input'] = "jQuery(actual).get(0).type == '" + type + "'"
  })
  
})(jQuery)


