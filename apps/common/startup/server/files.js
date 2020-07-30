import { Meteor } from 'meteor/meteor';

if (Meteor.isDevelopment) {
  if (Meteor.settings.private && Meteor.settings.private.FILES_PATH) {
    process.env.FILES_PATH = Meteor.settings.private.FILES_PATH;
  } else {
    console.warn('[ COMMON ] Local Files Path is not configured.');
  }
}
