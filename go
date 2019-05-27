#!/usr/bin/env bash

yarn -s
yarn start-server &
yarn start-client
