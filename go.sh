#!/usr/bin/env bash

set -euo pipefail

yarn -s
yarn start-server &
yarn start-client
