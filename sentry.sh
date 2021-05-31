#!/bin/bash

VERSIONID=$(sentry-cli releases propose-version)
VERSION = $(jq '.version' package.json)

echo "{ \"release\": \"$VERSIONID\" }" >"release.json"

echo "version is $VERSION ($VERSIONID)"

sentry-cli releases new -p texas-holdem $VERSIONID
sentry-cli releases set-commits --auto $VERSIONID
sentry-cli releases files $VERSIONID upload-sourcemaps ./lib
sentry-cli releases finalize $VERSIONID

echo "Successfully released version $VERSION to github!"
