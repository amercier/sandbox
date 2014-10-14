#!/usr/bin/env ruby

# Syntax: word_counter.rb data/angelfire.txt
# =>
#   a => 80
#   fox => 10
#   the => 50
#   ...

require 'json'

if ARGV.count != 1
  puts "Syntax: #{__FILE__} FILE"
  exit 1
end

path = ARGV[0]

# Check if file exists
if !File.exists?(path)
  puts "File #{path} does not exists"
  exit 1
end

# Check id file is not a dir
if File.directory?(path)
  puts "File #{path} is a directory"
  exit 1
end

# Check if file is readable
if !File.readable?(path)
  puts "File #{path} is not readable"
  exit 1
end

# Chick if file is empty
if File.zero?(path)
  puts "File #{path} is empty"
  exit 1
end

file = File.open(path)

# Read file line by line
words = {}
strip_expr = /(\A[\.\,:;\!\?\-"'\(\)\[\]\{\}]+|[\.\,:;\!\?\-"'\(\)\[\]\{\}]+\Z)/
file.each do |line|
  # Read line word by word, and count
  line.strip.split(/([[:space:]]|--)/).each do |word|
    word = word.strip.gsub(strip_expr, '').downcase
    if word != ""
      if words.has_key? word
        words[word] += 1
      else
        words[word] = 1
      end
    end
  end
end

# Sort by popularity (most popular first)
words = words.sort
#words = words.sort_by { |word, count| -count }

# words.each do |key, value|
#   puts "#{value}\t#{key}"
# end
#puts words.inspect
puts JSON.generate(words)
