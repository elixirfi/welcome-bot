echo "Install latest node"
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

echo "Jump to app folder"
cd /home/ubuntu/welcome-bot

echo "stop index.js"
pm2 stop all
pm2 delete all

echo "Update app from Git"
git pull

echo "Install app dependencies"
sudo rm -rf node_modules package-lock.json
npm install

echo "Run new PM2 action"
pm2 start index.js
