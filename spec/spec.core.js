
describe 'Positive specs'

  it 'should pass'
    'test'.should_equal('test')
  end
  
  it 'should pass with several assertions'
    'foo'.should_equal('foo')
    'bar'.should_equal('bar')
    'bar'.should_not_equal('foo')
  end
  
  // it 'should pass using chaining of assertions'
  //   'foo'.should_equal('foo').should_be true
  // end
  
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
    'hey there'.should_include 'hey'
    [1, 2, 3].should_include 2
    [1, 2, 3].should_not_include 5
    { hey : 'there' }.should_include 'hey'
  end
  
  it 'be_a'
    'test'.should_be_a String
    [].should_be_an Array
  end
  
  it 'throw_error'
    function() { throw 'error' }.should_throw_error
    function() { return 'test' }.should_not_throw_error
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
    'test'.should_not_eql('test')
  end

  it 'should fail with one faulty assertion'
    'test'.should_equal('test')
    'test'.should_equal('foo')
  end
  
  it 'should fail and print array with square braces'
    [1,2].should_equal([1,3])
  end
  
  it 'Fail with negative message'
    '1'.should_not_be_true
  end
  
  it 'Fail with positive message'
    false.should_be_true
  end
  
  it 'Fail second assertion message'
    true.should_be_true
    'bar'.should_include('foo')
    'bar'.should_match(/foo/)
  end
  
end

describe 'Misc'

  it 'should parse a query string'
    JSpec.query('suite', '?suite=Positive specs').should_equal 'Positive specs'
  end

  it 'requires implementation'
  end

end

