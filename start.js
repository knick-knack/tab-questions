var readline = require('readline');

var StateMachine = require('./state_machine');
var COLOR_SCHEME = require('./color_schemes');
var formatters = require('./formatters');

var questions = [{
  id: 'framework',
  question: 'Which testing framework do you want to use ?',
  hint: 'Press tab to list possible options. Enter to move to the next question.',
  options: ['jasmine', 'mocha', 'qunit', 'nodeunit', 'nunit', '']
  /*validate: validateFramework*/
}, {
  id: 'requirejs',
  question: 'Do you want to use Require.js ?',
  hint: 'This will add Require.js plugin.\n' +
        'Press tab to list possible options. Enter to move to the next question.',
  options: ['no', 'yes'],
  boolean: true
}, {
  id: 'browsers',
  question: 'Do you want to capture any browsers automatically ?',
  hint: 'Press tab to list possible options. Enter empty string to move to the next question.',
  options: ['Chrome', 'ChromeCanary', 'Firefox', 'Safari', 'PhantomJS', 'Opera', 'IE', ''],
  multiple: true
}, {
  id: 'generateTestMain',
  question: 'Do you wanna generate a bootstrap file for RequireJS?',
  hint: 'This will generate test-main.js/coffee that configures RequireJS and starts the tests.',
  options: ['no', 'yes'],
  boolean: true,
  condition: function(answers) {
    return answers.requirejs;
  }
}];

var colorScheme = {
  RESET: '\x1B[39m',
  ANSWER: '\x1B[36m', // NYAN
  SUCCESS: '\x1B[32m', // GREEN
  QUESTION: '\x1B[1m', // BOLD
  question: function(str) {
    return this.QUESTION + str + '\x1B[22m';
  },
  success: function(str) {
    return this.SUCCESS + str + this.RESET;
  }
};

// need to be registered before creating readlineInterface
process.stdin.on('keypress', function(s, key) {
  sm.onKeypress(key);
});

var rli = readline.createInterface(process.stdin, process.stdout);
var sm = new StateMachine(rli, colorScheme);

rli.on('line', sm.onLine.bind(sm));

// clean colors
rli.on('SIGINT', function() {
  sm.kill();
  process.exit(0);
});

sm.process(questions, function(answers) {
  console.log('Done', answers);
});