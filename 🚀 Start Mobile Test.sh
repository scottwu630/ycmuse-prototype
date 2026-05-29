#!/bin/bash

PORT=8888
FOLDER="/Users/scottwu/Desktop/Perfect Crop/Design Proposal/YCM/Claude/YCMuse App"
FILE="muse-prototype-v2.html"

# Try WiFi (en0) then Ethernet (en1)
IP=$(ipconfig getifaddr en0 2>/dev/null)
[ -z "$IP" ] && IP=$(ipconfig getifaddr en1 2>/dev/null)
[ -z "$IP" ] && IP=$(ipconfig getifaddr en2 2>/dev/null)

if [ -z "$IP" ]; then
  echo "❌ Could not detect your local IP. Make sure you're connected to WiFi."
  read -p "Press Enter to exit..."
  exit 1
fi

URL="http://$IP:$PORT/$FILE"

echo ""
echo "╔════════════════════════════════════════╗"
echo "║       YouCam Muse — Mobile Test        ║"
echo "╠════════════════════════════════════════╣"
echo "║  📡 Your local IP : $IP"
echo "║  🌐 Prototype URL : $URL"
echo "╚════════════════════════════════════════╝"
echo ""
echo "▶ Starting local server on port $PORT..."

# Kill any existing server on that port
lsof -ti :$PORT | xargs kill -9 2>/dev/null
sleep 0.5

# Start the server in background
cd "$FOLDER"
python3 -m http.server $PORT &>/tmp/muse-server.log &
SERVER_PID=$!
sleep 1

# Check if server started OK
if ! lsof -ti :$PORT &>/dev/null; then
  echo "❌ Server failed to start. Check that Python 3 is installed."
  exit 1
fi

echo "✅ Server running (PID $SERVER_PID)"
echo ""
echo "▶ Opening QR code in your browser — scan it with your iPhone..."

# Open QR code in browser
QR_URL="https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=20&data=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$URL'))")"
open "$QR_URL"

echo ""
echo "📱 On your iPhone: open Camera → point at QR code → tap the link"
echo "   (Make sure iPhone is on the same WiFi as this Mac)"
echo ""
echo "Press Ctrl+C to stop the server when done testing."
echo ""

# Keep running until user stops
trap "echo ''; echo '⛔ Server stopped.'; kill $SERVER_PID 2>/dev/null; exit 0" INT
wait $SERVER_PID
