interface Options {
  /**
   * The output directory for locales.
   * @default 'public/locales'
   */
  dest?: string;
}

const defaults: Options = {
  dest: 'public/locales',
};

export default (inOptions?: Options) => {
  const { dest } = {
    ...defaults,
    ...inOptions,
  } as Required<Options>;

  console.log('vite-i18next-loader options:', { dest });

  return {
    name: 'vite-i18next-loader',
    handleHotUpdate: async ({ file, server }) => {
      console.log('handleHotUpdate', file);
      if (file.endsWith('.json')) {
        server.ws.send({
          type: 'full-reload', // 完整刷新
        });
      }
    },
  };
};
