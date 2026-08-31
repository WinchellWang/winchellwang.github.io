---
layout: post
title: Download lyrics
subtitle: A python script to download music lyrics.
date: 2026-08-30
author: Winchell.Wang
header-img: "img/backgrounds/post-bg-tech.jpg"
tags:
    - Computer
    - Life Tips
header-mask: 0.2
catalog: true
mathjax: false
---

# Purpose

Download music lyrics from open source platform.

# Code

```python
#!/usr/bin/env python3
import os
import sys
import time
import urllib.request
import urllib.parse
import urllib.error
import json

try:
    from mutagen import File
except ImportError:
    print("Error: Please install the mutagen library first (pip install mutagen)")
    sys.exit(1)

def get_audio_metadata(file_path):
    """Read the artist and song title tags from an audio file"""
    try:
        audio = File(file_path, easy=True)
        if audio is None:
            return None, None
        
        title = audio.get('title', [None])[0]
        artist = audio.get('artist', [None])[0]
        return artist, title
    except Exception:
        return None, None

def fetch_lyrics(artist, song):
    """Call the API to fetch lyrics"""
    base_url = "https://lrclib.net/api/get"
    params = {"artist_name": artist, "track_name": song}
    url = f"{base_url}?{urllib.parse.urlencode(params)}"
    
    try:
        req = urllib.request.Request(
            url,
            headers={'User-Agent': 'Linux-Batch-LRC/1.0'}
        )
        with urllib.request.urlopen(req) as response:
            if response.status == 200:
                data = json.loads(response.read().decode('utf-8'))
                # Prefer returning timestamped LRC lyrics
                return data.get('syncedLyrics') or data.get('plainLyrics')
    except urllib.error.HTTPError as e:
        if e.code == 429:
            print("  [!] API request rate limit reached, automatically waiting 5 seconds...")
            time.sleep(5)
        return None
    except Exception:
        return None
    return None

def process_directory(directory):
    """Recursively traverse the directory and process audio files"""
    supported_exts = ('.mp3', '.flac', '.m4a', '.wav', '.ogg')
    
    # os.walk automatically traverses all subdirectories
    for root, dirs, files in os.walk(directory):
        for file in files:
            if not file.lower().endswith(supported_exts):
                continue
                
            file_path = os.path.join(root, file)
            # Generate the corresponding .lrc path (e.g. song.mp3 -> song.lrc)
            lrc_path = os.path.splitext(file_path)[0] + '.lrc'
            
            # Resume functionality: if a local lyrics file already exists,
            # skip it to save API requests
            if os.path.exists(lrc_path):
                continue
            
            artist, title = get_audio_metadata(file_path)
            
            if not artist or not title:
                print(f"[-] Missing tag information, skipping: {file}")
                continue
                
            print(f"[*] Matching: {artist} - {title}")
            lyrics = fetch_lyrics(artist, title)
            
            if lyrics:
                with open(lrc_path, 'w', encoding='utf-8') as f:
                    f.write(lyrics)
                print(f"  [+] Successfully saved: {os.path.basename(lrc_path)}")
            else:
                print(f"  [-] Lyrics not found")
            
            # Polite delay: processing 1,000+ songs requires a delay
            # to avoid being blocked by the server
            time.sleep(1.5)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 batch_lyrics.py <your_music_folder_path>")
        sys.exit(1)
        
    music_dir = sys.argv[1]
    if not os.path.isdir(music_dir):
        print(f"Error: Directory '{music_dir}' does not exist.")
        sys.exit(1)
        
    print(f"Starting directory scan: {music_dir}")
    process_directory(music_dir)
    print("All processing complete!")
```

# Guide

1. Run ``pip install mutagen`` in command
2. Copy the code above into python file and name it as ``get_lyrics.py``
2. Execute ``chmod +x get_lyrics.py`` for granting the access.
3. Execute ``./get_lyrics.py "/path/to/music/folder"``

The downloaded lyrics should be visible as *.lrc in the same folder as the music.