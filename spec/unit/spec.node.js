
describe 'node'
  describe 'matchers'
    describe 'have_enumerable_property'
      it 'should check if a property is enumerable'
        { foo: 'bar' }.should.have_enumerable_property 'foo'
        var o = {}
        Object.defineProperty(o, 'foo', { value: 'bar', enumerable: false })
        o.should.not.have_enumerable_property 'bar'
      end
    end
  end
end