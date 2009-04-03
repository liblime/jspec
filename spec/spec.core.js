
describe 'Positive specs'

  before_each
    .one = true
  end

  it 'should pass'
    'test'.should_equal('test')
  end
  
  it 'should pass with several assertions'
    'foo'.should_equal('foo')
    'bar'.should_equal('bar')
    'bar'.should_not_equal('foo')
  end
  
  describe 'with nesting'
    before
      .foo = true
    end
    
    before_each
      .foobar = true
      .foobar2 = true
    end
    
    it 'should allow assertions'
      true.should.be_true
    end
    
    it 'should allow before blocks'
      .one.should.be_true
      .foo.should.be_true
      .foobar.should.be_true
      .foobar2.should.be_true
    end
    
    describe 'should'
      before 
        .bar = true
      end
      
      before_each 
        .barfoo = true
        .foobar2 = false
      end
      
      it 'allow multiple levels of nesting'
        true.should.be_true
      end
      
      it 'should allow before blocks'
        .bar.should.be_true
        .barfoo.should.be_true
      end
      
      it 'should inherit before blocks from previous suites'
        .foo.should.be_true
        .foobar.should.be_true
      end
      
      it 'should trump previous suite before blocks'
        .foobar2.should.be_false
      end
    end
  end
  
end

describe 'Matchers'

  it 'eql'
    'test'.should_eql 'test'
    '1'.should_eql 1
    '1'.should_be 1
    [1, 2].should_eql [1, 2]
    [1, 2, [3], { foo : 'bar' }].should_eql [1, 2, [3], { foo : 'bar' }]
    { foo : 'bar' }.should_eql { foo : 'bar' }
  end
  
  it 'equal'
    'test'.should_equal 'test' 
    '1'.should_not_equal 1
  end
  
  it 'match'
    'foobar'.should_match(/foo/)
    'foobar'.should_not_match(/barfoo/)
  end
  
  it 'be_empty'
    var string = '', array = []
    string.should_be_empty
    array.should_be_empty
  end
  
  it 'be_null'
    var foo = null
    foo.should_be_null
    'test'.should_not_be_null
  end
  
  it 'have_length'
    'test'.should_have_length 4
  end
  
  it 'have_length_within'
    'foo'.should_have_length_within 2..4
  end
  
  it 'respond_to'
    'test'.should_not_respond_to('whatever')
    'test'.should_respond_to('toString')
  end
  
  it 'include'
    123.should_include 1, 2, 3
    { hey : 'there' }.should_include 'hey'
    /(foo)?bar/.should_include '(foo)'
    function(){ return foo }.should_include "return foo"
    [1, 2, 3].should_include 2
    [1, 2].should_include 1, 2
    [1, [2]].should_include [2]
    [1, 2, 3].should_not_include 5, 6
    ['foo', 'bar'].should_include 'foo', 'bar'
    ['foo', 'bar'].should_include 'bar', 'foo'
    ['foo', 'bar'].should_not_include 'foo', 'rawr'
    ['foo', 'bar'].should_not_include 'rawr', 'foo'
  end
  
  it 'be_a'
    'test'.should_be_a String
    [].should_be_an Array
  end
  
  it 'throw_error'
    -{ throw 'error' }.should_throw_error
    -{ return 'test' }.should_not_throw_error
    -{ throw 'some foo bar' }.should.throw_error('some foo bar')
    -{ throw 'some foo bar' }.should.throw_error(/foo bar/)
    -{ throw 'some foo bar' }.should.not.throw_error(/rawr/)
    -{ throw 'some foo bar' }.should.not.throw_error('rawr')
  end
  
  it 'be_type'
    'hey'.should_be_type('string')
    {}.should_be_type('object')
    function(){}.should_be_type('function')
  end
  
  it 'be_within'
    5.should_be_within 1..10
    15.should_not_be_within 10..5
  end
  
  it 'have'
    person = { pets : ['izzy', 'niko'] }
    person.should.have 2, 'pets'
    person.should.not.have 3, 'pets'
  end
  
  it 'have_at_least'
    person = { pets : ['izzy', 'niko'] }
    person.should.have_at_least(1, 'pets')
    person.should.have_at_least(2, 'pets')
    person.should.not.have_at_least(3, 'pets')
  end
  
  it 'have_at_most'
    person = { pets : ['izzy', 'niko'] }
    person.should.have_at_most(2, 'pets')
    person.should.have_at_most(3, 'pets')
    person.should.not.have_at_most(1, 'pets')
  end
  
  it 'have_within'
    person = { pets : ['izzy', 'niko'] }
    person.should.have_within(1..2, 'pets')
    person.should.have_within(2..5, 'pets')
    person.should.not.have_within(5..10, 'pets')
  end
  
end

describe 'Position hooks'
  
  before 
    .beforeSpecNum = 0
    .afterSpecNum = 0
    .passBefore = true
  end
  
  before_each
    .beforeSpecNum++
  end
  
  after_each 
    .afterSpecNum++
  end
  
  it 'before should work'
    .passBefore.should_be_true
  end
  
  it 'before should work again'
    .passBefore.should_be_true
  end
  
  it 'before / after each should work'
    .beforeSpecNum.should_equal 3
    .afterSpecNum.should_equal 2
  end
  
end

describe 'Pre-processor'

  it 'should allow parens to be optional when no args are passed'
    true.should_be_true
    true.should_be_true()
  end
  
  it 'should allow parens to be optional with args'
    'foobar'.should_include 'foo'
    'rawr'.should_not_include 'foo'
  end
  
  it 'should allow literals without assigning as variables'
    {}.should_be_an Object
  end
  
  it 'should allow alternative closure literal'
    -{ throw 'test' }.should_throw_error
  end
  
  it 'should allow . this. literal'
    this.foo = 'bar'
    .foo.should_eql 'bar'
  end
  
  it 'should allow inclusive range literal n..n'
    1..5.should_eql [1,2,3,4,5]
    3..4.should_eql [3,4]
    1..1.should_eql [1]
    3..1.should_eql [3,2,1]
  end
  
  it 'should allow dot style assertions'
    'foo'.should.equal('foo')
    'foo'.should.equal 'foo'
    'bar'.should_not.equal('foo')
    'bar'.should_not.equal 'foo'
  end
  
  it 'should allow dotted negation'
    'bar'.should.not.equal('foo')
    'bar'.should.not.equal 'foo'
  end

end

describe 'Custom Contexts'

  before 
    JSpec.context = { iLike : 'cookies' }
  end
  
  after
    JSpec.context = null
  end

  it 'should allow helpers'
    .iLike.should_equal 'cookies'
  end

end

describe 'Negative specs'

  it 'should fail'
    'test'.should_not_eql 'test' 
  end

  it 'should fail with one faulty assertion'
    'test'.should_equal 'test' 
    'test'.should_equal 'foo' 
  end
  
  it 'should fail and print array with square braces'
    [1,2].should_equal [1,3] 
  end
  
  it 'should fail and print nested array'
    [1, ['foo']].should_equal [1, ['bar', ['whatever', 1.0, { foo : 'bar', bar : { 1 : 2 } }]]]
  end
  
  it 'should fail and print html elements'
    a = document.createElement('a')
    a.setAttribute('href', 'http://vision-media.ca')
    a.should_not_eql a
  end
  
  it 'should fail with selector for jQuery objects'
    element = { jquery : '1.3.1', selector : '.foobar' } 
    element.should_eql 'foo'
  end
  
  it 'should fail with negative message'
    '1'.should_not_be_true
  end
  
  it 'should fail with positive message'
    false.should_be_true
  end
  
  it 'should fail with function body'
    -{ rawr }.should.not.throw_error
  end
  
  it 'should fail with message of first failure'
    true.should_be_true
    'bar'.should_match(/foo/gm)
    'bar'.should_include 'foo'
  end
  
  it 'should fail with list'
    ['foo', 'bar'].should.include 'foo', 'car'
  end
  
end

describe 'Misc'

  it 'should parse a query string'
    JSpec.query('suite', '?suite=Positive%20specs').should_equal 'Positive specs'
    JSpec.query('foo', '?suite=Positive%20specs').should_be_null
  end
  
  it 'should strip whitespace or characters specified'
    JSpec.strip(" foo \n\n").should_equal 'foo'
    JSpec.strip('[foo]', '\\[\\]').should_equal 'foo'
  end
  
  it 'requires implementation'
  end

end

