import { NextResponse } from "next/server";
import { ROLE } from "@/lib/constants";

const service = process.env.SERVICE
const systemId = process.env.SYSTEM_ID
const llmId = process.env.LLM_ID
const token = process.env.TOKEN
// agentSpec.tools[0].implConfig.data will be replaced with the user's orders
const agentSpec = {
    agentSpec: {
    "persona": "You are a helpful assistant for Leafy Corp (an ecommerce store) and help Leafy Corp users with their questions.",
    "scenarioSelectionFailureMessage": "I could not follow what you meant. Please rephrase and try. If you would like to know what I can do - please ask \"What can you do?\"",
    "scenarios": [
        {
            "name": "qna",
            "description": "Query for information on policies such as shipping policies, cancellation, refunds",
            "examples": [
                "What is the returns process?",
                "Do you ship internationally?"
            ],
            "toolRefs": [
                {
                    "name": "GetPolicies",
                    "toolId": "ee4e69c0-076d-4f96-93ab-c0acb241e2a3",
                    "properties": {}
                }

            ]

        },
        {
            "name": "order",
            "description": "Operate on a single order - such as getting its details, tracking info, cancel or return it",
            "instructions": "Do not ask the user for their customer id.",
            "examples": [],
            "toolRefs": [
                {
                    "name": "GetPolicies",
                    "toolId": "ee4e69c0-076d-4f96-93ab-c0acb241e2a3",
                    "properties": {}
                },
                {
                    "name": "GetOrder",
                    "toolId": "json_mongo_demo_order",
                    "properties": {}
                }

            ]
        },
        {
            "name": "greetings",
            "description": "When the user greets us with a welcome message",
            "persona": "Cheerful, helpful assistant AI Customer Support Assistant speaking on behalf of Leafy Corp (An ECommerce portal).",
            "instructions": "Please respond with a cheery welcome message. The customer id should not be mentioned to the user.",
            "examples": [],
            "toolRefs": []
        },
        {
            "name": "goodbye",
            "description": "When the user indicates that their question is resolved or they say bye or give some other indication that the conversation on that topic is over or they want to start a new conversation or ask a new question",
            "instructions": "Always Generate ###CLOSE### in your response.",
            "examples": [
                "I have another question",
                "I want to ask you something else",
                "Can you also help me with this",
                "Thanks",
                "Bye",
                "I am all set",
                "OK"
            ],
            "toolRefs": []
        },
        {
            "name": "about",
            "description": "When the user asks a question about the assistant",
            "instructions": "Please use this information about yourself to respond - Customer Support AI Assistant that can help with listing orders, tracking individual orders and answer questions on store policies.",
            "examples": [
                "What can I ask about?",
                "What can you do?",
                "How can you help me?"
            ],
            "toolRefs": []
        }
    ],
    "tools": [
        {
            "toolId": "json_mongo_demo_order",
            "typeId": "json",
            "description": "Use this tool to get details of the order we are operating on. Usually this will be the first step so we have the correct order context. If we cannot retrieve the order then we must ask the user for the order id.",
            "examples": [
            ],
            "parameters": {
                // "user_id": {
                //     "type": {
                //         "name": "string"
                //     },
                //     "description": "The id of the user who is talking to us. This will be provided from the context. Do not ask the user for this."
                // },
                "order_query": {
                    "type": { "name": "string" },
                    "description": "query string to help identify which order the user is interested in"
                }
            },
            "returnType": {
                "name": "Order",
                "description": "An object that represents an order in the system",
                "fields": {
                    "id": {
                        "name": "string",
                        "description": "the id of the order"
                    },
                    "user": {
                        "name": "string",
                        "description": "the id of the user or customer that placed this order"
                    },
                    "shipping_address": {
                        "name": "string",
                        "description": "the address to where the products are being shipped - could be the users's preferred address or a store"
                    },
                    "status": {
                        "name": "enum",
                        "description": "the status of the order - values are from [InProcess,Cancelled,Delivered,Ready for pickup,Customer In Store,Ready For Delivery,Picked up from warehouse]"
                    },
                    "status_date": {
                        "name": "string",
                        "description": "the date at which the status of the order was last updated - in DD-MMM-YYYY format"
                    },
                    "products": {
                        "name": "Product[]",
                        "description": "a list of products that are part of this order",
                        "fields": {
                            "id": {
                                "name": "string",
                                "description": "the id of this product"
                            },
                            "amount": {
                                "name": "integer",
                                "description": "the number of items of this product that are in the order"
                            },
                            "name": {
                                "name": "string",
                                "description": "the name of this product"
                            },
                            "code": {
                                "name": "string",
                                "description": "the code or sku of this product"
                            },
                            "price": {
                                "name": "string",
                                "description": "The price of this product e.g. $20, $33.2"
                            }
                        }
                    },
                    "type": {
                        "name": "enum",
                        "description": "The type of order - one of [Ship to Home,Buy Online Pickup in Store]"
                    }
                }
            },
            "implConfig": {
                "data": [],
                "dataType": {
                    "name": "Order",
                    "description": "An object that represents an order in the system",
                    "fields": {
                        "id": {
                            "name": "string",
                            "description": "the id of the order"
                        },
                        "user": {
                            "name": "string",
                            "description": "the id of the user or customer that placed this order"
                        },
                        "shipping_address": {
                            "name": "string",
                            "description": "the address to where the products are being shipped - could be the users's preferred address or a store"
                        },
                        "status": {
                            "name": "enum",
                            "description": "the status of the order - values are from [InProcess,Cancelled,Delivered,Ready for pickup,Customer In Store,Ready For Delivery,Picked up from warehouse]"
                        },
                        "status_date": {
                            "name": "string",
                            "description": "the date at which the status of the order was last updated - in DD-MMM-YYYY format"
                        },
                        "products": {
                            "name": "Product[]",
                            "description": "a list of products that are part of this order",
                            "fields": {
                                "id": {
                                    "name": "string",
                                    "description": "the id of this product"
                                },
                                "amount": {
                                    "name": "integer",
                                    "description": "the number of items of this product that are in the order"
                                },
                                "name": {
                                    "name": "string",
                                    "description": "the name of this product"
                                },
                                "code": {
                                    "name": "string",
                                    "description": "the code or sku of this product"
                                },
                                "price": {
                                    "name": "string",
                                    "description": "The price of this product e.g. $20, $33.2"
                                }
                            }
                        },
                        "type": {
                            "name": "enum",
                            "description": "The type of order - one of [Ship to Home,Buy Online Pickup in Store]"
                        }
                    }
                }
            }
        }
    ]
}
}

export async function POST(request) {
    const { userId, userText, messages, ordersMinimizedSchema } = await request.json();
    const urlTemplate = service + "/api/qna/v1/systems/" + systemId + "/call-agent?llmProviderId=" + llmId + "&userText=";
    agentSpec.agentSpec.tools[0].implConfig.data = [...ordersMinimizedSchema];
    let json_data = agentSpec;
    let string_dialogue = [];

    messages.map(message => {
        string_dialogue.push({ by: message.role, text: message.content })
    })
    string_dialogue.push({ by: ROLE.user, text: userText })
    // console.log('--', agentSpec.agentSpec.tools[0].implConfig.data)
    // console.log('--', string_dialogue)
    json_data["conversationHistory"] = string_dialogue;
    console.log(`-- fetch api: ${urlTemplate}${userText}`)
    const response = await fetch(`${urlTemplate}${userText}`, {
        method: "POST",
        headers: {
            "Authorization": "SSWS " + token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(json_data)
    });
    console.log('-- response', response)
    let output = "I am sorry but I was unable to get a response.";
    let resJson = await response.json();

    if (response.ok) { // response.ok is true if the status code is in the 200-299 range
        output = resJson.answer || output;
    }
    console.log('-- resJson: ', resJson);
    return NextResponse.json({ message: output || null, resJson }, { status: 200 });
}
