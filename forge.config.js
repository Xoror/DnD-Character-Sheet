module.exports = {
  packagerConfig: {
    "asar": true,
    "ignore": ["^(\/src$)", "^(\/public$)", ".gitignore", "forge.config.js", "LICENSE", "README.md"],
    "icon" : "./public/StargazerLogo",
    "extraResource": ["./Electron/database.db"]
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
      },
    },
    {
      name: '@electron-forge/maker-deb',
      config: {

      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
