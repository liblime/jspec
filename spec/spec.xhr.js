
describe 'JSpec'
  describe '.mockRequest()'
    it 'should mock XMLHttpRequests un unmockRequest() is called or the spec block has finished'
      mockRequest()
      XMLHttpRequest.should.eql JSpec.XMLHttpRequest
      unmockRequest()
      XMLHttpRequest.should.not.eql JSpec.XMLHttpRequest
    end
    
    it 'should mock specific request URIs'
      mockRequest('test').and_return('{ foo : "bar" }', 'application/json', 200)
      $.getJSON('test', function(response){
        response.should.eql { foo : 'bar' }
      })
    end
    
    it 'should restore original XMLHttpRequest constructor'
      XMLHttpRequest.should.not.eql JSpec.XMLHttpRequest
    end
    
    it 'should mock request URIs matching a regexp'
      mockRequest(/^foo(bar)?/).and_return('{ foo : "bar" }', 'application/json', 200)
      $.getJSON('foobar', function(response){
        response.should.eql { foo : 'bar' }
      })
    end
    
    it 'should populate textStatus'
      mockRequest('foo').and_return('bar', 'text/plain', 404)
      $.getJSON('foo', function(response, textStatus){
        textStatus.should.eql 'Not Found'
      })
    end
  end
end