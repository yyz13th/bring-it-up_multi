export default {
  build: {
    rollupOptions: {
      external: [
        'src/assets/css/font.css',
        'src/assets/css/animate.css',
        'src/assets/css/style.css',
        'src/js/main.js'
      ]
    }
  }
}