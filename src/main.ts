// 
// @description : 
// @author      : Adarsh Pastakia
// @copyright   : 2016
// @license     : MIT
import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import "highlight.js";
import "highlight.js/languages/css";
import "highlight.js/languages/scss";
import "highlight.js/languages/xml";
import "highlight.js/languages/json";

//Configure Bluebird Promises.
//Note: You may want to use environment-specific configuration.
(<any>Promise).config({
  warnings: {
    wForgottenReturn: false
  }
});

hljs.registerLanguage('css', require("highlight.js/languages/css"));
hljs.registerLanguage('xml', require("highlight.js/languages/xml"));
hljs.registerLanguage('json', require("highlight.js/languages/json"));
hljs.registerLanguage('scss', require("highlight.js/languages/scss"));
hljs.registerLanguage('typescript', function(hljs) {
  var KEYWORDS = {
    keyword:
    'in if for while finally var new function|0 do return void else break catch ' +
    'instanceof with throw case default try this switch continue typeof delete ' +
    'let yield const class public private get set super extends from of ' +
    'static implements enum export import declare type protected ' +
    'attached detached bind unbind canActivate activate created configure configureRouter',
    literal:
    'true false null undefined NaN Infinity',
    built_in:
    'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' +
    'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' +
    'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' +
    'TypeError URIError Number Math Date String RegExp Array Float32Array ' +
    'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' +
    'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' +
    'module console window document any number boolean string void ' +
    'Router ValidationController ValidationRules TaskQueue EventAggregator Aurelia'
  };

  return {
    aliases: ['ts'],
    keywords: KEYWORDS,
    contains: [
      {
        className: 'pi',
        begin: /^\s*['"]use strict['"]/,
        relevance: 0
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      {
        className: 'number',
        variants: [
          { begin: '\\b(0[bB][01]+)' },
          { begin: '\\b(0[oO][0-7]+)' },
          { begin: hljs.C_NUMBER_RE }
        ],
        relevance: 0
      },
      { // "value" container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          hljs.REGEXP_MODE
        ],
        relevance: 0
      },
      {
        className: 'function',
        begin: /(function)|(\=.*\(.*\).*\=\>)/, end: /[\{;]/, excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          hljs.inherit(hljs.TITLE_MODE, { begin: /[A-Za-z$_][0-9A-Za-z$_]*/ }),
          {
            className: 'params',
            begin: /\(/, end: /\)/,
            excludeBegin: true,
            excludeEnd: true,
            keywords: KEYWORDS,
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ],
            illegal: /["'\(]/
          }
        ],
        illegal: /\[|%/,
        relevance: 0 // () => {} is more typical in TypeScript
      },
      {
        className: 'constructor',
        beginKeywords: 'constructor', end: /\{/, excludeEnd: true,
        relevance: 10
      },
      {
        className: 'module',
        beginKeywords: 'module', end: /\{/, excludeEnd: true
      },
      {
        className: 'interface',
        beginKeywords: 'interface', end: /\{/, excludeEnd: true,
        keywords: 'interface extends'
      },
      {
        className: 'decorator',
        begin: /@/, end: /[\(\s]/, excludeEnd: true
      },
      {
        begin: /\$[(.]/ // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      },
      {
        begin: '\\.' + hljs.IDENT_RE, relevance: 0 // hack: prevents detection of keywords after dots
      }
    ]
  };
});



export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start()
    .then(() => aurelia.setRoot())
    .then(() => document.querySelector('.ui-splash').remove());
}