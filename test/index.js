const Web3 = require('web3');
const AWSHttpProvider = require('@aws/web3-http-provider');
const endpoint = process.env.AMB_HTTP_ENDPOINT
const web3 = new Web3(new AWSHttpProvider(endpoint));
web3.eth.getNodeInfo().then(console.log);