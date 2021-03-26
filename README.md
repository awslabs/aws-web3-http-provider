# aws-web3-http-provider

This is an npm package that takes care of Signature Version 4 authentication
when using web3 library with Ethereum nodes on
[Amazon Managed Blockchain](https://aws.amazon.com/managed-blockchain/).

## Installing

`npm install aws-web3-http-provider --save`

## Example

```
import Web3 from 'web3';
import AWSHttpProvider from 'aws-web3-http-provider';
const endpoint = process.env.AMB_HTTP_ENDPOINT
const web3 = new Web3(new AWSHttpProvider(endpoint));
web3.eth.getNodeInfo().then(console.log);
```

## Testing

To test this package, follow the instructions in `test/README`.

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more
information.

## License

This library is licensed under the [LGPL-3.0 License](LICENSE).
