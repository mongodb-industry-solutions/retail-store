# Leafy Pop-up store.

In this Next.js project lies the demo of an e-commerce called 'Leafy Pop-Up Store', encompassing all the essentials for a seamless run. We'll dive into the technical side of the demo; pre-requisites, how to run, the arhcitecture and so on.

This demo is design to showcase how MongoDB's technology seamlessly integrates in retail-like scenarios. Additionally, it exemplifies how MongoDB can elevate e-commerce operations to navigate the ever-evolving landscape of the industry to keep up with customer expectations.

# Running the demo locally

## Pre-requisites

Make sure you have the right packages and programs installed to run everything locally.
- **node**: The project manages its dependencies through npm (node package manager).You can download Node.js from the official website: [Node.js Downloads](https://nodejs.org/en/download). After installing Node.js, npm will be available by default.
- **git**: The versioning of this project is controled through Git. Make sure you have Git installed on your system. You can download Git from the official website:  [Git Downloads](https://git-scm.com/downloads)
- **GCP account**: This is optional but, will be required in the case you wish to have run the microservices on your end.
- **MongoDB Atlas account**: This is optional but, will be required in the case you wish to have yoour own data collection from a different MongoDB database.

## Set up instructions

### Part 1 - Getting the code

Clone the repository from GitHub into your computer:

```shell
git clone https://github.com/mongodb-industry-solutions/retail-store.git
```

Then, install dependencies through npm
```bash
cd retail-store/store
npm install
```

### Part 2 - Running the server

To run the development server execute the following command inside /retail-store:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Finally, navigate to [http://localhost:3000](http://localhost:3000) with your browser.
