To test this package, deploy an Ethereum node on Amazon Managed Blockchain.
It uses the standard credentials resolution process found in
[Setting Credentials in Node.js](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/setting-credentials-node.html).
If you need to create test credentials, create an IAM user with the appropriate permissions,
then export the user's credentials into your environment.

```
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...

# if your IAM credentials are temporary:
export AWS_SESSION_TOKEN=...
```

Then export the endpoint URL like so:

```
export AMB_HTTP_ENDPOINT=https://nd-<node_id>.ethereum.managedblockchain.us-east-1.amazonaws.com
```

Then run the example:

```
npm install
node index.js
```
