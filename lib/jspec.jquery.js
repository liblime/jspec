
// JSpec - jQuery - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

JSpec.include({
  
  // --- Initialize
  
  init : function() {
    this.requires('jQuery', 'when using jspec.jquery.js')
    jQuery.ajaxSetup({ async : false })
  },
  
  // --- Utilities
  
  utilities : {
    element : jQuery,
    elements : jQuery,
    sandbox : function() {
      return jQuery('<div class="sandbox"></div>')
    }
  },
  
  preprocessing : function(input) {
    return input.replace(/end/g, '}').replace(/it/g, '{')
  },
  
  // --- Matchers
  
  matchers : {
    have_tag      : "jQuery(expected, actual).length == 1",
    have_one      : "alias have_tag",
    have_tags     : "jQuery(expected, actual).length > 1",
    have_many     : "alias have_tags",
    have_child    : "jQuery(actual).children(expected).length == 1",
    have_children : "jQuery(actual).children(expected).length > 1",
    have_text     : "jQuery(actual).text() == expected",
    have_value    : "jQuery(actual).val() == expected",
    be_visible    : "!jQuery(actual).is(':hidden')",
    be_hidden     : "jQuery(actual).is(':hidden')",
    be_enabled    : "!jQuery(actual).attr('disabled')",
    have_class    : "jQuery(actual).hasClass(expected)",

    have_classes : function(actual) {
      return !JSpec.any(JSpec.argumentsToArray(arguments, 1), function(arg){
        return !JSpec.does(actual, 'have_class', arg)
      })
    },

    have_attr : function(actual, attr, value) {
      return value ? jQuery(actual).attr(attr) == value:
                     jQuery(actual).attr(attr)
    },
    
    'be disabled selected checked' : function(attr) {
      return 'jQuery(actual).attr("' + attr + '")'
    },
    
    'have type id title alt href src sel rev name target' : function(attr) {
      return function(actual, value) {
        return JSpec.does(actual, 'have_attr', attr, value)
      }
    }
  }
})

