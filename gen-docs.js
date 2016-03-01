

var dataFile = process.argv[2];
var outFile = process.argv[3];

var fs = require('fs');
var hjson = require('hjson');
var apiData = hjson.parse( fs.readFileSync( dataFile , 'utf-8' ) );
var ECT = require('ect');
var renderer = new ECT();
var showdown  = require('showdown');
var markdownConfig = {
  tables: true,
  // extensions: ['twitter']
};
var converter = new showdown.Converter( markdownConfig );


var htmlOut = renderer.render('./template.ect', { 
  apiData: apiData,
  markdown: converter.makeHtml.bind( converter ),
  genId: function( api ){
    return api.method + '-' + api.action.replace(/[\/:]/g, '-' );
  }
});

fs.writeFileSync( outFile, htmlOut );



