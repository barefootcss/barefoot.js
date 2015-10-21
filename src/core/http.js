/* ==========================================================================
   #http
   ========================================================================== */

/**
 * The http namespace provides ajax helper functions.
 */

var http = {};

/* 
   http.request
   ========================================================================== */

/**
 * Perform a request with any type of http method.
 */

http.request = function (method, url, data) {
    var backend = new window.XMLHttpRequest();
    backend.open(method, url, true);
    return {
        then: function (success, failure) {
            backend.onreadystatechange = function () {
                if (backend.readyState == 4) {
                    if (backend.status == 200) {
                        success(backend.responseText);
                    }
                    else {
                        failure(backend.statusText);
                    }
                }
            };
            backend.send(data);
        }
    };
};

/* 
   http.get
   ========================================================================== */

/**
 * Perform a request with the 'get' http method.
 */

http.get = function (url, data) {
    return {
        then: function (success, failure) {
            http.request('GET', url, data).then(success, failure);
        }
    };
};

/* 
   http.post
   ========================================================================== */

/**
 * Perform a request with the 'post' http method.
 */

http.post = function (url, data) {
    return {
        then: function (success, failure) {
            http.request('POST', url, data).then(success, failure);
        }
    };
};

// 
// @public
// ========================================================================== */

barefoot.http = http;