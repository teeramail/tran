// generateID.js
const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
const length = 7;

let nanoidFunc;

async function initialize() {
  const module = await import('nanoid');
  nanoidFunc = module.customAlphabet(alphabet, length);
}

function generateUniqueAgentID() {
  if (!nanoidFunc) throw new Error("Nanoid function not initialized");
  const timestamp = Date.now().toString(36);
  return timestamp + nanoidFunc();
}

export { initialize, generateUniqueAgentID };
