
describe 'JSpec'
  describe 'Server'
    describe 'route'
      describe '/slow'
        it 'should sleep for n seconds'
          $.getJSON('/slow/2', function(res) {
            true.should.be_true
          })
        end
      end
    end
  end
end