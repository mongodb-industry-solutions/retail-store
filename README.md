## Getting Started

Restore the e-commerce data to your own MongoDB Atlas database
```bash
mongorestore --gzip --dir=dump/dotLocalStore --uri "mongodb+srv://<user>:<password>@<cluster-url>/<target-database>"
```

First install dependencies
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
