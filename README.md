# @aws/web3-http-provider

This is an npm package that takes care of Signature Version 4 authentication
for HTTP connections to Ethereum nodes on
[Amazon Managed Blockchain](https://aws.amazon.com/managed-blockchain/).

## Installing
Install and save as a dependency using NPM:
`npm install @aws/web3-http-provider --save`

## Example

This example assumes that your AWS IAM-related environment variables have been set
previously. For example:
```
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

# if your IAM credentials are temporary:
export AWS_SESSION_TOKEN=...
```

```
const Web3 = require('web3');
const AWSHttpProvider = require('@aws/web3-http-provider');
const endpoint = 'https://nd-NODEID.ethereum.managedblockchain.REGION.amazonaws.com';
const web3 = new Web3(new AWSHttpProvider(endpoint));
web3.eth.getNodeInfo().then(console.log);
```

You may also provide your credentials directly to the constructor arguments of a new instance of AWSHttpProvider():
```
const Web3 = require('web3');
const AWSHttpProvider = require('@aws/web3-http-provider');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}
const endpoint = <your Amazon Managed Blockchain HTTP URL>
const web3 = new Web3(new AWSHttpProvider(endpoint, credentials));
web3.eth.getNodeInfo().then(console.log);
```

This reusable HTTP provider can be used to create a valid HTTP provider in the popular Ethers.js library:

In your project's root directory, install ethers:
`npm install ethers --save`

```
const ethers = require('ethers');
const AWSHttpProvider = require('@aws/web3-http-provider');

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, 
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}
const endpoint = 'https://nd-NODEID.ethereum.managedblockchain.REGION.amazonaws.com';
const baseProvider = new AWSHttpProvider(endpoint, credentials);
let provider = new ethers.providers.Web3Provider(baseProvider);
```


## Testing

To test this package, follow the instructions in `test/README`.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This library is licensed under the [LGPL-3.0 License](LICENSE).
