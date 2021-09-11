#!/bin/bash
rm -Rf starter-templates
cp -R ../starter-templates .
yes | rm -Rf starter-templates/**/.git
yes | rm -Rf starter-templates/**/node_modules
yes | rm -Rf starter-templates/**/dist