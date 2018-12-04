import successBox from './src/main';

/* istanbul ignore next */
successBox.install = function(Vue) {
  Vue.component(successBox.name, successBox);
};

export default successBox;
