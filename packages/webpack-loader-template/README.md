# @aiou/webpack-loader-template
> webpack loader starter

[![npm](https://img.shields.io/npm/v/@aiou/wepack-loader-template?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/core) [![GitHub](https://img.shields.io/github/license/jiangweixian/templates?style=for-the-badge)](https://github.com/JiangWeixian/templates/tree/master/packages/wepack-loader-template)

## Note

- replace all `webpack-loader-template` by real `{ webpack-loader-name }`

## Features

- [typescript]()
- [example]() - config in `/examples/basic-react/build/webpack.common.config.js`

## Dev

**Setup**

```
npm install
npm run dev
```

**Build**

```
npm run build
```

## Q&A

- the exec queue of webpack-loaders
   
   ```js
   [
     {
       loader: 'loader-one'
     },
     {
       loader: 'loader-two'
     },
   ]
   ```

   `loader-two` is before `loader-one`

- how webpack-loader work
  
  webpack output resouce-file in string-format to webpack-loader

- some suggestions
  - `tsc` is better than `rollup`