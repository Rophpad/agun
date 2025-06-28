const apiUrl = "http://localhost:5003";


export async function getInfo(node) {
  try {
    const response = await fetch(`${apiUrl}/api/getinfo/${node}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

export async function getBalance() {
  try {
    const response = await fetch(`${apiUrl}/api/balance/node2`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
}

export async function generateInvoice(sats, description) {
  const body = { sats: sats, description: description };
  try {
    const response = await fetch(`${apiUrl}/api/invoice/node1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}

export async function payInvoice(request) {
  const body = { request: request };
  try {
    const response = await fetch(`${apiUrl}/api/pay/node2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}

export async function signMessage(message) {
  const body = { message: message };
  try {
    const response = await fetch(`${apiUrl}/api/signmessage/node2`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}

export async function verifyMessage(message, signature, pubkey) {
  const body = { message: message, signature: signature, pubkey: pubkey };
  try {
    const response = await fetch(`${apiUrl}/api/verifymessage/node1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error generating invoice:", error);
    throw error;
  }
}
