#!/bin/bash
# Compress all PNGs > 200KB in assets/images/newsletter using pngquant

find assets/images/newsletter -type f -name "*.png" -size +200k | while read img; do
  echo "Compressing $img..."
  pngquant --quality=80-90 --ext .png --force "$img"
done 