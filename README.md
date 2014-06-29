notify-extension
================

A minimal example of sending messages (notifications) to a Chrome Browser Extension


Requirements
------------

- node.js


Installation
------------

 Server

```bash
$ git clone https://github.com/orbitbot/dyn-url
$ cd dyn-url
$ npm install
```

Extension

- Load the extension into your Chrome Browser, see: [https://developer.chrome.com/extensions/getstarted#unpacked]


Usage
-----

- Start the server:
  ```bash
  $ node server.js
  Started node server on port 3000 with process id: 8497
   > send socket.io message with
     $ kill -1 8497
  ```
- Start your browser, you should see the extension icon to the right of the Chrome omnibox (address bar), and from the node server you should see a connection event
  ```
  socket.io client connected from 127.0.0.1:3000
  ```
- Send notifications to the extension by running the provided command in a separate terminal window:
  ```
  $ kill -1 8497
  ```
- clicking the extension icon will display the total number of received messages, reset the counter displayed on the icon itself and change the icon back to inactive state


Notes
-----

- the server component has only been tested on a Linux environment, generating the correct signals to send messages on other platforms may be possible, see here: [http://nodejs.org/api/process.html#process_signal_events]


Licence
=======

The MIT License (MIT)

Copyright (c) 2014 Patrik Johnson -- http://github.com/orbitbot

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.