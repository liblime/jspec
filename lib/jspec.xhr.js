
// JSpec - jQuery - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

JSpec.defaultXMLHttpRequest = XMLHttpRequest

JSpec.XMLHttpRequest = function(){
  this.requestHeaders = {}
  this.responseHeaders = {}
}

JSpec.XMLHttpRequest.status = {
  100 : 'Continue',
  101 : 'Switching Protocols',
  200 : 'OK',
  201 : 'Created',
  202 : 'Accepted',
  203 : 'Non-Authoritative Informatio',
  204 : 'No Content',
  205 : 'Reset Content',
  206 : 'Partial Conten',
  300 : 'Multiple Choice',
  301 : 'Moved Permanentl',
  302 : 'Foun',
  303 : 'See Othe',
  304 : 'Not Modifie',
  305 : 'Use Prox',
  307 : 'Temporary Redirec',
  400 : 'Bad Reques',
  401 : 'Unauthorize',
  402 : 'Payment Require',
  403 : 'Forbidde',
  404 : 'Not Foun',
  405 : 'Method Not Allowe',
  406 : 'Not Acceptabl',
  407 : 'Proxy Authentication Require',
  408 : 'Request Timeou',
  409 : 'Conflic',
  410 : 'Gon',
  411 : 'Length Require',
  412 : 'Precondition Faile',
  413 : 'Request Entity Too Larg',
  414 : 'Request-URI Too Lon',
  415 : 'Unsupported Media Typ',
  416 : 'Requested Range Not Satisfiabl',
  417 : 'Expectation Faile',
  422 : 'Unprocessable Entit',
  500 : 'Internal Server Erro',
  501 : 'Not Implemente',
  502 : 'Bad Gatewa',
  503 : 'Service Unavailabl',
  504 : 'Gateway Timeou',
  505 : 'HTTP Version Not Supported'
}

JSpec.XMLHttpRequest.prototype = {
  status : 0,
  async : true,
  readyState : 0,
  responseText : '',
  abort : function(){},
  onreadystatechange : function(){},
  
  getAllResponseHeaders : function(){
    return this.responseHeaders
  },
  
  getResponseHeader : function(name) {
    return this.responseHeaders[name.toLowerCase()]
  },
  
  setRequestHeader : function(name, value) {
    this.requestHeaders[name] = value
  },
  
  open : function(method, url, async, user, password) {
    this.url = url
    this.readyState = 1
    this.method = method || 'GET'
    if (async != undefined) this.async = async
    if (this.async) this.onreadystatechange()
  },
  
  send : function() {
    this.readyState = 4
    if(this.async) this.onreadystatechange()
  }
}

function mockRequest(url) {
  XMLHttpRequest = JSpec.XMLHttpRequest
  return {
    and_return : function(body, type, status, headers) {
      JSpec.XMLHttpRequest.prototype.body = body
      JSpec.XMLHttpRequest.prototype.headers = headers || {}
      JSpec.XMLHttpRequest.prototype.headers['content-type'] = type
      JSpec.XMLHttpRequest.prototype.status = status || 200
      JSpec.XMLHttpRequest.prototype.statusText = JSpec.XMLHttpRequest.status[status || 200]
    }
  }
}

function unmockRequest() {
  XMLHttpRequest = JSpec.defaultXMLHttpRequest
}

JSpec.include({

  // --- Utilities

  utilities : {
    mockRequest : mockRequest,
    unmockRequest : unmockRequest,
  },

  // --- Hooks

  afterSpec : function() {
    unmockRequest()
  }

})