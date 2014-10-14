#!/usr/bin/env ruby

# Syntax: url_parser.rb 'http://www.slideshare.net/tag/marketing/4?media=all&sort=latest'
# =>
#   media => all
#   sort  => latest
#   page  => 4
#   tag   => marketing

if ARGV.count != 1
  puts "Syntax: #{__FILE__} URL"
  exit 1
end

url = ARGV[0]

# 0 => whole URL
# 1 => scheme
# 2 => domain+port+path
# 4 => query string
# 6 => fragment
if (matches = /\A([a-z]+):\/\/([^\?]+)(\?([^#]*))?(#(.*))?\Z/.match url) == nil
  puts "Invalid url: #{url}"
  exit 1
end

vars = {}

query_string = matches[4]
query_string.split('&').each do |token|
  parts = token.split(/\A([^=]*)=/)
  if parts.count == 1
    vars[parts[0]] = nil
  else
    vars[parts[1]] = parts[2]
  end
end

puts vars.inspect