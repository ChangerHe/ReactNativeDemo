const tokenTypes = {
  PushConsole: 1,
  MessengerBot: 2,
  SurveyExports: 3
};

module.exports = {
  type: tokenTypes,

  valid: function(type, value) {
    switch (type) {
      case tokenTypes.PushConsole:
        return value === process.env.PARSE_TOKEN_PUSHCONSOLE;
      case tokenTypes.MessengerBot:
        return value === process.env.PARSE_TOKEN_MESSENGERBOT;
      case tokenTypes.SurveyExports:
        return value === process.env.PARSE_TOKEN_SURVEYEXPORTS;
      default:
        return false;
    }
  }
};
