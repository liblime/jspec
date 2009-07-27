
// JSpec - XHR - Copyright TJ Holowaychuk <tj@vision-media.ca> (MIT Licensed)

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
  203 : 'Non-Authoritative Information',
  204 : 'No Content',
  205 : 'Reset Content',
  206 : 'Partial Content',
  300 : 'Multiple Choice',
  301 : 'Moved Permanently',
  302 : 'Found',
  303 : 'See Other',
  304 : 'Not Modified',
  305 : 'Use Proxy',
  307 : 'Temporary Redirect',
  400 : 'Bad Request',
  401 : 'Unauthorized',
  402 : 'Payment Required',
  403 : 'Forbidden',
  404 : 'Not Found',
  405 : 'Method Not Allowed',
  406 : 'Not Acceptable',
  407 : 'Proxy Authentication Required',
  408 : 'Request Timeout',
  409 : 'Conflict',
  410 : 'Gone',
  411 : 'Length Required',
  412 : 'Precondition Failed',
  413 : 'Request Entity Too Large',
  414 : 'Request-URI Too Long',
  415 : 'Unsupported Media Type',
  416 : 'Requested Range Not Satisfiable',
  417 : 'Expectation Failed',
  422 : 'Unprocessable Entity',
  500 : 'Internal Server Error',
  501 : 'Not Implemented',
  502 : 'Bad Gateway',
  503 : 'Service Unavailable',
  504 : 'Gateway Timeout',
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
    this.requestHeaders[name.toLowerCase()] = value
  },
  
  open : function(method, url, async, user, password) {
    this.user = user
    this.password = password
    this.url = url
    this.readyState = 1
    this.method = method.toUpperCase()
    if (async != undefined) this.async = async
    if (this.async) this.onreadystatechange()
  },
  
  send : function(data) {
    this.data = data
    this.readyState = 4
    if (this.method == 'HEAD') this.body = null
    this.responseHeaders['content-length'] = (this.body || '').length
    if(this.async) this.onreadystatechange()
  }
}

function unmockRequest() {
  XMLHttpRequest = JSpec.defaultXMLHttpRequest
}

JSpec.include({

  // --- Utilities

  utilities : {
    mockRequest : { 
      and_return : function(body, type, status, headers) {
        XMLHttpRequest = JSpec.XMLHttpRequest
        headers = headers || {}
        headers['content-type'] = type
        JSpec.extend(XMLHttpRequest.prototype, {
          body : body,
          status : status || 200,
          statusText : XMLHttpRequest.status[status || 200],
          responseHeaders : headers
        })
      }
    },
    unmockRequest : unmockRequest,
  },

  // --- Hooks

  afterSpec : function() {
    unmockRequest()
  }

})