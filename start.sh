pkill -f "ruby server.rb"
sleep 1
screen rerun 'rake serve'
