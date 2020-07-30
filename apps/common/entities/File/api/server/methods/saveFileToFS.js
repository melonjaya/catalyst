/* eslint-disable no-param-reassign */

import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import fs from 'fs';
import path from 'path';

import File from '../../index';

import parseHost from '../../../../../helpers/parseHost';
import getTenant from '../../../../../helpers/getTenant';
import entityInsert from '../../../../../helpers/server/entityInsert';

Meteor.methods({
  // FIXME right now no user right check, only login user
  saveFileToFS(userId, blob, filenameInput, mimeType, size, collection, _id, type) {
    check(userId, String);
    check(blob, Match.Any);
    check(filenameInput, String);
    check(mimeType, String);
    check(size, Number);
    check(collection, String);
    check(_id, String);
    check(type, String);

    console.log(`[ saveFileToFS ] [ ${new Date()} ] collection: ${collection}`);

    const user = Meteor.user() || Meteor.users.findOne(userId); // to ensure that non logined user in local server can upload. security risk though.

    const host = parseHost(this.connection.httpHeaders.host);
    const tenant = getTenant(host);
    const party = {
      _id: user._id,
      type: 'Member',
      name: user.profile.fullname,
    };

    const filename = filenameInput
      .toLowerCase()
      .replace(/ /g, '_')
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9_.]/g, '');

    const basePath = 'upload';
    const filePath = path.normalize(path.join(`${process.env.FILES_PATH}/${basePath}`, filename));
    console.log(`[ saveFileToFS ] [ ${new Date()} ] filePath: ${filePath}`);

    const now = new Date();

    fs.writeFile(
      filePath,
      blob,
      'binary',
      Meteor.bindEnvironment((err) => {
        if (err) {
          console.error(`************ Error: ${err}`);
          throw new Error(err.message);
        }
        const docFile = {
          name: filenameInput,
          fsUrl: filePath,
          localUrl: `files/${basePath}/${filename}`,
          // cloudUrl: String // FIXME upload ke S3
          size,
          mimeType,
          type,
          status: 'Active',
        };

        entityInsert(File, docFile, 'saveFileToFS creates new File', party, tenant.owner, now);
      }),
    );
  },
});

// FIXME add ratelimiter here
