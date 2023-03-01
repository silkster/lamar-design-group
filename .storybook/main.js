const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    const isCssRule = (rule) =>
      rule.test && rule.test instanceof RegExp && rule.test.test('./file.css');

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    config.resolve.extensions.push('.ts', '.tsx');

    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          ...config.module.rules.filter((rule) => !isCssRule(rule)),
          {
            test: /\.css$/,
            oneOf: [
              {
                resourceQuery: /module/,
                use: [
                  'vue-style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      modules: {
                        localIdentName: '[local]_[hash:base64:5]',
                      },
                    },
                  },
                ],
              },
              {
                use: ['style-loader', 'css-loader'],
              },
            ],
          },
        ],
      },
    };
  },
};
