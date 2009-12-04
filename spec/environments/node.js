
require.paths.unshift('./lib', './spec');
process.mixin(require('sys'))

require("jspec")
require("helpers")

quit = process.exit
print = puts

readFile = function(path) {
  var promise = require('posix').cat(path, "utf8")
  var result = ''
  promise.addErrback(function(){ throw "failed to read file `" + path + "'" })
  promise.addCallback(function(contents){
    result = contents
  })
  promise.wait()
  return result
}

JSpec
.exec('spec/spec.js')
.exec('spec/spec.utils.js')
.exec('spec/spec.modules.js')
.exec('spec/spec.matchers.js')
.exec('spec/spec.shared-behaviors.js')
.exec('spec/spec.grammar.js')
.exec('spec/spec.grammar-less.js')
.exec('spec/spec.fixtures.js')
.run({ reporter: JSpec.reporters.Terminal, failuresOnly: true })
.report()
