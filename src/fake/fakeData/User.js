'use strict';

const utility = require('utility');
const chance = require('chance').Chance();
const moment = require('moment');

const users = [];
const hometowns = ['北京', '上海', '广州'];
const devices = ['ios', 'android'];

//共10个用户
for (let i = 1; i <= 10; i++) {
  const phone = `130000000${ i < 10 ? '0' + i : i}`;
  const gender = chance.character({ pool: 'FM' });
  const device = devices[chance.integer({min: 0, max: 1})];
  users.push({
    phone,
    nickname: chance.name({ gender: gender === 'M' ? 'male' : 'female' }),
    password: utility.md5(phone),
    gender,
    birthday: moment(chance.birthday({ year: chance.year({ min: 1980, max: 2000 }) })).format('YYYY-MM-DD'),
    hometown: hometowns[chance.integer({min: 0, max: 2})],
    motto: chance.sentence({ words: 5 }),
    ip: chance.ip(),
    device,
    androidId: device === 'ios' ? null : chance.android_id(),// jscs:ignore
    appleId: device === 'ios' ? chance.apple_token() : null,// jscs:ignore
  });
}

exports.data = users;
