#!/bin/bash
# ──────────────────────────────────────────────
# YCMuse Prototype — Local Preview Server
# ──────────────────────────────────────────────

PORT=8080
DIR="$(cd "$(dirname "$0")" && pwd)"

# ── 取得區網 IP ───────────────────────────────
LOCAL_IP=$(ipconfig getifaddr en0 2>/dev/null)
[ -z "$LOCAL_IP" ] && LOCAL_IP=$(ipconfig getifaddr en1 2>/dev/null)
[ -z "$LOCAL_IP" ] && LOCAL_IP=$(ipconfig getifaddr en2 2>/dev/null)
[ -z "$LOCAL_IP" ] && LOCAL_IP=$(ipconfig getifaddr bridge0 2>/dev/null)

if [ -z "$LOCAL_IP" ]; then
  echo ""
  echo "  ⚠️  Cannot detect Wi-Fi IP. Make sure you're connected to Wi-Fi."
  LOCAL_IP="localhost"
fi

# ── 啟動 server ───────────────────────────────
cd "$DIR"
python3 -m http.server $PORT --bind 0.0.0.0 &>/dev/null &
SERVER_PID=$!
sleep 0.8

echo ""
echo "  ╔══════════════════════════════════════════╗"
echo "  ║       YCMuse Prototype Server            ║"
echo "  ╚══════════════════════════════════════════╝"
echo ""
echo "  ✅ Running on:"
echo "     Local   → http://localhost:$PORT"
echo "     Network → http://$LOCAL_IP:$PORT"
echo ""
echo "  📱 QR Code pages (open on desktop, then scan with phone):"
echo "     http://localhost:$PORT/qr.html     → muse-prototype-v2 (current)"
echo "     http://localhost:$PORT/qr-v1.html  → muse-prototype-v1 (07/23 backup, for RD comparison)"
echo "     http://localhost:$PORT/qr-draft.html → muse-prototype"
echo "     http://localhost:$PORT/qr-icon.html  → muse-prototype-icon"
echo ""
echo "  ⚠️  Phone must be on the same Wi-Fi as this Mac"
echo "  Press Ctrl+C to stop."
echo ""

# ── 開啟 qr.html，並把 LAN IP 帶入 query param ──
open "http://localhost:$PORT/qr.html?host=$LOCAL_IP:$PORT"

# ── 等待中斷 ─────────────────────────────────
wait $SERVER_PID
