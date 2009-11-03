
load('JSPEC_ROOT/lib/jspec.js')
load('JSPEC_ROOT/lib/jspec.xhr.js')
load('lib/yourlib.js')
load('spec/spec.helper.js')

JSpec
.exec('spec/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'spec/fixtures' })
.report()