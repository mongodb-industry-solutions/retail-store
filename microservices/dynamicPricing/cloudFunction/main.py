from pymongo import MongoClient
from datetime import datetime, timedelta
import json
import numpy as np
import pandas as pd
import joblib
import os
from google.cloud import storage
import functions_framework
import base64
from bson import ObjectId
from google.cloud import aiplatform

@functions_framework.cloud_event
def hello_pubsub(cloud_event):
  event_data = base64.b64decode(cloud_event.data["message"]["data"])
  print(event_data)
  event_data = json.loads(event_data)
  print(event_data)
  event_data = pd.DataFrame([event_data])
  print(event_data)

# Correctly handle the '_id' field when it's a string, getting the event_id and product_id data
  event_id = ObjectId(str(event_data['_id'].loc[0]))
  print(event_id)
  product_id = event_data['product_id'].loc[0]
  print(product_id)

  # Set your GCS bucket and file path
  bucket_name = 'dyn_pricing_scaler'
  scaler_file_name = 'scaler.joblib'
  label_encoder_name = 'labelEncoder.joblib'

  # Initialize a GCS client
  storage_client = storage.Client()

  # Get the bucket
  bucket = storage_client.bucket(bucket_name)

  # Get the blob (file) containing the scaler
  blob1 = bucket.blob(scaler_file_name)

  # Download the scaler file to a temporary location
  scaler_temp_file_path = '/tmp/' + scaler_file_name
  blob1.download_to_filename(scaler_temp_file_path)

  # Download the label encoder to a temporary location
  blob2 = bucket.blob(label_encoder_name)
  label_encoder_temp = '/tmp/' + label_encoder_name
  blob2.download_to_filename(label_encoder_temp)

  # Clean unnecessary columns
  if '_id' in event_data.columns:
    event_data = event_data.drop(columns=['_id'])
  print(event_data)
  event_data.drop('price', axis=1, inplace=True)
  event_data.drop('timestamp', axis=1, inplace=True)
  print(event_data)
  event_data.drop('product_id', axis=1, inplace=True)
  print(event_data)
  event_data.drop('product_name', axis=1, inplace=True)
  print(event_data)

  #Load label encoder
  label_encoders = joblib.load(label_encoder_temp)
  print(label_encoders)

  #Encode categorical fields
  for column, encoder in label_encoders.items():
    event_data[column] = encoder.transform(event_data[column])
  print(event_data)


  # Load the scaler using joblib
  scaler = joblib.load(scaler_temp_file_path)
  print(scaler)


  # Use scaler
  columns_to_scale = ['action', 'encoded_name']
  event_data[columns_to_scale] = scaler.transform(event_data[columns_to_scale])
  print(event_data)

  #Prepare data as tensors
  #first_row_scaled = event_data[0, :].reshape(1, -1)
  #print(first_row_scaled)
  event_data = event_data.to_numpy()

  # Prepare input data for VertexAI
  input_data = {"instances": event_data}
  print(input_data)
  input_data['instances'] = input_data['instances'].tolist()
  print(input_data)
  input_data_json = json.dumps(input_data)
  print(input_data_json)

  # Call VertexAI endpoint
  endpoint_id = "your-endpoint-id"
  project_id = "your-project-id"
  location = "your-project-location"
  endpoint_url = f"https://us-central1-aiplatform.googleapis.com/v1/projects/{project_id}/locations/us-central1/endpoints/{endpoint_id}:predict"

  aiplatform.init(project=project_id, location=location)

  endpoint = aiplatform.Endpoint(endpoint_id)

  prediction = endpoint.predict(instances=input_data['instances'])

  print(prediction)
  
  pred_price = prediction.predictions[0][0]

  print(pred_price)
  
  #Start MongoClient
  mongo_uri = "your-mongo-db-connection-uri" #remember you can set it up in a .env file
  client = MongoClient(mongo_uri)

  db = client["dotLocalStore"]  # Replace "your_database" with your actual database name
  collection = db["products"]
  feature_store = db["events"]

  # Update products collection document with 'pred_price'
  collection.update_one({"id": int(product_id)}, {"$set": {"pred_price": pred_price}})

  # Update events collection (feature_store) with event tensor
  tensor = event_data.tolist()
  print(tensor)
  feature_store.update_one({"_id": event_id}, {"$set": {"tensor": tensor }})

  # Clean up: Delete the temporary files
  os.remove(scaler_temp_file_path)
  os.remove(label_encoder_temp)
  print(pred_price)

  return pred_price