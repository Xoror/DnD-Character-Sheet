module.exports = {
  packagerConfig: {
    "asar": true,
    "ignore": ["^(\/src$)", "^(\/public$)", "^(\/node_modules$)", ".gitignore", "forge.config.js", "LICENSE", "README.md"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
