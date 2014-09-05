var fs = require('fs');

var JavaScriptFormatter = function() {
  this.formatAnswers = function(answers) {
    return {
      DATE: new Date(),
      BASE_PATH: answers.basePath,
      FRAMEWORKS: this.formatFrameworks(answers.frameworks),
      FILES: this.formatFiles(answers.files, answers.onlyServedFiles),
      EXCLUDE: this.formatFiles(answers.exclude, []),
      AUTO_WATCH: answers.autoWatch ? 'true' : 'false',
      BROWSERS: this.formatBrowsers(answers.browsers),
      PREPROCESSORS: this.formatPreprocessors(answers.preprocessors)
    };
  };
};

exports.JavaScript = JavaScriptFormatter;