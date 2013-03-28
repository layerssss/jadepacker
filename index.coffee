jade = require 'jade'
fs = require 'fs'
path = require 'path'

module.exports = jadepacker = (jades_path)->

  jades = null
  try
    jades = require jades_path
  catch e
  render = (view, locals, cb)->
    view = view.substring 0, view.length - '.jade'.length if view.match /\.jade$/
    req = this.req
    app = this.app
    res = this

    if locals && locals.constructor is Function
      cb = locals
      locals = undefined

    #default cb
    cb ?= (e, str)->
      return req.next e if e
      res.send str

    l = {}
    l[k] = v for k, v of app.locals
    l[k] = v for k, v of res.locals
    if locals?
      l[k] = v for k, v of locals

    try
      html = jades[view] l
    catch e
      return cb e
    cb null, html

  return result = 
    __express: (req, res, next)->
      if process.env.NODE_ENV is 'production'
        if jades?
          res.render = render
        else
          console.error 'WARNING: jadepacker not loaded in production environment'
      next()

    expressRender: (res, view, locals, cb)->
      if process.env.NODE_ENV is 'production'
        if jades?
          return render.call res, view, locals, cb
        else
          console.error 'WARNING: jadepacker not loaded in production environment'
      res.render view, locals, cb




jadepacker.cli = (options)->
  throw new Error 'input not specified' unless options.input
  throw new Error 'output not specified' unless options.output
  jadeopt = 
    'compileDebug': false
  jadeopt[k] = v for k, v of options
  delete jadeopt.input
  delete jadeopt.output
  buf = [];

  buf.push 'var jade={};'
  for k, v of jade.runtime
    buf.push 'jade.'
    buf.push k
    buf.push '=exports.'
    buf.push k
    buf.push '='
    buf.push String v
    buf.push ';'
  for file in fs.readdirSync options.input
    continue unless file.match /\.jade$/i
    filename = path.join options.input, file
    buf.push 'exports['
    buf.push JSON.stringify file.substring 0, file.length - '.jade'.length
    buf.push ']='
    jadeopt.client = true
    jadeopt.filename = filename
    buf.push String jade.compile (fs.readFileSync filename, 'utf8'), jadeopt
    buf.push ';'

  fs.writeFileSync "#{options.output}.js", buf.join(''), 'utf8'





