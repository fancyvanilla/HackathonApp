const crypto = require('crypto');

export async function create_pk() {
  const keyPair = await window.crypto.subtle.generateKey({
    name: "RSASSA-PKCS1-v1_5",
    modulusLength: 2048,
    publicExponent: new Uint8Array([1, 0, 1]),
    hash: "SHA-256",
  },
  true, // whether the key is extractable (i.e. can be used in exportKey)
  ["sign", "verify"] // can be any combination of "sign" and "verify"
  );

  const privateKey = await window.crypto.subtle.exportKey(
    "pkcs8",
    keyPair.privateKey
  );
  const publicKey = await window.crypto.subtle.exportKey(
    "spki",
    keyPair.publicKey
  );

  return privateKey;
}

// Convert string to ArrayBuffer
function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  
  // Convert ArrayBuffer to string
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }
  
  // Derive a key from a password
  async function deriveKey(password) {
    const salt = new TextEncoder().encode('your-salt-here');
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      str2ab(password),
      { name: 'PBKDF2' },
      false,
      ['deriveBits', 'deriveKey']
    );
    return window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
  }
  
  // Encryption function
   export async function encrypt(data,password) {
    const key = await deriveKey(password);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(data);
  
    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      encodedData
    );
  
    const encryptedContentArr = new Uint8Array(encryptedContent);
    const buf = new Uint8Array(iv.byteLength + encryptedContentArr.byteLength);
    buf.set(iv, 0);
    buf.set(encryptedContentArr, iv.byteLength);
  
    return btoa(ab2str(buf));
  }


  
  // Decryption function
  export async function decrypt(encryptedData, password) {
    const key = await deriveKey(password);
    const encryptedDataBuf = str2ab(atob(encryptedData));
    const iv = encryptedDataBuf.slice(0, 12);
    const data = encryptedDataBuf.slice(12);
  
    const decryptedContent = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv
      },
      key,
      data
    );
  
    return new TextDecoder().decode(decryptedContent);
  }
  
  // Usage example:
  export async function testEncryptDecrypt() {
    const originalText = "This is a secret message";
    const password = "mySecretPassword";
  
    try {
      const encryptedData = await encrypt(originalText, password);
      console.log("Encrypted:", encryptedData);
  
      const decryptedData = await decrypt(encryptedData, password);
      console.log("Decrypted:", decryptedData);
  
      console.log("Original text matches decrypted text:", originalText === decryptedData);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
