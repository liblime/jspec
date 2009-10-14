
require 'rubygems'
require 'rake'
require 'echoe'

def version
  $1 if File.read('lib/jspec.js').match /version *: *'(.*?)'/
end

Echoe.new "jspec", version do |p|
  p.author = "TJ Holowaychuk"
  p.email = "tj@vision-media.ca"
  p.summary = "JavaScript BDD Testing Framework"
  p.url = "http://visionmedia.github.com/jspec"
  p.runtime_dependencies << "sinatra"
  p.runtime_dependencies << "json_pure"
  p.runtime_dependencies << "commander >=4.0.0"
  p.runtime_dependencies << "bind >=0.2.8"
end

namespace :spec do
  desc 'Run jspec executable specs'
  task :bin do
    sh 'spec --color --require spec/ruby/bin/spec_helper.rb spec/ruby/bin/*_spec.rb'
  end
end

namespace :pkg do
  desc 'Build package'
  task :build => ['pkg:clear'] do
    begin
      # TODO: finish
    rescue Exception => e
      puts "Failed to package: #{e}."
    else 
      puts "Packaging of JSpec-#{version} completed."
    end
  end
  
  desc 'Clear packaging'
  task :clear do
    if File.directory? 'pkg'
      sh 'rm -fr pkg/*'
      sh 'rmdir pkg'
    end
  end
end

def minify from, to
  sh "jsmin < #{from} > #{to}"
end

def compress from, to
  File.open(to, 'w+') do |file|
    file.write File.read(from).gsub(/(^[\t ]*)|\n/, '')
  end
end