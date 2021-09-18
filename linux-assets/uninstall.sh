#!/bin/bash
xdg-desktop-icon uninstall ./phasereditor2d-PhaserEditor2D.desktop
xdg-desktop-menu uninstall ./phasereditor2d-PhaserEditor2D.desktop --mode user 
xdg-desktop-menu forceupdate --mode user

echo Done!