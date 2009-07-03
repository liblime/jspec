
describe 'JSpec'
  describe 'module'
    describe 'hooks'
      it 'should run in context with beforeSpec'
        addedBeforeSpec.should.be_true
        addedAfterSpec.should.be_false
      end

      it 'should run in context with afterSpec'
        addedBeforeSpec.should.be_true
        addedAfterSpec.should.be_true
      end

      it 'should run in context with beforeSuite'
        addedBeforeSuite.should.be_true
      end

      describe 'another suite'
        it 'should run in context with afterSuite'
          addedAfterSuite.should.be_true
        end
      end
    end
    
    describe '.hook()'
      it 'should invoke hooks, returning an array of results'
        results = hook('randomHook', 'foo', 'bar')
        results.should.eql [['foo', 'bar']]
      end
    end
    
    describe '.utilities'
      it 'should be merged with the default utilities'
        doFoo().should.eql 'foo'
        doBar().should.eql 'bar'
      end
    end
    
    describe '.matchers'
      it 'should be merged with default matchers'
        'test'.should.be_foo_bar
      end
    end
  end
end