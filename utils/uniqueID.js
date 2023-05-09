// src/utils/uniqueID.js
export async function generateUniqueID() {
    const { customAlphabet } = await import('nanoid');
    const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const length = 7;
    const nanoid = customAlphabet(alphabet, length);
  
    const timestamp = Date.now().toString(36);
    const uniqueID = timestamp + nanoid(); // Set the value of uniqueID ref
    return uniqueID;
  }
  