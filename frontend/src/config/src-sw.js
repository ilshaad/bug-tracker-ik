console.log("iK src-sw.js file over here OKAY");

// eslint-disable-next-line no-undef
self.routing.registerRoute(
  /http:\/\/localhost:9000/,
  // eslint-disable-next-line no-undef
  self.strategies.cacheFirst()
);
