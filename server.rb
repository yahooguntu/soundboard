require 'sinatra'
require 'json'
require 'open3'

SOUND_DIR = './sounds'

get '/' do
  'Hello world!'
end

get '/list', provides: :json do
  {sounds: sounds_list}
end

post '/play', provides: :json do
  json_params = JSON.parse request.body.read
  full_path = full_sound_path json_params['file']

  halt 404, {error: :not_found} unless File.exists? full_path

  play_sound(full_path)

  {status: :ok}
end


def play_sound path
  puts "Playing #{path}"
  stdin, stdout, stderr = Open3.popen3("./play-sound #{path}")
end

def full_sound_path filename
  filename.gsub! /\.\./, ''
  File.join(SOUND_DIR, filename)
end

def sounds_list
  Dir.new(SOUND_DIR).entries.reject { |e| e[0] == '.' }
end
