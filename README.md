# Token Price
An example of how to get Safemoon's token price & burn percentage using the Angular framework and Web3.js

## Frontend
- Angular CLI 13.2.6
- Node.js 16.14.0
- npm 8.3.1
- Web3.js

## Solution to Web3 Polyfils Error on Angular
- Install the following modules:
```
npm i crypto-browserify stream-browserify assert stream-http https-browserify os-browserify url web3
```
- Include in tsconfig.json:
```
"paths" : {
  "crypto": ["./node_modules/crypto-browserify"],
  "stream": ["./node_modules/stream-browserify"],
  "assert": ["./node_modules/assert"],
  "http": ["./node_modules/stream-http"],
  "https": ["./node_modules/https-browserify"],
  "os": ["./node_modules/os-browserify"],
}
```
- Include in Polyfills.ts:
```
import { Buffer } from 'buffer';
(window as any).global = window;
global.Buffer = Buffer;
global.process = {
    env: { DEBUG: undefined },
    version: '',
    nextTick: require('next-tick')
} as any;
```
