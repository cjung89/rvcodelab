importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.precaching.precacheAndRoute([
  'http://assets.brstatic.com/content/fonts/CalibreWeb-Regular.woff2',
  'offline.html'
]);

workbox.routing.registerRoute(
    new RegExp('.*\.(?:jpg|gif|svg|png|woff2).*'),
    workbox.strategies.staleWhileRevalidate()
);

const htmlHandler = workbox.strategies.networkOnly();

// requests for HTML.
const navigationRoute = new workbox.routing.NavigationRoute(({event}) => {
  return htmlHandler.handle({event}).catch(() => caches.match('./offline.html'));
});

workbox.routing.registerRoute(navigationRoute);


workbox.skipWaiting();
workbox.clientsClaim();
