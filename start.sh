pkill -f "ruby server.rb"
sleep 1
screen rerun -i static/dist "rake 'serve[production]'"
