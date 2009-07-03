
ExampleModule = {
  utilities : {
    doFoo : function(){ return 'foo' },
    doBar : function(){ return 'bar' }
  },
  randomHook : function(a, b) {
    return [a, b]
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