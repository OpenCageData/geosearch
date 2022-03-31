#!/usr/bin/env bash

cd examples/advanced-example

ln -sf ../../packages/geosearch-core/dist

cd ../simple-example

ln -sf ../../packages/geosearch-bundle/dist

cd ../leaflet-plugin-example

ln -sf ../../packages/leaflet-opencage-geosearch dist

cd ../openlayers-library-example

ln -sf ../../packages/ol-opencage-geosearch dist
