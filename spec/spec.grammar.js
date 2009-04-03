
describe 'JSpec grammar'

  it 'should allow "it" spec literal'
    true.should.be_true
  end
  
  n = 10
  it 'should allow literal javascript outside of blocks'
    n.should.eql 10
  end
  
  describe 'with nested describe'
    it 'should work'
      true.should.be_true
    end
    
    it 'should still allow literal javascript outside of blocks'
      n.should.eql 10
    end
    
    describe 'nested again'
      it 'should still work'
        true.should.be_true
      end
    end
  end
  
  describe 'before / after blocks'
    before
      .n = 1
    end
    
    after 
      .n = 0
    end
    
    it 'should work'
      .n.should.eql 1
      .n++
    end
    
    it 'should persist'
      .n.should.eql 2
    end
    
    describe 'with nested describe'
      it 'should be accessable'
        .n.should.eql 0
      end
    end
  end
  
  describe 'before_each / after_each blocks'
    before_each
      .n = 1
    end
    
    after_each
      .o = 2
    end
    
    it 'should work'
      .n.should.eql 1
      .n = 2
      .o.should.be_null
    end
    
    it 'should not persist'
      .n.should.eql 1
      .o.should.eql 2
    end
    
    describe 'with nested describe'
      it 'should be accessable'
        .n.should.eql 1
        .o.should.eql 2
      end
    end
  end
  
end