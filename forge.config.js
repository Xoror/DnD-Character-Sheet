module.exports = {
  packagerConfig: {
    "asar": true,
    "ignore": ["^(\/src$)", "^(\/public$)", "^(\/node_modules$)", ".gitignore", "forge.config.js", "LICENSE", "README.md"],
    "icon" : "./public/StargazerLogo"
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
