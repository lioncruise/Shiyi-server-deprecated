'use strict';

const utility = require('utility');
const fs = require('fs');
const path = require('path');

const codes = [];

for (let i = 1; i <= 1000; i++) {
  const str = utility.md5('vip' + i);
  codes.push(str);
}

fs.writeFileSync(path.join(__dirname, 'code.txt'), codes.join('\r\n'));
