# Buying experience (RAG chatbot & Omnichannel ordering)

## Prerequisites

Make sure to have the following tools to follow along smoothly and run this demo on your own environment.
* MongoDB Atlas Account. Create an Atlas account at https://cloud.mongodb.com and provision a Cluster. You can follow the instructions from this article to set up your Cluster.
* Install Node. This will be required to install the node modules which contain all the necessary packages to run our demo. 
* Install Git. This will be required to clone the demo repository.

## Initial Configuration

### Step 1. Clone the repository
Start by obtaining the demo code. Open your terminal, navigate to the directory where you want to store the code, and run the following command:

git clone https://github.com/mongodb-industry-solutions/retail-store-v2.git

### Step 2. Set up environment variables and install dependencies
Navigate to the project directory and create a file called .env.local at the root level. This file is essential for managing configuration settings, especially when it contains sensitive information such as private keys.

```bash
cd retail-store-v2
touch .env.local 
```

Note: For Window’s users, replace touch .env.local with echo $null >> .env.local 

Open the .env.local file that you just created, and add the following environment variables.

```bash
MONGODB_URI=
DATABASE_NAME="leafy_popup_store"
COLLECTION_NAME="orders"
NODE_ENV="development"
```

Leave the MONGODB_URI blank for now, you will retrieve its value on Step 3. 

Install the node modules executing the following command:

```bash
npm install
```

This installation might take a few moments to complete, as all the required packages are being downloaded and installed into the project. Once the command finishes executing, a new folder named ‘node_modules’ will appear at the root level of the application code, containing the installed dependencies.

### Step 3. Retrieve your connection string
A MongoDB connection string is required to connect to the cluster you created in the ‘Prerequisites’ section. Follow the steps provided in this article to retrieve your connection string. 

When choosing your connection method for MongoDB, select the option labeled ‘Drivers’, as illustrated in Figure 4.

Figure 4. Atlas screen to choose a connection method.

Once you select the ‘Drivers’ option copy the provided connection string. It should look something like this:

```bash
mongodb+srv://<username>:<password>@<clusterAddress>
```

Great job! You have obtained the final variable needed for your .env.local file.  Assign the connection string to the MONGODB_URI variable replacing <username> and <password> with your actual credentials and save the changes. Your .env.local file should now resemble the following:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<clusterAddress>
DATABASE_NAME="leafy_popup_store"
COLLECTION_NAME="orders"
NODE_ENV="development"
```

###  Step 4. Populate your database
Next, populate your database with the required data and metadata required for the demo. In the application code locate the dump/leafy_popup_store directory. Inside it, there are several .gz files which contain the data and metadata of the collections: users, products, orders, locations and carts.

Use the mongorestore command to load the data from the database dump into a new database within your Cluster.

Let's go back to your terminal, navigate to the directory /retail-store-v2 (the root level of the application code), and run the following command:

```bash
mongorestore --gzip --dir=dump/leafy_popup_store --db=leafy_popup_store --uri "mongodb+srv://<user>:<password>@<cluster-url>"
```

This command will create the database and collections and log its progress. Upon completion, you should see a log like this:

```bash
92 document(s) restored successfully. 0 document(s) failed to restore.
```

Perfect! You now have your application code with environment variables, all the dependencies installed and the database created with the required data loaded.


Curious about how the database dump was generated? Check out  the documentation for the mongodump command. 


### Step 5. Create your Atlas Trigger
The scope of this demo is to simulate an omnichannel experience for the end customer. Due to this limitation scope, backend operations are performed to mimic the behind-the-scenes processes required to update an order's status. Such as workers from the warehouse managing the order, postal services delivering packages, or store employees packing an order.

These backend operations are enabled by a Database Trigger that listens to the orders collection. When a new order is created, the trigger executes an Atlas Function, which is designed in this demo to update the order status every 10 seconds, progressing through each stage until the order is marked as delivered.

To set up this Database Trigger login to your Atlas account. Once you are logged in, follow the how-to guide to learn how to create a trigger and understand the configuration form sections. Refer to Figure 5 for some specific details you will need to configure this trigger.


Figure 5. The configuration screen showing the ‘Trigger Details’ section.

As seen on the ‘Trigger Details’ section the following values are important to note:
* Trigger Type. Select Database type.
* Watch against. Select Collection
* Operation Type. Select  ‘Insert Document’ and ‘Update Document’ from the provided options.
* Name. The name of the cluster, database and collection should match the values from your .env.local file.

When you get to the ‘Event Type’ section the following values are important to note:
* Event type. Select Function
* Function. Whenever an Insert or Update event occurs in the orders collection, this function runs automatically. It receives the change event, as a parameter, which contains all relevant details about the event. 
The function code is provided within the application code at /retail-store-v2/microservices/atlas-trigger-omnichannel/updateOrderStatus.js file. Copy the entire contents of the file and paste it into the field.


Curious about which relevant details are provided by the change event? Take a look at the event object format in this article section.


Once you have created your Database Trigger you should be able to see it listed inside Atlas’ Triggers section with the status of .

### Step 6. Run the demo
Now you are all set to run the demo. Go back to the terminal, at the root of the application code execute the following command:

```bash
npm run dev
```

Then, open your browser and navigate to http://localhost:8080/cart and you should see the interface shown on Figure 6.


Figure 6. Omnichannel Ordering demo interface.

Congratulations, you have successfully set up the demo in your own environment! Select any user to see their cart and click on ‘Proceed to checkout’ to start your Omnichannel Ordering experience.
