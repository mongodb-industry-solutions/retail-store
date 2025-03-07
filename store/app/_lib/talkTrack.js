const behindTheScenesSection = {
    heading: "Behind the Scenes",
    content: [
        {
            heading: "Architecture overview",
            body: "",
        },
        {
            image: {
                src: "/talkTrack/Architecture.png",
                alt: "Architecture",
            },
        },
        {
            heading: "",
            body: `<p>Lets take a look at our architecture. At the core we have our database, 
            which contains the product catalog of our e-commerce store. We also have an object 
            storage where the unstructured data lives. In this demo, that is our image files 
            for our catalog. This could be for example an S3, a Google Storage bucket or an 
            Azure Blob storage.</p> 
            <p>The flow starts at the left hand side, when a new product is received. This 
            can be a manual input or an automated batched event. Once we get the new product 
            on the system retailers can generate the description by sending a query to TogetherAI's 
            endpoint. We are using their Vision Models that can process and understand images 
            alongside text. These models combine <strong>computer vision and natural language processing</strong>.</p> 
            <p>Inside the request we specify which LLM type we want to use, the length, the languages 
            in which we want this description and of course the product's image URL so the model can process it.</p>
            <p>Then, TogetherAI takes this data and uses one of its Llama3 <a href="https://www.together.ai/models" target="_blank">vision models</a> 
            to scan the image and generate a description that matches the specified requirements. And it returns the 
            descriptions to the product description application.</p>
            <p>The product along with its description will be then updated in real time inside the catalog. 
            And at any point in time the UX writing team can enhance these descriptions from inside the application 
            and this will be updated on the catalog.</p>
            `,
            isHTML: true
        },
        {
            heading: "",
            body: "The main tech stack components can be found below.",
        },
        {
            heading: "",
            body: [
                "MongoDB Atlas for the database.",
                "Togeteher.AI for generating the products descriptions using their available chat LLMs",
                "S3 buckets. This can be any file storage system. Such as: GCP buckets, Azure containers or AWS S3 buckets",
                "GC Virtual Machine. The deployed app of this demo is deployed on a GC virtual machine.",
                "Next.js App Router for the framework"
            ],
        },
    ],
}
const prodDescriptionSection = {
    heading: "Product Description Generator",
    content: [
        {
            heading: 'Product Description',
            body: 'While product onboarding as a whole encompasses many steps in this demo we will focus solely on the description-writing process. When onboarding a new product, retailers must craft a description that accurately aligns with the product image before deploying it to their e-commerce portal. '
        },
        {
            heading: "The power of a good description",
            body:`<p>Having a great description can enhance user engagement and satisfaction as  
            <a href="https://www.businessdasher.com/importance-of-product-description/?utm_source=chatgpt.com" target="_blank"> 87% of online shoppers consider product descriptions to be crucial when making a 
            buying decision</a>. On the other hand, having inaccurate descriptions can result in 
            revenue loss and trust decline with your customer base as <a href="https://www.ax-semantics.com/en/blog/product-descriptions?utm_source=chatgpt.com" target="_blank">40% of consumers have 
            returned online purchases due to poor product content</a>.</p>`,
            isHTML: true
        },            
        {
            heading: "Challenges & considerations",
            body: [
                'Structuring product descriptions that addresses their target’s needs and desires while maintaining a consistent tone across the platform.',
                'Creating SEO-optimized product descriptions to drive organic traffic and improve search engine rankings.',
                'For multilingual portals and with multiple operating geographies, this challenge of accuracy increases.',
                'Even after a description is written, too often there is still a content approval process that needs to happen, delaying the process.'
            ],
        },
    ],
}
const whyMDBSection = {
    heading: "Why MongoDB?",
    content: [
        {
            heading: "MongoDB + TogetherAI",
            body: `
                Product onboarding to a retail e-commerce portal is a time-consuming effort for many retailers. They need to ensure they’ve created a product description that matches the image, then deploy it to their e-commerce portal. For multilingual portals and multiple operating geographies, this challenge of accuracy increases. With Together AI’s support for multimodal models (e.g. Llama 3.2) and MongoDB Atlas’s vector embeddings, we can create accurate product descriptions in multiple languages.
            `,
        },
        {
            heading: "Embeddings and inference with Together AI",
            body: "Together AI generated product descriptions based on images retrieved from the product catalog using Llama 3.2 vision models. This way, each product’s unique characteristics were considered, then generated in multiple languages. These descriptions could then be embedded into the MongoDB Atlas Vector Search database via a simple API."
        },
        {
            heading: "Indexed embeddings with MongoDB Atlas Vector Search",
            body: "Using MongoDB Atlas Vector Search capabilities, we could create embeddings (as an extended phase of this architecture), and then indexed them to be used to retrieve relevant data based on other matched product queries."
        },
        {
            heading: "Real-time data processing",
            body: "By connecting this setup to a real-time product dataset, we ensured that product descriptions in multiple languages were always updated automatically. So when a marketplace vendor or retailer uploads new images with distinct characteristics, they get up-to-date product descriptions in the catalog."
        },
        {
            heading: "Mitigation of vendor lock-in risk",
            body: "The fully managed multi-cloud database service, supports deployments across major cloud providers such as AWS, Azure, and Google Cloud. This autonomy allows businesses to adapt more readily to evolving technological landscapes "
        },
    ],
}
export const shopPage = [
    prodDescriptionSection,
    behindTheScenesSection,
    {
        heading: "How to demo",
        content: [
            {
                heading: "Understanding this page",
                body: `This page contains a formulary to generate descriptions of a product automatically. Onboarding a new product to a catalog means shorter times to market.`,
            },
            {
                heading: "How to demo this page",
                body:''

            },
            {
                heading: "",
                body:'Understanding the "Description Generator” page'

            },
            {
                heading: "",
                body: [
                
                    {
                        heading: "You have 4 options in which you can select a product to generate the description",
                        body: [
                            'First, by pasting the ObjectId of a product inside the input field and clicking on “Upload”.',
                            'Second one, by clicking on the Sprinkle button inside the catalog.',
                            'Third one, by clicking on “Use sample image from catalog” this will always load the same product sample image of a shoe. ',
                            'And lastly, by clicking on “Upload product image” this will allow you to do the demo with an image that you Upload. Take advantage of this by uploading a product similar to what your prospect would like to see.'
                        ]
                    },
                    {
                        heading: "You will see the image of the product displayed inside the dotted rectangle.",
                        body: []
                    },
                    {
                        heading: "Select the Model, Languages (max 3) and Length you want for your descriptions. Note that En, Sp, Fr will be faster to generate than other languages.",
                        body: []
                    },
                    {
                        heading: "Click on “Generate descriptions",
                        body: []
                    },
                    {
                        heading: "You will see on the right side the descriptions generated for the selected languages, length and model",
                        body: []
                    },
                    {
                        heading: "Go back to the “Product Catalog” and you will see the descriptions that were uploaded to the catalog. Just make sure filters align to what you selected when generating the descriptions. To go directly to that product inside the catalog use the button as a shortcut.",
                        body: []
                    }
                ]

            }
        ],
    },
    whyMDBSection
]
export const catalogPage = [
    prodDescriptionSection,
    behindTheScenesSection,
    {
        heading: "How to demo",
        content: [
            {
                heading: "Understanding this page",
                body: `This page represent the Retailer's catalog. All this products are inside MongoDB Atlas`,
            },
            {
                heading: "How to demo this page",
                body: ''

            },
            {
                heading: "",
                body: "Understand the 'Product catalog' page"

            },
            {
                heading: "",
                body: [
                    {
                        heading: "Here you can see the entire product catalog, this is stored in MongoDB Atlas",
                        body: []
                    },
                    {
                        heading: "You can filter the catalog with the filters on the green banner. Model refers to the model used to generate the descriptions, and Length refers to the length of the description.",
                        body: []
                    }
                ]
            },
            {
                image: {
                    src: "/talkTrack/filters.png",
                    alt: "Filters",
                }
            },
            {
                heading: "",
                body: [
                    {
                        heading: "Click on the Sprinkle Icon to generate the description of that product.",
                        body: []
                    },
                    {
                        heading: "Click on '{}' to see the full document model of that product.",
                        body: []
                    },
                    {
                        heading: "Click on  in case you want to delete all descriptions of that specific product. (this is to help you continue using one product for the demo, not something differentiative or to highlight from the demo).",
                        body: []
                    },
                ]
            },
        ],
    },
    whyMDBSection
]