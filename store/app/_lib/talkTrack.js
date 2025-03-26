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
            heading: 'Vector search for semantic searches',
            body: '<p>Traditional search engines match exact words, but in an e-commerce catalog, shoppers often search in ways that don’t perfectly align with product names.</p><p>Instead of matching exact words, Vector Search leverages precomputed embeddings of the product catalog. When a user performs a semantic search, their query is processed by an AI model to generate a corresponding vector embedding.</p><p>Vector Search then compares this query embedding against the existing product embeddings, retrieving the most relevant matches based on meaning rather than exact text. The closer two vectors are (the search query and the product embedding), the more similar their meaning.</p>',
            isHTML: true
        },
        {
            heading: "Why it matters for e-commerce?",
            body: `<p>Vector Search goes beyond simple keyword matching—it leads to more relevant search results, smarter recommendations, and a better shopping experience.</p><p>By storing product embeddings in MongoDB, we can fine-tune searches, ensuring users see both relevant results and highlighted products. This enhances personalization, product discovery, and conversions.</p>`,
            isHTML: true
        },
        
    ],
}
const behindTheScenesSectionVectorSearch = {
    heading: "Behind the Scenes",
    content: [
        {
            heading: "Understanding Embeddings",
            body: `
                <p>Embeddings are numerical representations of words, images, or concepts that allow computers to understand their meaning in a vector space. Instead of relying on exact words, embeddings capture relationships and similarities between things.</p>
            `,
            isHTML: true
        },
        {
            image: {
                src: "/images/VectorSearchEmbeddings.png",
                alt: "Semantic Search with Vector Search"
            },
        },
        {
            heading: "How Does Vector Search Work?",
            body: `
                
                <p>In the illustration, each animal is stored with a vector that represents its characteristics—like <strong>type of animal (y-axis) and color (x-axis)</strong>.</p>
                <p>When searching for <strong>"A very white cat"</strong>, the system <strong>converts the query into a vector using an AI model</strong> and then uses <strong>Vector Search</strong> to find the closest stored vectors in <strong>MongoDB</strong>.</p>
                <p>The results follow a simple rule: the closer an animal's vector is to the query vector, the more similar it is in meaning. That’s why an <em>orange cat</em> appears closer to the white cat than a black dog.</p>
                <p>In <strong>Vector Search</strong>, this same logic applies—each product in the catalog is stored with its embedding, and searches return the most relevant results based on vector similarity, not just text matches.</p>
                 <p><strong>Clarification: This is a Simplified Representation</strong></p>
                 <p><strong>High dimensionality:</strong> Embeddings exist in spaces with hundreds or thousands of dimensions. Dimensionality reduction techniques help optimize them without losing meaning, but they are never just two-dimensional.</p>
                 <p><strong>Vector ≠ Embedding:</strong> A vector is a mathematical structure, while an embedding is an optimized representation that captures complex relationships in data.</p>
                 <p><strong>Individual numbers in an embedding don’t have a literal meaning:</strong> They emerge from statistical patterns learned by the model. Interpreting each dimension in isolation doesn’t make sense—what matters is how embeddings relate to each other.</p>
            `,isHTML: true
        },
       
    ],
}
const whyMDBSection = {
    heading: "Why MongoDB?",
    content: [
        {
            heading: "Versatile: All Data in One Place",
            body: `
                <p>MongoDB allows you to store <strong>all types of data together</strong>, including product details, geospatial data, and AI-generated embeddings.</p>
                <p>Instead of managing separate databases for different data types, MongoDB keeps everything in one place, making your system <strong>more efficient and easier to manage</strong>.</p>
            `,
            isHTML: true
        },
        {
            heading: "Flexible: Schema Flexibility Without Downtime",
            body: `
                <p>Product catalogs change constantly, requiring updates to descriptions, attributes, and categories.</p>
                <p>MongoDB’s <strong>dynamic schema</strong> allows these modifications <strong>without downtime</strong>, ensuring uninterrupted service.</p>
                <p>This flexibility is critical for e-commerce platforms that need to scale and adapt quickly to market demands.</p>
            `,
            isHTML: true
        },
        {
            heading: "Easy: Developer-Friendly & Intuitive",
            body: `
                <p>MongoDB’s intuitive <strong>document model</strong> makes working with complex data structures simple.</p>
                <p>Developers can focus on <strong>innovation</strong> rather than dealing with rigid schemas or complex queries.</p>
                <p>By integrating embeddings and operational data in a single platform, MongoDB <strong>streamlines AI-powered search and personalization</strong> without additional overhead.</p>
            `,
            isHTML: true
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
    behindTheScenesSectionVectorSearch,
    {
        heading: "How to Demo",
        content: [
            {
                heading: "Demo Steps",
                body: `
                <p><strong>Step 1:</strong> Navigate to the <strong>Shop</strong> screen.</p>
                <p><strong>Step 2:</strong> In the search bar, type <strong>"Kitchen appliances"</strong>. 
                The products that load are retrieved using <strong>Atlas Search</strong> based on 
                product names. Notice that the top results are food items rather than appliances 
                because they contain the word "kitchen" in their name, but they don’t truly match 
                what the user is looking for.</p>
            `,
            isHTML: true
        },
        {
            image: {
                src: "/images/KitchenSearchExample_1.png",
                alt: "Atlas Search Results Example"
            }
        },
        {
            body: `
                <p><strong>Step 3:</strong> Enable <strong>Vector Search</strong> by turning on the toggle next to the 
                input field and pressing <strong>Enter</strong> to search again. Now, the top results 
                are much closer to actual kitchen appliances.</p>
            `,
            isHTML: true
        },
        {
            image: {
                src: "/images/KitchenSearchExample_2.png",
                alt: "Vector Search Results Example"
            }
        },
        {
            body: `
                <p><strong>Step 4:</strong> Try the following example queries using Vector Search:</p>
                <p>House decoration<br>Kitchen appliances<br>Gift for a kid<br>Clothes for winter</p>
                <p>These examples demonstrate the improved relevance of Vector Search compared to 
                standard Atlas Search, providing a clearer understanding of how AI-driven search enhances 
                the user experience.</p>
            `,
            isHTML: true
            }
        ]
    },
    whyMDBSection
];