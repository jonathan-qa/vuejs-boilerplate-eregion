module.exports = {
  // Vue SFCs use {{ }} for data binding. Without this, vue-cli's Handlebars
  // pass treats those mustaches as template variables and empties them during
  // `vue init` (e.g. <h1>{{ msg }}</h1> becomes <h1></h1>).
  skipInterpolation: [
    'src/**/*.vue',
    'tests/**/*.vue',
  ],
};
