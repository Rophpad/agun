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

export async function Invoices() {
  try {
    const response = await fetch(`${apiUrl}/api/invoices`, {
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

export async function Invoice(sats, description) {
  try {
    const response = await fetch(`${apiUrl}/api/invoice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sats: sats,
        description : description,
      }),
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