const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;
  console.log(event)

  if (event) {
    candidate = event.partitionKey ? event.partitionKey : JSON.stringify(event);
    if(candidate.length > MAX_PARTITION_KEY_LENGTH || !event.partitionKey){
      candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
    }
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = candidate = TRIVIAL_PARTITION_KEY;
  }

  return candidate;
};