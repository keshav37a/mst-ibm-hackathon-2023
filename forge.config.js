module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {
        name: "mind-space-tracker-hck-2023",
      },
    },
    {
      name: "@electron-forge/maker-deb",
      config: {
        name: "mind-space-tracker-hck-2023",
      },
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {
        name: "mind-space-tracker-hck-2023",
      },
    },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        name: "mind-space-tracker-hck-2023",
        format: "ULFO",
      },
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin", "linux", "win32"],
    },
  ],
};
