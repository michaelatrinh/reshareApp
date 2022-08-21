const { getDefaultConfig } = require("@expo/metro-config");

const defaultCongif = getDefaultConfig(__dirname);

defaultCongif.resolver.assetExts.push("cjs");

module.exports = defaultCongif;
