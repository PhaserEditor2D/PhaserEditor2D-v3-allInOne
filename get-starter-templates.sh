#!/bin/bash

yes | rm -Rf starter-templates/**

cp -R ../starter-templates/starter-template-webpack starter-templates/
cp -R ../starter-templates/starter-template-basic-javascript starter-templates/
cp -R ../starter-templates/starter-template-basic-typescript starter-templates/

yes | rm -Rf starter-templates/**/.git
yes | rm -Rf starter-templates/**/node_modules
yes | rm -Rf starter-templates/**/dist