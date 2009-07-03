
ExampleModule = {
  utilities : {
    foo : function(){ return 'foo' },
    bar : function(){ return 'bar' }
  },
  beforeSpec  : function() { addedBeforeSpec = true },
  afterSpec   : function() { addedAfterSpec = true },
  beforeSuite : function() { addedBeforeSuite = true },
  afterSuite  : function() { addedAfterSuite = true },
  matchers : {
    be_foo_bar : function() {
      return true
    }
  }
}

JSpec.include(ExampleModule)