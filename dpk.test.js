const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns the same ", () => {
    const event = {
      partitionKey: "TestKey"
    }
    const trivialKey = deterministicPartitionKey(event);
    console.log(trivialKey);
    expect(trivialKey).toBe("TestKey");
  });


  it("Returns the partitionKey string hash when length is > 256 of partitionkey", () => {
    const event = {
      partitionKey: "23r98erfescnf49w85ywm0389t659u0e5sdfjksvhe5489sgjo6r9jgs94jp5g9vpgrtjs896uy0s8aeqtu094q5m40896uyh8978mjdfofjbhs908vm5yu0q84t6uq45y85uq7095em09vm05y6uw8vym059q,c0q54uy80mw09v5q08ty9v4u690w6un0689hum0wc5m0w0wr6mv09wrtmuh5690,c09vy9uht0y9dfklslsedfostdtivm0j695vusrtiohjvsrt90m5p69vhmpy9",
    };
    const trivialKey = deterministicPartitionKey(event);
    console.log(trivialKey);
    expect(trivialKey.length).toBe(128);
  });

  it("Returns string of the provided number type key", () => {
    const event = {
      partitionKey:
        1234789,
    };
    const trivialKey = deterministicPartitionKey(event);
    console.log(trivialKey);
    expect(trivialKey).toBe("1234789");
  });

  it("Returns hashed value of the event object when no partitionKey is provided.", () => {
    const event = {
      randomData: "Test Data without partition key",
    };
    const trivialKey = deterministicPartitionKey(event);

    expect(trivialKey.length).toBe(128);
  });
});
