pkill -f "ruby server.rb"
sleep 1
screen rerun 'ruby server.rb -e production'
