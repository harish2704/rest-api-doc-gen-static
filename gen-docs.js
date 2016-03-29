
"use strict";

var fs = require('fs');
var hjson = require('hjson');
// var CodeMirror = require('codemirror-highlight');
// CodeMirror.loadMode('javascript');
var ECT = require('ect');
var renderer = new ECT({
  root: __dirname,
});
var showdown  = require('showdown');
var markdownConfig = {
  tables: true,
  // extensions: ['twitter']
};
var converter = new showdown.Converter( markdownConfig );

function highlight( code ){
  // return CodeMirror.highlight( code, { mode: 'javascript' });
  return code;
}


function render( apiData ){
  var htmlOut = renderer.render( 'template.ect', { 
    apiData: apiData,
    markdown: converter.makeHtml.bind( converter ),
    genId: function( api ){
      return api.method + '-' + api.action.replace(/[\/:]/g, '-' );
    },
    highlight: highlight,
  });
  return htmlOut;
}




module.exports = function( dataFile, outFile ){
  var apiData = hjson.parse( fs.readFileSync( dataFile , 'utf-8' ) );
  var html = render( apiData );
  fs.writeFileSync( outFile, html );
};
