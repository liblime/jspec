
load('JSPEC_ROOT/lib/jspec.js')
load('JSPEC_ROOT/lib/jspec.xhr.js')
load('public/javascripts/application.js')

JSpec
.exec('spec/spec.js')
.run({ reporter: JSpec.reporters.Terminal, fixturePath: 'jspec/fixtures' })
.report()