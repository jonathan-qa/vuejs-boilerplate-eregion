#!/bin/bash

set -e

SERVER_PID=""

cleanup() {
  if [ -n "${SERVER_PID}" ] && kill -0 "${SERVER_PID}" 2>/dev/null; then
    kill "${SERVER_PID}" 2>/dev/null || true
    wait "${SERVER_PID}" 2>/dev/null || true
  fi
}
trap cleanup EXIT

echo 'Installing dependencies ...'
npm ci

echo 'Starting application server ...'
npm run serve &
SERVER_PID=$!

echo 'Waiting for application at http://localhost:8080/ ...'
ready=0
for i in $(seq 1 60); do
  if curl -sf "http://localhost:8080/" >/dev/null; then
    ready=1
    break
  fi
  if ! kill -0 "${SERVER_PID}" 2>/dev/null; then
    echo "Error: application server exited before becoming ready"
    exit 1
  fi
  sleep 2
done

if [ "${ready}" -ne 1 ]; then
  echo "Error: timed out waiting for application server"
  exit 1
fi

echo 'Run End2End Test'
node_modules/.bin/cypress run

echo 'Test finished'
