
JSpec.include({
  utilities : {
    mock_it : function(body) {
      var spec = new Spec('mock', body)
      var prev = JSpec.currentSpec
      runSpec(spec)
      JSpec.currentSpec = prev
      return spec
    }
  },
  
  matchers : {
    have_failure_message : function(spec, expected) {
      return any(spec.assertions, function(assertion){
        switch (expected.constructor) {
          case String: return assertion.message == expected
          case RegExp: return expected.test(assertion.message)
          default    : return false
        }
      })
    }
  }
})

describe 'Failing specs'

  it 'should fail'
    spec = mock_it(function(){
      'test'.should.not.eql 'test'
    })
    spec.should.have_failure_message("expected 'test' to not eql 'test'")
  end

  it 'should fail with one faulty assertion'
    spec = mock_it(function() {
      'test'.should.equal 'test' 
      'test'.should.equal 'foo'
    })
    spec.should.have_failure_message("expected 'test' to be 'foo'")
  end
  
  it 'should fail and print array with square braces'
    spec = mock_it(function() {
      [1,2].should.equal [1,3]
    })
    spec.should.have_failure_message("expected [ 1, 2 ] to be [ 1, 3 ]")
  end
  
  it 'should fail and print nested array'
    spec = mock_it(function() {
      [1, ['foo']].should.equal [1, ['bar', ['whatever', 1.0, { foo : 'bar', bar : { 1 : 2 } }]]]
    })
    spec.should.have_failure_message("expected [ 1, [ 'foo' ] ] to be [ 1, [ 'bar', [ 'whatever', 1, { 'foo' : 'bar', 'bar' : { '1' : 2 } } ] ] ]")
  end
  
  it 'should fail and print html elements'
    spec = mock_it(function() {
      elem = document.createElement('a')
      elem.setAttribute('href', 'http://vision-media.ca')
      elem.should.not.eql elem
    })
    spec.should.have_failure_message('expected <a href="http://vision-media.ca"></a> to not eql <a href="http://vision-media.ca"></a>')
  end
  
  it 'should fail with selector for jQuery objects'
    spec = mock_it(function() {
      elem = { jquery : '1.3.1', selector : '.foobar' } 
      elem.should.eql 'foo'  
    })
    spec.should.have_failure_message("expected selector '.foobar' to eql 'foo'")
  end
  
  it 'should fail with negated message'
    spec = mock_it(function(){
      '1'.should.not.be_true
    })
    spec.should.have_failure_message(/expected '1' to not be true/)
  end
  
  it 'should fail with positive message'
    spec = mock_it(function() {
      false.should.be_true
    })
    spec.should.have_failure_message(/expected false to be true/)
  end
  
  it 'should fail saying an error was throw'
    -{ throw 'foo' }.should.not.throw_error
  end
  
  it 'should fail saying which error has been thrown'
    -{ throw 'foo' }.should.throw_error 'bar'
  end
  
  it 'should fail saying no error was thrown'
    -{ }.should.throw_error 'foo'
  end
  
  it 'should fail saying no error matching was thrown'
    -{ throw 'bar' }.should.throw_error(/foo/)
  end
  
  it 'should fail saying no error matching foo should be thrown'
    -{ throw 'foo' }.should.not.throw_error(/foo/)
  end
  
  it 'should fail saying constructors'
    -{ throw new TypeError('oh no') }.should.throw_error(Error)
  end
  
  it 'should fail saying multiple arg messages'
    -{ throw new TypeError('oh no') }.should.throw_error(TypeError, /foo/)
  end
  
  it 'should fail with constructor name'
    function Foo(){}
    function Bar(){}
    Bar.prototype.toString = function(){ return 'Bar error: oh no' }
    -{ throw new Bar }.should.throw_error Foo
  end
  
  it 'should fail with function body string'
    -{ 'foo' }.should.not.include 'foo'
  end
  
  it 'should fail with constructor name'
    function Foo(){ this.toString = function(){ return '<Foo>' }}
    foo = new Foo
    foo.should.not.be_an_instance_of Foo
  end
  
  it 'should fail with message of first failure'
    true.should.be_true
    'bar'.should.match(/foo/gm)
    'bar'.should.include 'foo'
  end
  
  it 'should fail with list'
    ['foo', 'bar'].should.include 'foo', 'car'
  end
  
  it 'should catch exceptions throw within specs'
    throw new Error('Oh noes!')
  end
  
  it 'should catch improper exceptions'
    throw 'oh noes'
  end
  
  it 'should catch proper exceptions'
    iDoNotExist.neitherDoI()
  end
  
end

describe 'Contexts'
  before 
    JSpec.context = { iLike : 'cookies' }
  end

  after
    JSpec.context = null
  end

  it 'should be replaceable'
    iLike.should.equal 'cookies'
  end
end

describe 'Misc'
  it 'requires implementation'
  end
end

