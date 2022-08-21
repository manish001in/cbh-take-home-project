const crypto = require("crypto");

// Function returns the string hash based on the data
const hashData = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
}

// Return a deterministic partition key based on the event if event exists, else return "0"
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidateForKey = TRIVIAL_PARTITION_KEY;
  // If no event is present, return the trivial partition key

  if (event) {
    // Check for presence of partitionKey in event
    if (event.partitionKey) {
      candidateForKey = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidateForKey = hashData(data);
    }

    // If candidateForKey is not a string, convert it to a string for hashing
    if (typeof candidateForKey !== "string") {
      candidateForKey = JSON.stringify(candidateForKey);
    }
    if (candidateForKey.length > MAX_PARTITION_KEY_LENGTH) {
      candidateForKey = hashData(candidateForKey);
      // Ensuring partitionKey to be less than 256 characters by rehashing it.
    }
  }

  return candidateForKey;
};