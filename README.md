# i18n-packages
> Everything about i18n.

## old project
> eg: webpack3

```js
const include = [
  path.join(__dirname, "../src"),
  path.join(__dirname, "../node_modules/@jswork/i18n-language-detect/dist"),
];

const babelLoader = {
  test: /\.(js|jsx|mjs)$/,
  include,
  loader: "babel-loader",
};
```