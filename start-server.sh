#!/bin/bash

# Nopier Houses Development Server
# Starts a local HTTP server on port 8000 for the static site

PORT=8000

# Get the directory where this script lives
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Stopping any existing server on port $PORT..."
PIDS=$(lsof -ti :$PORT 2>/dev/null || true)
if [ -n "$PIDS" ]; then
    echo $PIDS | xargs kill -9 2>/dev/null || true
else
    echo "(none running)"
fi
sleep 0.5

echo ""
echo "Starting server..."
echo "  URL:     http://localhost:$PORT"
echo "  Serving: $SCRIPT_DIR"
echo ""
echo "Press Ctrl+C to stop the server."
echo ""

cd "$SCRIPT_DIR"
python3 -m http.server $PORT --bind 127.0.0.1
