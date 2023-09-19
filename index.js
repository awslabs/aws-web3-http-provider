/////////////////////////////////////////////////////
// Authored by Rafia Tapia
// Senior Blockchain Solutions Architect, AWS
// licensed under GNU Lesser General Public License
// https://github.com/ethereum/web3.js
/////////////////////////////////////////////////////

import HttpProvider from 'web3-providers-http';
import XHR2 from 'xhr2';
import { fromEnv} from '@aws-sdk/credential-providers';
import sigv4 from '@aws-sdk/signature-v4';
import http from '@aws-sdk/protocol-http';
import crypto from "@aws-crypto/sha256-js";

export default class AWSHttpSigV4_v2Provider extends HttpProvider {
  constructor(connectionStr) {
    super(connectionStr);
  }

  send(payload, callback) {
    
    const self = this; 
    /* ******************** XHR2 *************************** */
    const request = new XHR2(); // eslint-disable-line
    request.timeout = self.timeout;
    request.open('POST', self.host, true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.onreadystatechange = () => {

      if (request.readyState === 4 && request.timeout !== 1) {
        let result = request.responseText; // eslint-disable-line
        let error = null; // eslint-disable-line

        try {
          result = JSON.parse(result);
        } catch (jsonError) {
          let message;
          if (!!result && !!result.error && !!result.error.message) {
            message = `[aws-ethjs-provider-http] ${result.error.message}`;
          } else {
            message = `[aws-ethjs-provider-http] Invalid JSON RPC response from host provider ${self.host}: ` +
              `${JSON.stringify(result, null, 2)}`;
          }
          error = new Error(message);
        }
        self.connected = true;
        callback(error, result);
      }
    };
    request.ontimeout = () => {
      self.connected = false;
      callback(`[aws-ethjs-provider-http] CONNECTION TIMEOUT: http request timeout after ${self.timeout} ` +
        `ms. (i.e. your connect has timed out for whatever reason, check your provider).`, null);
    };

    /* ******************** END XHR2 *************************** */
    const strPayload = JSON.stringify(payload);
    const region = process.env.AWS_DEFAULT_REGION || 'us-east-1';

    try {
      const urlparser=new URL(self.host)
      let signerV4 = new sigv4.SignatureV4({ credentials: fromEnv(), region: region, service: "managedblockchain", sha256: crypto.Sha256 });
      let requestOptions={
        protocol:urlparser.protocol,
        hostname:urlparser.hostname,
        method: 'POST',
        body:strPayload,
        headers:{'host':urlparser.host},
        path:urlparser.pathname
        
      }
      const newReq = new http.HttpRequest(requestOptions);
      signerV4.sign(newReq,{signingDate:new Date(),}).then(signedHttpRequest => {
        request.setRequestHeader('authorization', signedHttpRequest.headers['authorization']);
        request.setRequestHeader('x-amz-date', signedHttpRequest.headers['x-amz-date']);
        request.setRequestHeader('x-amz-content-sha256', signedHttpRequest.headers['x-amz-content-sha256']);
        request.send(strPayload);
      }).catch(sigError => {
        console.log(sigError);
      });
    } catch (error) {
      callback(`[aws-ethjs-provider-http] CONNECTION ERROR: Couldn't connect to node '${self.host}': ` +
        `${JSON.stringify(error, null, 2)}`, null);
    }
  }
}
