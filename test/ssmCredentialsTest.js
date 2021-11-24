const Web3 = require('web3');
const AWSHttpProvider = require('@aws/web3-http-provider');
const endpoint = process.env.AMB_HTTP_ENDPOINT
const web3 = new Web3(new AWSHttpProvider(endpoint, {accessKeyId: 'KEY', secretAccessKey: 'SECRET'}));
// Intentionally errors with message "The security token included in the request is invalid"
web3.eth.getNodeInfo().then(console.log).catch(console.error);