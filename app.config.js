export default {
  expo: {
    name: 'Liquid Glass',
    slug: 'liquid-glass',
    version: '1.0.0',
    orientation: 'portrait',
    userInterfaceStyle: 'automatic',
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      bundleIdentifier: 'com.liquidglass.app',
      requireFullScreen: true
    },
    android: {
      package: 'com.liquidglass.app'
    },
    web: {
      bundler: 'metro',
      output: 'single'
    },
    plugins: ['expo-notifications']
  }
};
