const URL = "http://localhost:3001";

export async function sendDataToServer(url, data) {
  try {
    url = `${URL}` + url;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data, null, 0),
    });
    const res = await response.json();
    if (response.ok) {
      return res;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}
