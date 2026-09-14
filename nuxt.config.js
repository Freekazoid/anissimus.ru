export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  manifest: {
    name: 'Architectural design - Екатерина Анисимова',
    short_name: 'Architectural design',
    orientation: 'portrait',
    description: 'Архитектурное проектирование зданий, проектирование жилых домов, проектирование общественных зданий, дизай-проект интерьера, оформление интерьера, комплектация объекта мебелью и декором, объёмная 3d визуализация, проект интерьера',
    icons: [
      {
        "src": "/icons/apple-touch-icon-iphone-60x60.png",
        "sizes": "60x60",
        "type": "image/png"
      },
      {
        "src": "/icons/apple-touch-icon-ipad-76x76.png",
        "sizes": "76x76",
        "type": "image/png"
      },
      {
        "src": "/icons/apple-touch-icon-iphone-retina-120x120.png",
        "sizes": "120x120",
        "type": "image/png"
      },
      {
        "src": "/icons/apple-touch-icon-ipad-retina-152x152.png",
        "sizes": "152x152",
        "type": "image/png"
      }
    ],
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    start_url: './',
    lang: 'ru-RU',
    useWebmanifestExtension: false
  },

  loading: '~/components/loading.vue',

  head: {
    title: 'Architectural design',
    meta: [
      { charset: 'utf-8' },
      { name: 'description', content: 'Архитектурное проектирование зданий, проектирование жилых домов, проектирование общественных зданий, дизай-проект интерьера, оформление интерьера, комплектация объекта мебелью и декором, объёмная 3d визуализация, проект интерьера' },
      { name: 'keywords', content: 'Эксклюзивный интерьер,элитный интерьер,архитектура,роскошный интерьер,лучшие интерьерные решения,элитныйинтерьер,люксдизайн,люксинтерьер,премиумдизайн,премиуминтерьер,luxuryliving,дизайнеркраснодаринтерьер,студиядизайна,элитныеквартиры,архитекторсочи,интерьеркраснодар,дизайнеринтерьеровсочи,interiordesign,дизайнер,дизайнгостинойсочи,дизайнстудиякраснодар,элитнаянедвижимость,дизайнинтерьеровкраснодар,дизайнбюро,архитектордизайнер,дизайнинтерьераквартиры,дизайнинтерьеракраснодар,дизайнкухнигостиной,дизайнинтерьерасочи,дизайнеранисимова,екатеринаанисимовадизайнер,архитекторанисимова,designedbyanissimus,анисимоваекатерина' },
      { name: "author", content: "Екатерина Анисимова" },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0' },
      { name: "HandheldFriendly", content: "True" },
      { "http-equiv": "Content-language", content: "ru-RU" },
      { name: "Robots", content: "INDEX, FOLLOW" },
      { name: "Document-state", content: "Static" },
      { "http-equiv": "Cache-Control", content: "Public" },

      { "http-equiv": "cleartype", content: "on" },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { "http-equiv": "X-UA-Compatible", content: "IE=edge" },
      { "http-equiv": "imagetoolbar", content: "no" },
      { "http-equiv": "msthemecompatible", content: "no" },
      { name: "format-detection", content: "telephone=no" },
      { name: "format-detection", content: "address=no" }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~assets/fonts/fonts.css',
    '~assets/css/reset.css',
  ],

  router: {
    linkActiveClass: 'active'
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/sandMail.js', mode: 'client' },
    { src: '~/plugins/nuxtClientInit.js', mode: 'client' }
  ],

  // Server middleware: dev-only image serving (PHP не выполняется на :3000)
  serverMiddleware: [
    '~/serverMiddleware/image.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  // components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'Architectural design - Екатерина Анисимова',
      short_name: 'anissimus.ru',
      orientation: 'portrait',
      description: 'Архитектурное проектирование зданий, проектирование жилых домов, проектирование общественных зданий, дизай-проект интерьера, оформление интерьера, комплектация объекта мебелью и декором, объёмная 3d визуализация, проект интерьера',
      icons: [
        {
          "src": "/icons/apple-touch-icon-iphone-60x60.png",
          "sizes": "60x60",
          "type": "image/png"
        },
        {
          "src": "/icons/apple-touch-icon-ipad-76x76.png",
          "sizes": "76x76",
          "type": "image/png"
        },
        {
          "src": "/icons/apple-touch-icon-iphone-retina-120x120.png",
          "sizes": "120x120",
          "type": "image/png"
        },
        {
          "src": "/icons/apple-touch-icon-ipad-retina-152x152.png",
          "sizes": "152x152",
          "type": "image/png"
        }
      ],
      display: 'standalone',
      background_color: '#FFFFFF',
      theme_color: '#FFFFFF',
      start_url: './',
      lang: 'ru-RU',
      useWebmanifestExtension: false
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
    src: "nuxt.config.js",
    use: "@nuxtjs/now-builder",
    config: {
      serverFiles: ["package.json"]
    }
  }
}
