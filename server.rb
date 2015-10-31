require 'sinatra'
require 'json'
require 'open3'
require 'erubis'
require 'tilt/erubis'
require 'fileutils'
require 'tempfile'

SOUND_DIR = './sounds'

# get '/' do
  @sounds = sounds_list
  erb :index
end

get '/list', provides: :json do
  {sounds: sounds_list}
end

post '/upload', provides: :json do
  begin
    filename = params['file'][:filename]
    FileUtils.mv(params['file'][:tempfile].path, "./sounds/#{filename}")
    ObjectSpace.undefine_finalizer(params['file'][:tempfile])
    {status: :ok, filename: filename}
  rescue
    {status: :not_ok}
  end
end

post '/update', provides: :json do
  msg = ''
  Open3.popen3("git pull") do |stdin, stdout, stderr|
    msg = stdout.read
    msg += stderr.read
  end
  {status: :ok, output: msg}
end

post '/play', provides: :json do
  json_params = JSON.parse request.body.read
  full_path = full_sound_path json_params['file']

  halt 404, {error: :not_found} unless File.exists? full_path

  play_sound(full_path)

  {status: :ok}
end


def play_sound path
  # escape spaces
  path.gsub!(/\ /, '\ ')

  puts "Playing #{path}"
  Open3.popen3("./play-sound #{path}")
end

def full_sound_path filename
  # don't allow parent directory nav
  filename.gsub!(/\.\./, '')

  File.join(SOUND_DIR, filename)
end

def sounds_list
  Dir.new(SOUND_DIR).entries.reject { |e| e[0] == '.' }
end
