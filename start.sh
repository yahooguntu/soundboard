git pull

pkill -f "ruby server.rb"
sleep 1
screen ruby server.rb -e production
