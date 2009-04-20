
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
    it('should work', function(){
      expect(true).not_to('be', false)
    })
  })
  
})