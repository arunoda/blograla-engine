#!/bin/bash

curl -X POST \
  -d '{"items": [{"aa": 10}]}' \
  -H 'Content-Type: application/json' \
  http://localhost:2448/hubbub/callback/10

