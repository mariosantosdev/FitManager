module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@components": "./src/components",
            "@contexts": "./src/contexts",
            "@screens": "./src/screens",
            "@routes": "./src/routes",
            "@utils": "./src/utils",
          },
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
