export class OneTimePassword {
  static generateMobileOtp(otpLength: Number) {
    var allowedDigits = "1234567890";
    var OTP = "";
    for (let i = 0; i < otpLength; i++) {
      OTP += allowedDigits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  }
}
