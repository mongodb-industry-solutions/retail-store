const dynamicPricingSection = {

    heading: "Dynamic Pricing",
    content: [
        {
            heading: 'Dynamic Pricing',
            body: `
                With real-time pricing strategies, businesses can change product prices on the 
                fly — both online and in-store through digital price tags — by leveraging data 
                points across a wide variety of systems, such as inventory, marketing performance, 
                and even regional and digital trends. Imagine dynamically lowering prices in 
                response to excess inventory or new promotions, or increasing the price on 
                something trending, without manual intervention.
            `
        },
        {
            heading: "Why it matters?",
            body: `
                <p>Research has shown that time-based dynamic pricing can increase demand by up to 
                20% during off-peak hours and boost companies revenue by an impressive 42%.</p>
                <p>Dynamic pricing can be approached in various ways. In this demo we highlight how 
                utilizing customer behavior data can be a game-changer for your pricing strategy.
                <strong>Customer behavior</strong> refers to how customers interact with products or services online. 
                This includes their <strong>browsing and search patterns, cart activity, page views, and 
                purchase decisions</strong>.</p>
                `,
            isHTML: true
        }
    ],
}
const vectorSearchSection = {

    heading: "Vector Search",
    content: [
        {
            heading: 'Product Description',
            body: 'While product onboarding as a whole encompasses many steps in this demo we will focus solely on the description-writing process. When onboarding a new product, retailers must craft a description that accurately aligns with the product image before deploying it to their e-commerce portal. '
        },
        {
            heading: "The power of a good description",
            body: `<p>Having a great description can enhance user engagement and satisfaction as  
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
export const shopPageDynamicPricing = [
    dynamicPricingSection,
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "Architecture overview",
                body: "",
            },
            {
                image: {
                    src: "/images/architecture.png",
                    alt: "Architecture",
                },
            },
            {
                heading: "",
                body: `<p>MongoDB serves as the operational data layer, storing and managing crucial 
                information throughout the system. User behavioral data from different applications 
                is captured and funneled into a <strong>Pub/Sub topic</strong> for real-time messaging.</p> 
               
               <p>We subscribe a <strong>Cloud Function</strong> to such a topic to process these events, transforming 
               raw data into tensors suitable for the <strong>TensorFlow machine learning model hosted on 
               Vertex AI's endpoint.</strong> </p>
               
                <p>The model will return the optimal price point based on the customer behavior and 
                will be inserted back into the product catalog MongoDB Atlas collection so our ecommerce 
                application can update prices in real time.</p>  


                <p>Additionally, the same Cloud Function is pushing the tensorized customer behavior events into 
                a new collection in MongoDB Atlas that will serve as our Feature Store for model fine tuning and 
                retraining purposes in the future. </p>

                <p>This architecture demonstrates MongoDB Atlas's ability to provide the scalable and efficient 
                data management essential for retail operations. By seamlessly integrating with Vertex AI and 
                Google Cloud Pub/Sub, it enables real-time dynamic pricing based on customer behavior, leading to 
                improved customer satisfaction and increased revenue.</p>
                `,
                isHTML: true
            },
            {
                heading: "",
                body: "The main tech stack components can be found below.",
            },
            {
                heading: "",
                body: `
                    <ul>
                        <li>
                            <p><strong>Data ingestion:</strong> Pub/Sub acts as a high-speed pipeline, efficiently bringing in large amounts of customer behavior data formatted as JSON.</p>
                        </li>
                        <li>
                            <p><strong>Data processing:</strong> Vertex AI Workbench provides a clean environment for data cleaning and training TensorFlow models. These models analyze customer events, product names, and existing prices to predict the optimal price for each item.</p>
                        </li>
                        <li>
                            <p><strong>Feature storage:</strong> MongoDB Atlas serves as a central hub for all the features used by the model. This ensures consistency between the data used for training and the data used for real-time predictions, as well as the operational data for your applications, thereby reducing the overhead of “in-app analytics.” It also simplifies the overall process by keeping everything in one place.</p>
                        </li>
                        <li>
                            <p><strong>Model orchestration:</strong> Cloud Functions act like a conductor, directing the flow of customer event data. They take the data from Pub/Sub, transform it into a format usable by the model (tensors), and store it in MongoDB Atlas. This allows the model to easily access the information it needs.</p>
                        </li>
                    </ul>
                `,
                isHTML: true
            },
        ],
    },
    {
        heading: "How to demo",
        content: [
            {
                heading: "Understanding this page",
                body: `<p>This page contains the product catalog of an e-comerce store.
                    There are two <img src="/icons/talkTrackIcon.png" alt="TalkTrackWand"/> 
                    talk track buttons in this page. This one contains the information about 
                    the Dynamic Price feature and the one next to the search bat contains 
                    the information on the Vector Search feature.</p>    
                `,
                isHTML: true
            },
            {
                heading: "How to demo this page",
                body: `
                    <ol>
                        <li>
                            <p>Allow some time for the products to load on the screen. While this loads,
                            please don't click any of the Toggle buttons.</p>
                        </li>
                        <li>
                            <p><strong>The MongoDB products</strong> have a purple label that reads <strong style="color:purple">Predicted Price $</strong>
                            That is the recommended price calculated by the dynamic pricing solution.</p>
                        </li>
                        <li>
                            <p>Turn on the Toggle on the top left corner that says <strong>Open Store</strong>
                            <img src="/icons/toggle.png" alt="toggle"/></p>
                        </li>
                        <li>
                            <p>When the store is open there are random customer events being fired in the
                            backend to simulate users behaviour, such as:</p>
                            <ul>
                                <li>
                                    <p>looking at products,</p>
                                </li>
                                <li>
                                    <p>adding them to their cart or </p>
                                </li>
                                <li>
                                    <p>buying them.</p>
                                </li>
                            </ul>
                            <p>Based on these events the predictive price for the
                            products will update to recommend a lower or higher price. It also shows an
                            arrow up in case the new predictive price is higher than the last one or
                            arrow down if it's lower than the previous one.</p>
                        </li>
                    </ol>
                    <p>
                        <strong>Important note: </strong>This toggle will fire events on the back for 2 minutes. After
                        those 2 minutes the backend will stop generating the random customer
                        events to avoid excess calls to GC, however the toggle will remain ON. So
                        make sure to turn o and on the toggle to continue the demo in case you
                        need more than those 2 mins.
                    </p>

                `,
                isHTML: true
            }
        ],
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Centralized Feature Store",
                body: `
                    MongoDB acts as a centralized repository for storing, managing, and serving features for machine learning models. Its polymorphic capabilities allow for a single interface to represent various data types, facilitating the seamless incorporation of new pricing factors or variables without disrupting existing data structures.
                `,
            },
            {
                heading: "Scalability and Efficiency",
                body: "MongoDB's architecture supports horizontal scaling through sharding, enabling it to handle massive volumes of data efficiently. This scalability ensures that as data grows, the application’s performance remains unaffected, making it ideal for real-world applications with large-scale data demands."
            },
            {
                heading: "Real-Time Price Updates",
                body: "MongoDB enables real-time adjustments in applications by allowing dynamic prices generated from customer behavior to be inserted or updated directly into the product catalog. This ensures that the application's front end retrieves the most current pricing data, enhancing user experience."
            },
            {
                heading: "Flexible Document Schemas",
                body: "MongoDB's document model allows for flexible schemas, enabling the representation of complex, nested data structures. This flexibility is particularly beneficial in dynamic pricing models where data structures may evolve over time."
            },
            {
                heading: "Powerful Querying and Analytics",
                body: "MongoDB's robust querying capabilities facilitate complex data analysis, which is essential for developing effective dynamic pricing strategies. Its aggregation framework allows for real-time analytics directly within the database, eliminating the need for external data processing tools."
            },
        ],
    }
]
export const shopPageVectorSearch = [
    vectorSearchSection,
    behindTheScenesSection,
    {
        heading: "How to demo",
        content: [
            {
                heading: "Understanding this page",
                body: `<p>This page contains the product catalog of an e-comerce store.
                    There are two <img src="/icons/talkTrackIcon.png" alt="TalkTrackWand"/> 
                    talk track buttons in this page. This one contains the information about 
                    the Vector Search feature and the one next to "Open Store" contains 
                    the information on the Dynamic Price feature.</p>    
                `,
                isHTML: true
            },
            {
                heading: "How to demo this page",
                body: ''

            },
            {
                heading: "",
                body: 'Understanding the "Description Generator” page'

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