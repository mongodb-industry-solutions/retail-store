exports = async function (changeEvent) {
  // Access the _id of the changed document:
  const docId = changeEvent.documentKey._id;
  const serviceName = "IST-Shared";
  const database = "leafy_popup_store";
  const collection = context.services.get(serviceName).db(database).collection(changeEvent.ns.coll);
  const MILLSECONDS_BETWEEN_STATUS_CHANGE = 10000 // 10 seconds between each status update
  const bopis = "BUYONLINE,PICKUPINSTORE"
  const home = "BUYONLINE,GETDELIVERYATHOME"
  try {
      const fullDocument = changeEvent.fullDocument;
      const type = fullDocument.type.toUpperCase().replace(/\s+/g, '')
      if (changeEvent.operationType === "insert") {
          let states = [];

          if (type === bopis) {
              states = ['Ready for pickup'];
          } else if (type === home) {
              states = ['Ready for delivered', 'Picked up from warehouse', 'In Transit', 'Delivered'];
          }

          let index = 0;

          const updateStatusHistory = async () => {
              if (index < states.length) {
                  const state = states[index];
                  const currentDateAsDouble = Number(Date.now());
                  await collection.updateOne(
                      { _id: docId },
                      { $push: { 
                              status_history: { 
                                  status: state, 
                                  timestamp: currentDateAsDouble 
                              } 
                          } 
                      }
                  );
                  index++;
                  setTimeout(updateStatusHistory, MILLSECONDS_BETWEEN_STATUS_CHANGE); // Schedule the next update in 10 seconds
              }
          };
          // Start the update process after the initial delay
          setTimeout(updateStatusHistory, MILLSECONDS_BETWEEN_STATUS_CHANGE);
      }
      else if (changeEvent.operationType === "update") {
          // validate if the updated field is the sttaus history 
          // the '.2' refers to the 3th index in the array of status which stands for the status 'Customer is in the store'
          if (type == bopis && changeEvent.updateDescription.updatedFields.hasOwnProperty("status_history.2")) {
              //customer is in the store
              const handOrderToCustomerInStore = async () => {
                  const currentDateAsDouble = Number(Date.now());
                  let response = await collection.updateOne(
                      { _id: docId },
                      { $push: { 
                              status_history: { 
                                  status: 'Completed', 
                                  timestamp: currentDateAsDouble 
                              } 
                          }
                      }
                  );
                  console.log(JSON.stringify(response))
              };
              // Start the update process after the initial delay
              setTimeout(handOrderToCustomerInStore, MILLSECONDS_BETWEEN_STATUS_CHANGE);
          }
      }
  } catch (err) {
      console.log("error performing mongodb write: ", err.message);
  }
};
