/**
 * @format
 */
// import CryptoJS, {SHA256} from 'crypto-js';
import a, {AES, SHA256} from 'react-native-crypto-js';
console.log(a, 222333);

it('sha256', () => {
  console.log(AES, 222333);

  // const encrypted = SHA256('test999').toString();
  // expect(encrypted).toBe(
  //   '18a67aed40b322ad320140dc348bf088d3cc59d4074cf74b63324035cb83ca7f',
  // );
});
//
// it('aes', () => {
//   const encrypted = CryptoJS.AES.encrypt(
//     'c91a959bee9d8b73c5aa029197828514604409173b7421789e09af1d8483004c',
//     'password',
//   ).toString();
//
//   const decrypted = CryptoJS.AES.decrypt(encrypted, 'password').toString(
//     CryptoJS.enc.Utf8,
//   );
//
//   expect(decrypted).toBe(
//     'c91a959bee9d8b73c5aa029197828514604409173b7421789e09af1d8483004c',
//   );
// });
