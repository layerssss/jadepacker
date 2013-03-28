jadepacker
==========

pack your jades before delivering!

## Usage

### Add it into your `package.json`

    npm install jadepacker --save

### Call it in a `Makefile` or something

    .... other compilation steps
    node_modules/jadepacker/bin/jadepacker --input views --output views_jades
    ....

### Hack into your `expressjs` server

    var jades = require('jadepacker')(__dirname + '/views_jades');

    ...

    app.use(jades.__express);

### or do rendering maunually

    app.get('/', function(req, res, next){
      // cool stuff here
      // ...
      jades.expressRender(res, 'index');
    });
    

