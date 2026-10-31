const { contextBridge } = require("electron");

contextBridge.exposeInMainWorld("kucharka", {
  platform: process.platform,
});
