
describe 'JSpec'
  describe '.mockRequest'
    it 'should mock XMLHttpRequests un unmockRequest() is called or the spec block has finished'
      mockRequest.and_return('test')
      XMLHttpRequest.should.eql JSpec.XMLHttpRequest
      unmockRequest()
      XMLHttpRequest.should.not.eql JSpec.XMLHttpRequest
    end
    
    it 'should mock XMLHttpRequests'
      mockRequest.and_return('{ foo : "bar" }', 'application/json', 200)
      $.getJSON('test', function(response){
        response.should.eql { foo : 'bar' }
      })
    end
    
    it 'should restore original XMLHttpRequest constructor'
      XMLHttpRequest.should.eql JSpec.defaultXMLHttpRequest
      XMLHttpRequest.should.not.eql JSpec.XMLHttpRequest
    end
    
    it 'should populate textStatus'
      mockRequest.and_return('bar', 'text/plain', 200)
      $.getJSON('foo', function(response, textStatus){
        response.should.eql 'bar'
        textStatus.should.eql 'OK'
      })
    end
  end
end