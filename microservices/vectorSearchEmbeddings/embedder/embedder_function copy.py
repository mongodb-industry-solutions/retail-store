import json
import sys
from vertexai.language_models import TextEmbeddingInput, TextEmbeddingModel


def generate_embeddings(request: str) -> tuple[str, int, dict]:
    """
    Generates embeddings for input text using Vertex AI's Text Embedding Model.

    Args:
        request: A JSON-formatted string containing a "text" key or a list of texts.

    Returns:
        A tuple containing the response JSON string, HTTP status code, and headers.
    """
    try:
        request_json = json.loads(request)

        # Handle single text input or a list of texts
        if not request_json or "text" not in request_json:
            error = {"error": "'text' is required in the request."}
            return json.dumps(error), 400, {"Content-Type": "application/json"}

        texts = request_json["text"]
        if not isinstance(texts, list):
            texts = [texts]

        # Initialize the model
        model = TextEmbeddingModel.from_pretrained("text-embedding-005")

        # Generate embeddings
        inputs = [TextEmbeddingInput(text, "RETRIEVAL_DOCUMENT") for text in texts]
        print(inputs)
        embeddings = model.get_embeddings(inputs)

        # Extract embedding values
        vectors = [embedding.values for embedding in embeddings]

        # Prepare the response
        result = {"vectors": vectors, "status": 200}
        return json.dumps(result), 200, {"Content-Type": "application/json"}

    except Exception as e:
        # Handle unexpected errors
        error = {"error": str(e)}
        return json.dumps(error), 500, {"Content-Type": "application/json"}


if __name__ == "__main__":
    input_data = sys.argv[1]  # Get input from Node.js
    response, status, headers = generate_embeddings(input_data)
    print(response)
