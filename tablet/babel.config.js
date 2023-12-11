module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: [
            '.ios.js', 
            '.android.js', 
            '.ios.jsx', 
            '.android.jsx', 
            '.js', 
            '.jsx', 
            '.json', 
            '.ts', 
            '.tsx',
          ],
          alias: {
            '@assets': './src/assets',
            '@class': './src/class',
            '@components': './src/components',
            '@service': './src/service',
            '@utils': './src/utils',
          },
        },
      ],
    ],
};
