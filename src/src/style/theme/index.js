import Vue from 'vue'
class Theme {
  constructor() {
    this.options = {

    }
    this.init();
    return this;
  }
  init() {
    this.setColorSystem();
    this.setTheme();
  }
  setColorSystem() {
    this.colorSystem = {
      blue: {
        bodyClassName: 'theme-blue',
        $primary: '#2D7FE6',
        $chartBg: '#1E222F'
      },
      orange: {
        bodyClassName: 'theme-orange',
        $primary: '#FFA44C',
        $chartBg: '#1E222F'
      }
    }
  }
  setTheme(type = 'blue') {
    const color = this.colorSystem[type]
    if (!color) return;
    // console.log(color)
    document.querySelector('body').classList.add(color.bodyClassName);
    this.color = color;
    return this;
  }
}
Vue.prototype.$theme = Theme
export default new Theme();
