const functions = require('firebase-functions');
const { ThirdwebStorage } = require("@thirdweb-dev/storage");

// Initialize ThirdwebStorage with your API key
const storage = new ThirdwebStorage({
  apiKey: "ibpf8oCC_s4ams3Uf3HcDuZLbTxLHjSP8ywDxP2tQZXH_58lPJORFzOyNTwUNrv9PJIP3-xn0UAfmCPhOTfxVA",
});

// Function to store MAC address data in blockchain
async function storeMacData(macAddress, timestamp, signalStrength) {
  try {
    // Prepare the data to be stored
    const data = {
      macAddress: macAddress,
      timestamp: timestamp,
      signalStrength: signalStrength,
    };

    // Upload the data to the blockchain storage
    await storage.uploadJSON("mac_data", data);

    console.log("MAC address data stored successfully in blockchain!");
  } catch (error) {
    console.error("Error storing MAC address data:", error);
  }
}

// Define Firebase Cloud Function
exports.storeMacDataFunction = functions.https.onRequest(async (req, res) => {
  // Retrieve MAC address, timestamp, and signal strength from request body
  const { macAddress, timestamp, signalStrength } = req.body;

  // Store MAC address data in blockchain
  await storeMacData(macAddress, timestamp, signalStrength);

  // Respond with success message
  res.status(200).send("MAC address data stored in blockchain!");
});
