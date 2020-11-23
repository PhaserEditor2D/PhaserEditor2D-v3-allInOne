#!/bin/bash
SCRIPT=$(readlink -f "$0")
DIR=$(dirname "$SCRIPT")

echo [Desktop Entry] > phasereditor2d-PhaserEditor2D.desktop
echo Type=Application >> phasereditor2d-PhaserEditor2D.desktop
echo Name=Phaser Editor 2D v3 >> phasereditor2d-PhaserEditor2D.desktop
echo GenericName=Game IDE >> phasereditor2d-PhaserEditor2D.desktop
echo Comment=HTML5 game development editor. >> phasereditor2d-PhaserEditor2D.desktop
echo Terminal=false >> phasereditor2d-PhaserEditor2D.desktop
echo Exec=$DIR/PhaserEditor2D >> phasereditor2d-PhaserEditor2D.desktop
echo Icon=$DIR/resources/app/linux-assets/icon.png >> phasereditor2d-PhaserEditor2D.desktop

chmod +x ./phasereditor2d-PhaserEditor2D.desktop
xdg-desktop-icon install ./phasereditor2d-PhaserEditor2D.desktop
xdg-desktop-menu install ./phasereditor2d-PhaserEditor2D.desktop --mode user 
xdg-desktop-menu forceupdate --mode user

echo Done!