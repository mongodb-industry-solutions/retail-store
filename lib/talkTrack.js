export const cartPage = [
    {
        heading: "What is Omnichannel Ordering Solution?",
        content: [
            {
                heading: "What is Omnichannel Ordering Solution?",
                body: `
                The Omnichannel Ordering Solution demo highlights how MongoDB can streamline the
                shopping experience by integrating online and in- store systems, enabling real-time
                inventory visibility and efficient order management. This solution supports Buy Online,
                Pick Up in Store (BOPIS) and home delivery options, reducing logistical issues while
                enhancing the customer journey. This unified approach ensures smooth transactions,
                up-to-date inventory, and improved customer satisfaction across multiple touchpoints.
                `,
            },
            {
                heading: "How to Demo this page",
                body: [
                    {
                        heading: "Click on “Proceed to Checkout”, in case you don’t see that button click first on “Fill cart” to get random products into the cart.",
                        body: []
                    },
                    {
                        heading: "Then you should see the “Proceed to checkout” button.",
                        body: []
                    }
                ]

            }
        ],
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "Architecture overview (omnichannel)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/omnichannel.svg",
                    alt: "Architecture",
                },
            },
            {
                heading: '',
                body: 'Database modifications are recorded in the oplog as events. The change stream API monitors this log to identify specific changes that applications or triggers are set to observe. Once detected, a change event is created and sent to the appropriate listener, whether it’s an external application or a database trigger, allowing them to respond in real time and initiate actions as needed.'
            },
            {
                heading: "Architecture overview (Agentic RAG chatbot)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/chatbotDiagram.png",
                    alt: "Architecture",
                },
            }
        ],
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Easy, Flexible and Fast",
                body: "MongoDB?s document model combines simplicity and flexibility, aligning with how developers naturally structure and retrieve data. This makes queries more intuitive and improves performance. As business needs evolve, the schema adapts seamlessly, allowing for rapid iteration without rigid constraints.",
            },
            {
                heading: "Real-Time Data Responsiveness",
                body: "Leverage MongoDB's Change Streams and Triggers to keep your data synchronized across all systems in real time. Whether updating order statuses or automating processes, MongoDB ensures seamless synchronization, all without adding an extra layer of complexity."
            },
            {
                heading: "Smart Customer Experience with RAG",
                body: "MongoDB Atlas and Dataworkz combine to deliver Agentic RAG-as-a-Service, improving customer interactions with smart, context-aware AI. Atlas uses vector embeddings for more accurate, meaning-based searches, while its scalable infrastructure ensures reliability during peak traffic. Dataworkz enhances this with agentic workflows powered by RAG pipelines, leveraging semantic search and knowledge graphs to pull the most relevant data for AI-driven responses."
            }
        ],
    },
]
export const checkoutPage = [
    {
        heading: "What is Omnichannel Ordering Solution?",
        content: [
            {
                heading: "What is Omnichannel Ordering Solution?",
                body: `
                The Omnichannel Ordering Solution demo highlights how MongoDB can streamline the
                shopping experience by integrating online and in- store systems, enabling real-time
                inventory visibility and efficient order management. This solution supports Buy Online,
                Pick Up in Store (BOPIS) and home delivery options, reducing logistical issues while
                enhancing the customer journey. This unified approach ensures smooth transactions,
                up-to-date inventory, and improved customer satisfaction across multiple touchpoints.
                `,
            },
            {
                heading: "How to Demo this page",
                body: [
                    {
                        heading: "Highlight the 2 shipping methods available ‘Buy Online, Pickup in store’ (BOPIS) which shows a list of available stores to pick up the order. And ‘Buy Online, Get Delivery At home’ which shows the address of that specific user",
                        body: []
                    },
                    {
                        heading: "Click on “Continue” once you have selected your preferred shipping method. This will generate the order and redirect you to the ”Order Details” page.",
                        body: []
                    }
                ]

            },

        ],
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "Architecture overview (omnichannel)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/omnichannel.svg",
                    alt: "Architecture",
                },
            },
            {
                heading: '',
                body: 'Database modifications are recorded in the oplog as events. The change stream API monitors this log to identify specific changes that applications or triggers are set to observe. Once detected, a change event is created and sent to the appropriate listener, whether it’s an external application or a database trigger, allowing them to respond in real time and initiate actions as needed.'
            },
            {
                heading: "Architecture overview (Agentic RAG chatbot)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/chatbotDiagram.png",
                    alt: "Architecture",
                },
            }
        ],
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Easy, Flexible and Fast",
                body: "MongoDB?s document model combines simplicity and flexibility, aligning with how developers naturally structure and retrieve data. This makes queries more intuitive and improves performance. As business needs evolve, the schema adapts seamlessly, allowing for rapid iteration without rigid constraints.",
            },
            {
                heading: "Real-Time Data Responsiveness",
                body: "Leverage MongoDB's Change Streams and Triggers to keep your data synchronized across all systems in real time. Whether updating order statuses or automating processes, MongoDB ensures seamless synchronization, all without adding an extra layer of complexity."
            },
            {
                heading: "Smart Customer Experience with RAG",
                body: "MongoDB Atlas and Dataworkz combine to deliver Agentic RAG-as-a-Service, improving customer interactions with smart, context-aware AI. Atlas uses vector embeddings for more accurate, meaning-based searches, while its scalable infrastructure ensures reliability during peak traffic. Dataworkz enhances this with agentic workflows powered by RAG pipelines, leveraging semantic search and knowledge graphs to pull the most relevant data for AI-driven responses."
            }
        ],
    },
]
export const orderDetailsPage = [
    {
        heading: "What is Omnichannel Ordering Solution?",
        content: [
            {
                heading: "What is Omnichannel Ordering Solution?",
                body: `
                The Omnichannel Ordering Solution demo highlights how MongoDB can streamline the
                shopping experience by integrating online and in- store systems, enabling real-time
                inventory visibility and efficient order management. This solution supports Buy Online,
                Pick Up in Store (BOPIS) and home delivery options, reducing logistical issues while
                enhancing the customer journey. This unified approach ensures smooth transactions,
                up-to-date inventory, and improved customer satisfaction across multiple touchpoints.
                `,
            },
            {
                heading: "How to Demo this page",
                body: ""
            },
            {
                heading: "",
                body: "From the Order details page you can highlight the following:",
            },
            {
                heading: "",
                body: [
                    `Any order: You first have the “Summary” which lists general info
                    about the order. Below that, you have the “Status” showing a Stepper
                    showing the order status progressing through each stage until the
                    order is marked as Delivered/Completed.
                    Every time the order moves forward with the next stage the stepper
                    circle will turn green and a new entry will show with the timestamp
                    that status was logged into the database.
                    Every order will automatically move from status every 10 seconds
                    thanks to an Atlas Trigger. The only status that depends on the user is
                    the “Customer in store” status from the BOPIS orders. This status is to
                    indicate to the store that the customer is physically at the store and
                    ready to pick up the order. So the customer has to click on the “I am
                    here” button to change of status`
                ],
            },
            {
                image: {
                    src: "/rsc/images/status.png",
                    alt: "Architecture",
                },
            },
            {
                heading: "",
                body: [
                    `Only ‘BOPIS’ orders. It has specific states displayed in the graph below`,
                    `Only ‘Buy Online, Get Delivery at Home’ orders. It has specific states displayed in the graph below`
                ],
            },
            {
                image: {
                    src: "/rsc/diagrams/statusFlow.png",
                    alt: "Architecture",
                },
            },
        ],
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "Architecture overview (omnichannel)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/omnichannel.svg",
                    alt: "Architecture",
                },
            },
            {
                heading: '',
                body: 'Database modifications are recorded in the oplog as events. The change stream API monitors this log to identify specific changes that applications or triggers are set to observe. Once detected, a change event is created and sent to the appropriate listener, whether it’s an external application or a database trigger, allowing them to respond in real time and initiate actions as needed.'
            },
            {
                heading: "Architecture overview (Agentic RAG chatbot)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/chatbotDiagram.png",
                    alt: "Architecture",
                },
            }
        ],
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Easy, Flexible and Fast",
                body: "MongoDB?s document model combines simplicity and flexibility, aligning with how developers naturally structure and retrieve data. This makes queries more intuitive and improves performance. As business needs evolve, the schema adapts seamlessly, allowing for rapid iteration without rigid constraints.",
            },
            {
                heading: "Real-Time Data Responsiveness",
                body: "Leverage MongoDB's Change Streams and Triggers to keep your data synchronized across all systems in real time. Whether updating order statuses or automating processes, MongoDB ensures seamless synchronization, all without adding an extra layer of complexity."
            },
            {
                heading: "Smart Customer Experience with RAG",
                body: "MongoDB Atlas and Dataworkz combine to deliver Agentic RAG-as-a-Service, improving customer interactions with smart, context-aware AI. Atlas uses vector embeddings for more accurate, meaning-based searches, while its scalable infrastructure ensures reliability during peak traffic. Dataworkz enhances this with agentic workflows powered by RAG pipelines, leveraging semantic search and knowledge graphs to pull the most relevant data for AI-driven responses."
            }
        ],
    },
]
export const ordersPage = [
    {
        heading: "What is Agentic RAG?",
        content: [
            {
                heading: "What is Agentic RAG?",
                body: `With Agentic RAG architecture different tools and functions can be accessed by the agent, enabling it to go beyond information retrieval and generation – it allows it to plan. Agents can determine if they need to retrieve specific information or not, which tool to use for the retrieval, and formulate queries. These capabilities are crucial as it enables the agent to pull information from multiple data sources, handling complex queries that require more than one source to formulate the response.`,
            },
            {
                heading: "",
                body: `In this demo we show a real-time, GenAI-powered support chatbot that is able to assist customers at any point in time and is context aware of the business’s policies as well as the user’s history.`,
            },
            {
                heading: "How to Demo this page",
                body: [
                    {
                        heading: "Click on the floating button at the bottom right corner to open the chatbot.",
                        body: []
                    },
                ]

            }
        ],
    },
    {
        heading: "Behind the Scenes",
        content: [
            {
                heading: "Architecture overview (Agentic RAG chatbot)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/chatbotDiagram.png",
                    alt: "Architecture",
                },
            },
            {
                heading: "Architecture overview (omnichannel)",
                body: "",
            },
            {
                image: {
                    src: "/rsc/diagrams/omnichannel.svg",
                    alt: "Architecture",
                },
            },
            {
                heading: '',
                body: 'Database modifications are recorded in the oplog as events. The change stream API monitors this log to identify specific changes that applications or triggers are set to observe. Once detected, a change event is created and sent to the appropriate listener, whether it’s an external application or a database trigger, allowing them to respond in real time and initiate actions as needed.'
            },
        ],
    },
    {
        heading: "Why MongoDB?",
        content: [
            {
                heading: "Vector embeddings and smart search",
                body: "The Dataworkz RAG builder enables anyone to build sophisticated retrieval mechanisms that turn words, phrases, or even customer behaviors into vector embeddings—essentially, numbers that capture their meaning in a way that’s easy for AI to understand—and store them in MongoDB Atlas. This makes it possible to search for content based on meaning rather than exact wording, so search results are more accurate and relevant.",
            },
            {
                heading: "Scalable, reliable performance",
                body: "MongoDB Atlas’s cloud-based, distributed setup is built to handle high-traffic retail environments, minimizing disruptions during peak shopping times."
            },
            {
                heading: "Deep context with Dataworkz’s agentic RAG as a service",
                body: "Retailers can build agentic workflows powered by RAG pipelines that combine lexical and semantic search with knowledge graphs to fetch the most relevant data from unstructured operational and analytical data sources before generating AI responses."
            }
        ],
    },
]