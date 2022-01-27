// source: https://github.com/evanw/esbuild/issues/1374#issuecomment-861801905

export var process = {
    env: new Proxy(
      {},
      {
        get: () => '',
      }
    ),
};
