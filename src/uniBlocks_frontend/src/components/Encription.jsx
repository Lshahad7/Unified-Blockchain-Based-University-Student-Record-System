import React from 'react';
import CryptoJS from 'crypto-js';

const aes = (data) => {
    try {
      const AES_KEY="IMLITE_ADVANCED_ENCRYPTION_KEY";
      return  CryptoJS.AES.encrypt(data, AES_KEY).toString();
    } catch (error) {
      console.log("ENCRYPTION ERROR => ", error);
      return error;
    }
  };
  
  const unAes = (data) => {
    try {
      const AES_KEY="IMLITE_ADVANCED_ENCRYPTION_KEY";
      const decrypted = CryptoJS.AES.decrypt(data, AES_KEY);
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.log("DECRYPTION ERROR => ", error);
      return error;
    }
  };
  
  export { aes, unAes };
