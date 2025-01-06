import sys
import functions_framework
import json
import vertexai
from vertexai.language_models import TextEmbeddingModel

def generate_embeddings(request):
    request_json = json.loads(request)
    
    if request_json and "text" in request_json:
        text = request_json["text"]
    else:
        error = { "error": "'text' is required." }
        return json.dumps(error), 400, {"Content-Type": "application/json"}

    vertexai.init(project="ist-retail-demo", location="us-central1")

    model = TextEmbeddingModel.from_pretrained("text-embedding-005")
    embeddings = model.get_embeddings(text)
    vectors = []
    for embedding in embeddings:
        vector = embedding.values
        vectors.append(vector)

    result = {"vectors": vectors, "status": 200}
    print(json.dumps(result))
    return json.dumps(result)

if __name__ == "__main__":
    input_data = sys.argv[1]  # Get input from Node.js
    generate_embeddings(input_data)
