
describe 'DOM Sandbox'

  before_each
    .dom = this.defaultSandbox() // Normall sandbox() jQuery helpers override this
  end
  
  it 'should allow creation of sandboxes'
    .dom.should_be_a HTMLDivElement
  end
  
end