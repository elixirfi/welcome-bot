echo "Install latest node"
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

echo "Jump to app folder"
cd /home/ubuntu/Elixir-Welcome-Bot

echo "stop index.js"
pm2 stop index.js
pm2 delete index.js

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
npm install

echo "Run new PM2 action"
pm2 start index.js
