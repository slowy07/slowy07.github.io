#!/bin/bash
rxfetch 2>/dev/null | sed 's/\x1b\[[0-9;]*m//g' > "$(dirname "$0")/../public/system-info.txt"
