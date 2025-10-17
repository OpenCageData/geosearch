#!/usr/bin/env bash

# https://stackoverflow.com/questions/5767062/how-to-check-if-a-symlink-exists
# if [ -e "$1" ]; then
#     if [ ! -L "$1" ]
#     then
#         echo "you entry is not symlink"
#     else
#         echo "your entry is symlink"
#     fi
# else
#   echo "=> File doesn't exist"
# fi

createSymLink() {
    if [ -e "$1" ]; then
        if [ ! -L "$1" ]; then
            echo "A folder or file already exist"
            exit 1
        else
            echo "Symbolic link already exists for" ${2}
        fi
    else
        echo "Creating symbolic link for" ${2}
        ln -sf ${2} ${1}
    fi
}

cd examples/advanced-example

# ln -sf ../../packages/geosearch-core/dist dist
createSymLink "dist" "../../packages/geosearch-core/dist"

cd ../simple-example

# ln -sf ../../packages/geosearch-bundle/dist dist
createSymLink "dist" "../../packages/geosearch-bundle/dist"

cd ../leaflet-plugin-example

# ln -sf ../../packages/leaflet-opencage-geosearch dist
createSymLink "dist" "../../packages/leaflet-opencage-geosearch/dist"

cd ../openlayers-library-example

# ln -sf ../../packages/ol-opencage-geosearch dist
createSymLink "dist" "../../packages/ol-opencage-geosearch"

cd ../multiple-sources

# ln -sf ../../packages/geosearch-bundle/dist dist
createSymLink "dist" "../../packages/geosearch-bundle/dist"
