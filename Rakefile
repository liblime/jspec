
desc 'Package'
task :package => [:clear] do
  begin
    sh 'mkdir pkg'
    sh 'cp -fr lib/* pkg'
    minify 'lib/jspec.js', 'pkg/jspec.min.js'
    minify 'lib/jspec.jquery.js', 'pkg/jspec.jquery.min.js'
    compress 'lib/jspec.css', 'pkg/jspec.min.css'
    sh 'git add pkg/.'
  rescue Exception => e
    puts "Failed to package: #{e}."
  else 
    puts "Packaging of JSpec-#{version} completed."
  end
end

desc 'Open for development in Safari 4'
task :open do
  sh 'open -a Safari spec/spec.html'
end

desc 'Bind'
task :bind do
  require 'rubygems'
  require 'bind'
  action = Bind::Actions::RefreshBrowsers.new 'spec/spec.html', 'Safari'
  listener = Bind::Listener.new :paths => ['lib/*.js', 'spec/*.js'], :interval => 1, :actions => [action], :debug => $stdout
  listener.run!
end

desc 'Clear packaging'
task :clear do
  if File.directory? 'pkg'
    sh 'rm -fr pkg/*'
    sh 'rmdir pkg'
  end
end

desc 'Display compression savings of last release'
task :savings do
  totals = Hash.new { |h, k|  h[k] = 0 }
  format = '%-20s : %0.3f kb'
  totals = %w( pkg/jspec.min.js pkg/jspec.jquery.min.js pkg/jspec.min.css ).inject totals do |total, file|
    uncompressed = File.size(file.sub('.min', '')).to_f / 1024
    compressed = File.size(file).to_f / 1024
    saved = uncompressed - compressed
    puts format % [file.sub('pkg/', ''), saved]
    totals[:saved] += saved
    totals[:uncompressed] += uncompressed
    totals[:compressed] += compressed
    totals
  end
  puts
  puts format % ['total uncompressed', totals[:uncompressed]]
  puts format % ['total compressed', totals[:compressed]]
  puts format % ['total saved', totals[:saved]]
end

def minify from, to
  sh "jsmin < #{from} > #{to}"
end

def compress from, to
  File.open(to, 'w+') do |file|
    file.write File.read(from).gsub(/(^[\t ]*)|\n/, '')
  end
end

def version
  $1 if File.read('lib/jspec.js').match /version *: *'(.*?)'/
end