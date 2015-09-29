'use strict';

var crypto = require('crypto');

/*
 * @param {containerName} : The ObjectStorage container name
 * @param {objectName} : The ObjectStorage object (file) name
 * @param {tempUrlKey} : The temporary URL key set through the "X-Account-Meta-Temp-URL-Key" header
 * @param {validityDuration} : The validity duration (in ms)
 * @param {HTTPMethod} : The HTTP Method for which this link will be available (defaults to 'GET')
 * @param {tenantId} : The Tenant ID
 * @param {baseUrl} : Base URL of the Object Storage service
 * @returns : the temporary URL string
 */
module.exports = function swiftTempUrl (containerName, objectName, tempUrlKey, validityDuration, HTTPMethod, tenantId, baseUrl) {
  var url = (containerName || 'container') + '/' + (objectName || 'object');
  var seconds = Math.floor((validityDuration || 36e5) / 1000);
  var method = HTTPMethod || 'GET';
  var key = tempUrlKey || 'b3968d0207b54ece87cccc06515a89d4';
  var objectPath = '/v1/AUTH_' + (tenantId || 'account') + '/' + url;
  var expires = Math.floor(Date.now()/1000) + seconds;
  var hmacBody = method + '\n' + expires + '\n' + objectPath;
  var sig = crypto.createHmac('sha1', key).update(hmacBody).digest('hex');
  baseUrl = baseUrl || 'https://swift-cluster.example.com';

  return baseUrl + objectPath + '?temp_url_sig=' + sig + '&temp_url_expires=' + expires;
};
