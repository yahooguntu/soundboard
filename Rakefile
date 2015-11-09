require_relative 'server'

task :serve, :environment do |t, args|
  args.with_defaults(environment: :development)
  system(File.join('node_modules', '.bin', 'webpack'))
  set :environment, args[:environment]
  App.run!
end
