const express = require('express');
const { ExpressPeerServer } = require('peer');
const http = require('http');
const path = require('path');
const os = require('os');

const app = express();
const server = http.createServer(app);

// PeerJS signaling server
const peerServer = ExpressPeerServer(server, {
  debug: false,
  path: '/',
  allow_discovery: true,
});

app.use('/peerjs', peerServer);
app.use(express.static(path.join(__dirname, 'public')));

// Get local IP
function getLocalIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

const PORT = 3000;
server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║          ZenCALL Server Running        ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║  Local   : http://localhost:${PORT}       ║`);
  console.log(`║  Network : http://${ip}:${PORT}     ║`);
  console.log('╠════════════════════════════════════════╣');
  console.log('║  Bagi URL Network ke teman 1 WiFi      ║');
  console.log('╚════════════════════════════════════════╝\n');
});
