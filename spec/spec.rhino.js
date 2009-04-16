
load('lib/jspec.js')

JSpec.options.formatter = JSpec.formatters.Terminal
JSpec.options.failuresOnly = true

JSpec
.exec('spec/spec.grammar.js')
.exec('spec/spec.core.js')
.run()
.report()