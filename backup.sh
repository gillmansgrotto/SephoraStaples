#!/bin/sh
# Snapshot the live tracker data into backups/ (gitignored).
# Run occasionally — it's the only way to undo an accidental "Clear all" or a wiped database.
cd "$(dirname "$0")" || exit 1
mkdir -p backups
out="backups/tracker-backup-$(date +%Y-%m-%d-%H%M%S).json"
if curl -sf "https://rose-sephora-staples-default-rtdb.firebaseio.com/tracker.json" -o "$out"; then
  echo "Saved $out ($(wc -c < "$out" | tr -d ' ') bytes)"
else
  echo "Backup failed — is the network up?" >&2
  rm -f "$out"
  exit 1
fi
