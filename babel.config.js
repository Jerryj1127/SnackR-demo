module.exports = {
  presets: [
    'module:metro-react-native-babel-preset', // Ensures React Native specific transformation
    '@babel/preset-env', // Ensures latest JavaScript syntax is supported
    '@babel/preset-react', // Ensure React JSX is compiled properly
  ],
  plugins: [
    ['@babel/plugin-transform-class-properties', { loose: false }], 
    ['@babel/plugin-transform-private-methods', { loose: false }],
  ]
};


