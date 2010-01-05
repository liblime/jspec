
process.mixin(require('sys'))
require.paths.unshift('spec', 'spec/lib', 'lib')
require('jspec')
require('spec/unit/spec.helper')
require('yourlib')

quit = process.exit
print = puts

readFile = function(path) {
  var result
  require('posix')
    .cat(path, "utf8")
    .addCallback(function(contents){ result = contents })
    .addErrback(function(){ throw new Error("failed to read file `" + path + "'") })
    .wait()
  return result
}

if (process.ARGV[2])
  JSpec.exec('spec/unit/' + process.ARGV[2] + '.spec.js')  
else
  JSpec
    .exec('spec/unit/spec.js')
JSpec.run({ reporter: JSpec.reporters.Terminal })
JSpec.report()
