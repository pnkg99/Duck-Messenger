export class TestFormFields {
  static regex =
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  static minLengthAcc = 3;
  static minPkeyLength = 50;

  static testAccount(acc) {
    return acc.length >= TestFormFields.minLengthAcc;
  }

  static testUrl(url) {
    return TestFormFields.regex.test(url);
  }

  static testPkey(pkey) {
    return pkey.length >= TestFormFields.minPkeyLength;
  }
}
