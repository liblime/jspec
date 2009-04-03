
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
    
    describe 'when nested further'
      before 
        .bar = true
      end
      
      before_each 
        .barfoo = true
        .foobar2 = false
      end
      
      it 'should allow multiple levels of nesting'
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
  describe 'eql'
    it 'should work with strings'
      'test'.should.eql 'test'
      'test'.should.not.eql 'foo'
    end
    
    it 'should work with numbers'
      11.should.eql 11
      10.should.not.eql 11
    end
    
    it 'should loosely compare numbers as strings'
      '11'.should.eql 11
      '10'.should.not.eql 11
    end
    
    it 'should hash compare arrays'
      [1, 2].should.eql [1, 2]
      [1, 2].should.not.eql [1, 3]
      [1, 2, [3], { foo : 'bar' }].should.eql [1, 2, [3], { foo : 'bar' }]
    end
    
    it 'should hash compare objects'
      { foo : 'bar' }.should.eql { foo : 'bar' }
    end
  end
  
  describe 'equal'
    it 'should perform strict comparisons'
      'test'.should.equal 'test'
      '1'.should.not.equal 1
    end
  end
  
  describe 'match'
    it 'should match regular expressions'
      'foobar'.should.match(/foo/)
      'foobar'.should.not.match(/barfoo/)
    end
  end
  
  describe 'be_empty'
    it 'should consider any object responding to a length of 0 to be empty'
      ''.should.be_empty
      ' '.should.not.be_empty
      [].should.be_empty
      { length : 0 }.should.be_empty
    end
  end
  
  describe 'be_null'
    it 'should check if a value is null'
      null.should.be_null
      0.should.not.be_null
    end
  end
  
  describe 'have_length'
    it 'should compare the length of an object'
      'foo'.should.have_length 3
      [1, 2].should.have_length 2
    end
  end
  
  describe 'have_length_within'
    it 'should check if an object has a length within the specified range'
      'foo'.should.have_length_within 2..4
      'f'.should.not.have_length_within 2..4
    end
  end
  
  describe 'respond_to'
    it 'should check if an object contains a method'
      'test'.should.respond_to('toString')
      'test'.should.not.respond_to('rawr')
    end
  end
  
  describe 'include'
    it 'should check if an object includes a property'
      { hey : 'there' }.should.include 'hey'
      { hey : 'there' }.should.not.include 'foo'
    end
    
    it 'should check if a regular expression includes a string'
      /(foo)?bar/.should.include '(foo)'
    end
    
    it 'should check if a function body includes a string'
      -{ return [foo, bar] }.should.include 'foo', 'bar'
      -{ return foo }.should.include(/foo|bar/)
    end
    
    it 'should check if an array contains element(s)'
      [1,2,3].should.include 1
      [1,2,3].should.include 1, 2, 3
      [1].should.not.include 0
      ['foo', 'bar'].should.include 'foo', 'bar'
      ['foo', 'bar'].should.include 'bar', 'foo'
      ['foo', 'bar'].should.not.include 'foo', 'rawr'
      ['foo', 'bar'].should.not.include 'rawr', 'foo'
    end
    
    it 'should check hashes of array elements'
      [1, [2]].should.include [2]
      [1, [2]].should.include [2], 1
      [1, { two : 'three' }].should.include { two : 'three' } 
    end
  end
  
  describe 'be_a'
    it 'should compare the constructor of an object'
      'test'.should.be_a String
      [].should.be_an Array
    end
  end

  describe 'throw_error'
    it 'should check if an error is thrown'
      -{ throw 'error' }.should_throw_error
      -{ return 'test' }.should_not_throw_error
    end
    
    it 'should check if an error with a specific message is thrown'
      -{ throw 'some foo bar' }.should.throw_error('some foo bar')
      -{ throw 'some foo bar' }.should.throw_error(/foo bar/)
      -{ throw 'some foo bar' }.should.not.throw_error(/rawr/)
      -{ throw 'some foo bar' }.should.not.throw_error('rawr')
    end
  end
  
  describe 'be_type'
    it 'should compare the type of an object via typeof'
      'hey'.should.be_type 'string'
      {}.should.be_type 'object'
    end
  end

  describe 'be_within'
    it 'should check if a number is within a range'
      5.should.be_within 1..10
      15.should.not.be_within 10..5
    end
  end
  
  describe 'have'
    it 'should check the length of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have 2, 'pets'
      person.should.not.have 3, 'pets'
    end
  end
  
  describe 'have_at_least'
    it 'should check if a object has at least n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_at_least 1, 'pets'
      person.should.have_at_least 2, 'pets'
      person.should.not.have_at_least 3, 'pets'
    end
  end
  
  describe 'have_at_most'
    it 'should check if an object has at most n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_at_most(2, 'pets')
      person.should.have_at_most(3, 'pets')
      person.should.not.have_at_most(1, 'pets')
    end
  end
  
  describe 'be_within'
    it 'should check that an object has within n..n of a property'
      person = { pets : ['izzy', 'niko'] }
      person.should.have_within(1..2, 'pets')
      person.should.have_within(2..5, 'pets')
      person.should.not.have_within(5..10, 'pets')
    end
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

