exports = async function(changeEvent) {
    console.log("*** start ***");
  
    // MongoDB details
    const docId = changeEvent.documentKey._id;
    const serviceName = "";
    const databaseName = "";
    const collection = context.services.get(serviceName).db(databaseName).collection(changeEvent.ns.coll);
  
    // Embedding variables
    const embeddingFieldName = "text_embedding";
    const fieldsToEmbed = ["name", "description", "articleType", "season", "brand"];
  
    try {
      // Handle insert, update, or replace operations
      if (["insert", "update", "replace"].includes(changeEvent.operationType)) {
        const text = fieldsToEmbed.map((field) => changeEvent.fullDocument[field]).join(" ");
        const body = JSON.stringify({ text });
        console.log("req body: ", body);
  
        // HTTP POST request
        const response = await context.http.post({
          url: "<YOUR_EMBEDDING_GC_FUNCTION>",
          body: body,
          headers: { "Content-Type": ["application/json"] },
        });
  
        console.log("HTTP Status Code:", response.statusCode);
  
        // Check if the response is successful
        if (response.statusCode !== 200) {
          console.error("Error in embedding service:", response.body.text());
          throw new Error("Embedding service returned an error.");
        }
  
        // Parse the response body
        let parsedResponse;
        try {
          parsedResponse = EJSON.parse(response.body.text());
          console.log("Parsed Response:", parsedResponse);
        } catch (error) {
          console.error("Failed to parse response:", response.body.text());
          throw new Error("Failed to parse embedding response.");
        }
  
        // Extract the embedding
        const embedding = parsedResponse.vectors?.[0];
        if (!embedding || !Array.isArray(embedding)) {
          throw new Error("Invalid embedding format received.");
        }
        console.log("Embedding:", embedding);
  
        // Update the MongoDB document with the embedding
        await collection.updateOne(
          { _id: docId },
          { $set: { [embeddingFieldName]: embedding } }
        );
        console.log("Successfully updated document with embedding.");
      }
    } catch (err) {
      console.error("Error performing MongoDB trigger:", err.message);
    }
  };
  