
describe 'Utility'
  describe 'query'
    it 'should return a pairs value'
      JSpec.query('suite', '?suite=Positive%20specs').should.equal 'Positive specs'
    end
    
    it 'should return null when key is not present'
      JSpec.query('foo', '?suite=Positive%20specs').should.be_null
    end
  end
  
  describe 'strip'
    it 'should strip whitespace by default'
      JSpec.strip(" foo \n\n").should.equal 'foo'
    end
    
    it 'should strip the characters passed'
      JSpec.strip('[foo]', '\\[\\]').should.equal 'foo'
    end
  end
  
  describe 'each'
    it 'should iterate an array'
      result = []
      each([1,2,3], function(value){
        result.push(value)
      })
      result.should.eql [1,2,3]
    end
    
    it 'should iterate words in a string'
      result = []
      each('some foo bar', function(value){
        result.push(value)
      })
      result.should.eql ['some', 'foo', 'bar']
    end
  end
  
  describe 'map'
    it 'should return an array of mapped values'
      result = map([1,2,3], function(value){
        return value * 2
      })
      result.should.eql [2,4,6]
    end
    
    it 'should inherit the ability to iterate words in a string'
      result = map('some foo bar', function(i, value){
        return i + '-' + value
      })
      result.should.eql ['0-some', '1-foo', '2-bar']
    end
  end
  
  describe 'inject'
    it 'should provide a memo object while iterating'
      result = []
      inject([1,2,3], result, function(memo, value){
        memo.push(value)
        return memo
      })
      result.should.eql [1,2,3]
    end
  end
  
  describe 'any'
    it 'should return null when no matches are found'
      result = any('some foo bar', function(value){
        return value.length > 5
      })
      result.should.be_null
    end
    
    it 'should return the value of the first matching expression'
      result = any('foo some bar', function(value){
        return value.length > 3
      })
      result.should.eql 'some'
    end
  end
  
  describe 'last'
    it 'should return the last element in an array'
      last(['foo', 'bar']).should.eql 'bar'
    end
  end
  
  describe 'argumentsToArray'
    it 'should return an array of arguments'
      func = function(){ return argumentsToArray(arguments) }
      func('foo', 'bar').should.eql ['foo', 'bar']
    end
  end
end
