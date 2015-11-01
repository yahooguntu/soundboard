require_relative 'server'

task :serve do
  system(File.join('node_modules', '.bin', 'webpack'))
  set :environment, :production
  App.run!
end
