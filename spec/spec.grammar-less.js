
JSpec.describe('Grammar-less', function(){
  var n
  
  before(function(){
    n = 1
  })
  
  it('should work', function(){
    expect(true).to('be', true)
    expect(n).to('equal', 1)
  })
  
  describe('with nested describes', function(){
    before_each(function(){
      n++  
    })
    
    it('should work', function(){
      expect(true).not_to('be', false)
      expect(n).to('eql', 2)
    })
    
    foo = 'bar'
    
    it('should work again', function(){
      expect(n).to('eql', 3)
      expect(foo).to('eql', 'bar')
      expect('foo').to('eql', 'bar')
    })
  })
  
})