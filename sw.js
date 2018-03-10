if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js')
  .then(function(registration) {
    console.log('service worker 注册成功');
  }).catch(function (err) {
    console.log('servcie worker 注册失败');
  });
}

self.importScripts("https://cdnjs.cat.net/ajax/libs/sw-toolbox/3.6.1/sw-toolbox.js");
self.toolbox.options.debug = false;
self.toolbox.options.networkTimeoutSeconds = 3;

/* staticImageCache */
self.toolbox.router.get("/(.*)", self.toolbox.cacheFirst, {
  origin: /repo\.lzmun\.com/,
  cache: {
      name: staticImageCacheName,
      maxEntries: maxEntries
  }
});

self.addEventListener("install",
function(event) {return event.waitUntil(self.skipWaiting())
});
self.addEventListener("activate",
function(event) {return event.waitUntil(self.clients.claim())
})