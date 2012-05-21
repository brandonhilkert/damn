$: << File.expand_path('../lib', __FILE__)

require 'rubygems'
require 'damn'

map '/assets' do
  run Damn::App.sprockets
end

map '/' do
  run Damn::App
end
