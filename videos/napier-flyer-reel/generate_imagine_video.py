#!/usr/bin/env python3
"""Image-to-video via xAI API with output.upload_url (works when Grok Build tool fails).

Requires a local PUT sink on PORT + cloudflared tunnel URL written to tunnel_url.txt.
Usage:
  python3 generate_imagine_video.py /path/to/image.jpg "prompt" out-name
"""
import base64, json, sys, time, urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent
auth = json.loads((Path.home()/".grok"/"auth.json").read_text())
tok = list(auth.values())[0]["key"]
tunnel = (OUT/"tunnel_url.txt").read_text().strip().rstrip("/")

img = Path(sys.argv[1]); prompt = sys.argv[2]; name = sys.argv[3]
raw = img.read_bytes()
mime = "image/png" if img.suffix.lower()==".png" else "image/jpeg"
body = {
  "model": "grok-imagine-video-1.5",
  "prompt": prompt,
  "duration": 6,
  "resolution": "720p",
  "image": {"url": f"data:{mime};base64,{base64.b64encode(raw).decode()}"},
  "output": {"upload_url": f"{tunnel}/{name}.mp4"},
}
req = urllib.request.Request(
  "https://api.x.ai/v1/videos/generations",
  data=json.dumps(body).encode(),
  headers={"Authorization": f"Bearer {tok}", "Content-Type": "application/json"},
  method="POST",
)
with urllib.request.urlopen(req, timeout=180) as r:
  job = json.loads(r.read().decode())
print(job)
rid = job["request_id"]
while True:
  req = urllib.request.Request(f"https://api.x.ai/v1/videos/{rid}", headers={"Authorization": f"Bearer {tok}"})
  with urllib.request.urlopen(req, timeout=30) as r:
    data = json.loads(r.read().decode())
  print(data.get("status"), data.get("progress"))
  if data.get("status") in ("done","failed","expired"):
    print(json.dumps(data, indent=2)[:1000])
    break
  time.sleep(5)
src = OUT/"uploads"/f"{name}.mp4"
print("local file:", src, "exists", src.exists(), "size", src.stat().st_size if src.exists() else 0)
