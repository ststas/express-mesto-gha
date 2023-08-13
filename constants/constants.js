const RegExUrl = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/i;
const RegExToken = /^Bearer [-a-zA-Z0-9_]{1,256}\.[-a-zA-Z0-9_]{1,256}\.[-a-zA-Z0-9_]{1,256}/i;

module.exports = {
  RegExUrl,
  RegExToken,
};
