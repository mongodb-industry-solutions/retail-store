## Getting Started

Restore the e-commerce data to your own MongoDB Atlas database
```bash
mongorestore --gzip --dir=dump/dotLocalStore --uri "mongodb+srv://<user>:<password>@<cluster-url>/<target-database>"
```
Note 1: we can focus for now only on: users, products and locations
Note 2: This dump was generated from executing the following command on the original db
```bash
mongodump --uri "mongodb+srv://<user>:<password>@<cluster-url>/<source-database>" --gzip
```

Then, create a .env.local file at the root level woth the following env vars
```bash
## .env
MONGODB_URI=<mongodb-connection-string>
DATABASE_NAME=<your-db-name>
```



Finally, install dependencies
```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
