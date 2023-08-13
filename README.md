# DnD 5e Character sheet made with React and Electron

This is a digital, interactive, saveable character sheet designed for DnD 5e. It is meant to be easily customizable, with a certain amount of automation (like calculating attribute and proficiency bonus, spell slots, adding of SRD spells and items etc.) to provide some quality-of-life. It's available as both a [web version](https://xoror.github.com) and a [desktop version](https://drive.google.com/drive/folders/1lmS-msB2soHSBrwhpCoX6ALHuDqlYbn0?usp=sharing). The desktop version may trigger some anti-virus programs because it's not a signed installer (out of monetary reasons) but it is 100% safe!

Programmatically, the switch between the two versions happens in the SettingsSlice.js. If the variable "dekstop" is true, it will build the desktop version which includes a SQLite database for characters and window buttons like close/minimize/maximize. If it's set to false, it will build the web version which instead of the database includes buttons to import/export a character's state.

### Web version

To start a dev version use "npm run bstart"
To build the site use "npm run ebuild"

### Desktop version

The desktop version is made by using Electron, a chromium based framework, and electron-forge to package and make an installer.  
To start an electron developer build, go to main.js in the Electron folder and comment out "win.loadFile('./build/index.html')" and instead uncomment "win.loadURL('http://localhost:3000')" while also running a dev version at the same time via "npm run bstart".
Run "npm run start" or "npm run estart" to run a developer electron environment.  
Run "npm run package" to package the electron application and "npm run make" to package the app and make an installer at the same time  
