import random
import pymongo
from pymongo import MongoClient
import os
import time
from google.cloud import pubsub_v1
from dotenv import load_dotenv
from faker import Faker
from datetime import datetime, timedelta
import json
from bson import ObjectId
import hashlib

# Load environment variables
load_dotenv()
MONGODB_URI = os.getenv('MONGODB_URI')
GOOGLE_APPLICATION_CREDENTIALS = os.getenv('GOOGLE_APPLICATION_CREDENTIALS')
GOOGLE_CLOUD_PROJECT = os.getenv('GOOGLE_CLOUD_PROJECT')
PUBSUB_TOPIC_ID = os.getenv('PUBSUB_TOPIC_ID')

# Initialize MongoDB client
mongo_client = pymongo.MongoClient(MONGODB_URI)
db = mongo_client["dotLocalStore"]
behaviors_collection = db["events"]
products_collection = db["products"]

# Initialize Google Cloud Pub/Sub publisher
publisher = pubsub_v1.PublisherClient()
topic_path = publisher.topic_path(GOOGLE_CLOUD_PROJECT, PUBSUB_TOPIC_ID)

def fetch_products():
    """Fetch products from MongoDB"""
    return list(products_collection.find({}))

def generate_ecommerce_behavior(product):
    """Generate a single synthetic ecommerce behavior data for a given product"""
    # Encode product_name into a numerical field
    encoded_name = int(hashlib.sha256(product["name"].encode('utf-8')).hexdigest(), 16) % 10**8
    behavior = {
        "product_name": product["name"],
        "product_id": product["id"],
        "action": random.choice(["view", "add_to_cart", "purchase"]),
        "price": product["price"],
        "timestamp": datetime.now().isoformat(),  # Format timestamp for JSON serialization
        "encoded_name": encoded_name
    }
    return behavior

# Custom JSON Encoder that converts ObjectId to str
class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

def push_event_to_mongodb(behavior):
    """Push a single ecommerce behavior data to MongoDB"""
    behaviors_collection.insert_one(behavior)
    print("Pushed an event to MongoDB.")

def push_event_to_pubsub(event):
    """Push a single event to Google Cloud Pub/Sub"""
    try:
        # Attempt to serialize the event to JSON
        data = json.dumps(event, cls=JSONEncoder).encode("utf-8")
        # Attempt to publish the serialized data to Pub/Sub
        future = publisher.publish(topic_path, data=data)
        print(f"Published id:{event['product_id']} product:{event['product_name']} to Pub/Sub.")
        future.result()  # Block until the publish completes
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    products = fetch_products()
    num_behaviors_per_cycle = 150

    try:
        while True:
            for _ in range(num_behaviors_per_cycle):
                # Select a random product
                selected_product = random.choice(products)
                # Generate behavior for the selected product
                behavior = generate_ecommerce_behavior(selected_product)
                # Push the behavior to MongoDB
                push_event_to_mongodb(behavior)
                # Push the behavior to Pub/Sub
                push_event_to_pubsub(behavior)
                # Wait for 3 seconds before generating the next behavior
            time.sleep(3)
    except KeyboardInterrupt:
        print("Stopped by the user.")
