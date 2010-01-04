
require.paths.unshift('./lib', './spec');
process.mixin(require('sys'))

require("jspec")
require("helpers")

quit = process.exit
print = puts

readFile = function(path) {
  var promise = require('posix').cat(path, "utf8")
  var result = ''
  promise.addErrback(function(){ throw new Error("failed to read file `" + path + "'") })
  promise.addCallback(function(contents){
    result = contents
  })
  promise.wait()
  return result
}

JSpec
.exec('spec/unit/spec.js')
.exec('spec/unit/spec.utils.js')
.exec('spec/unit/spec.modules.js')
.exec('spec/unit/spec.matchers.js')
.exec('spec/unit/spec.shared-behaviors.js')
.exec('spec/unit/spec.grammar.js')
.exec('spec/unit/spec.grammar-less.js')
//.exec('spec/unit/spec.fixtures.js') TODO: when exceptions bubble properly uncomment
.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true, fixturePath: 'spec/fixtures' })
.report()