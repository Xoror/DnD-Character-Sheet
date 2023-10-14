module.exports = {
  packagerConfig: {
    "asar": false,
    "ignore": ["^(\/src$)", "^(\/public$)", ".gitignore", "forge.config.js", "LICENSE", "README.md"],
    "icon" : "./public/StargazerLogo.ico",
    "extraResource": ["./Electron/resources/database.db"]
  },
  rebuildConfig: {},
  makers: [
    {
      "name": "@electron-forge/maker-wix",
      "config": {
        "icon" : "./public/StargazerLogo.ico",
        "ui": {
          "chooseDirectory": true
        }
      }
    }
  ],
};
