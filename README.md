Swift Temp URL
============
This package contains a function to generate an expiring temporary URL for a file stored in Object Storage.

See [openstack temporary URL documentation](http://docs.openstack.org/kilo/config-reference/content/object-storage-tempurl.html) for more info.

## How to use ?
```js
// Example (for OVH openstack Object Storage) :
var swiftTempUrl = require('swift-temp-url');

swiftTempUrl(
  'myContainerName',
  'myObjectName.csv',
  'myTempUrlKey',
  24 * 3600 * 1000,
  'GET',
  'myTenantId',
  'https://storage.sbg1.cloud.ovh.net'
);
// will output : https://storage.sbg1.cloud.ovh.net/v1/AUTH_myTenantId/myContainerName/myObjectName.csv?temp_url_sig=c0d06ff4fc848c72b36626b99bf0752e369db15d&temp_url_expires=1443617620
```
