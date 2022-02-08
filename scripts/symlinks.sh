#!/usr/bin/env bash

cd examples/advanced-example

ln -s ../../packages/geosearch-core/dist

cd ../simple-example

ln -s ../../packages/geosearch-bundle/dist

cd ../leaflet-plugin-example

ln -s ../../packages/leaflet-opencage-geosearch/dist
