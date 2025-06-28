const apiUrl = "http://localhost:5003";

export async function getBalance() {
  try {
    const response = await fetch(`${apiUrl}/api/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
}



/**
 * Sends a message to be signed by the backend.
 * @param {string} message - The message to sign.
 * @returns {Promise<{message: string, signature: string}>} - The signed message and its signature.
 */
export async function signMessage(message) {
  try {
    const response = await fetch(`${apiUrl}/api/signmessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // { message, signature }
  } catch (error) {
    console.error('Error signing message:', error);
    throw error;
  }
}


/**
 * Verifies a signed message with a public key.
 * @param {Object} params
 * @param {string} params.message - The original message.
 * @param {string} params.signature - The signature to verify.
 * @param {string} params.pubkey - The public key to verify against.
 * @returns {Promise<{isValid: boolean}>} - Whether the signature is valid.
 *
 * Example return: { isValid: true }
 */
export async function verifyMessage({ message, signature, pubkey }) {
  try {
    const response = await fetch(`${apiUrl}/api/verifymessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, signature, pubkey }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // { isValid }
  } catch (error) {
    console.error('Error verifying message:', error);
    throw error;
  }
}


/**
 * Sends a message to a peer via the backend.
 * @param {Object} params
 * @param {string} params.public_key - The peer's public key.
 * @param {number|string} params.type - The message type (number or numeric string).
 * @param {string} params.message - The message to send.
 * @returns {Promise<{success: boolean, result: any}>} - The backend response.
 *
 * Example return: { success: true, result: ... }
 */
export async function sendMessageToPeer({ public_key, type, message }) {
  try {
    const response = await fetch(`${apiUrl}/api/sendmessagetopeer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_key, type, message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data; // { success, result }
  } catch (error) {
    console.error('Error sending message to peer:', error);
    throw error;
  }
}

