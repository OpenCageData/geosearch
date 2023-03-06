#!/usr/bin/env bash

if [ $# -lt 1 ]; then
    echo "Usage: $0 <key>"
    exit
fi
rm -f .env
echo "VITE_OPENCAGE_SEARCH_TOKEN=$1" >>.env
