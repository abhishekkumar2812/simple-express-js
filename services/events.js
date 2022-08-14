// const { events, sessions } = require("../config/mongo");
const { EventModel } = require("../mongoSchema/eventsV2.schema");

const getSearchEvents = async () => {
  let searched = [];
  const s = new Set();
  EventModel.find(
    { "actionData.action": "search_input" },
    "clientData.deviceId",
    (err, found) => {
      if (found) {
        for (let i = 0; i < found.length; i++) {
          searched.push(found[i].clientData.deviceId);
          s.add(found[i].clientData.deviceId);
        }
        console.log(searched.length);
        console.log(s.size);
        EventModel.find(
          {
            "clientData.deviceId": { $in: [...searched] },
            "actionData.action": "search_result_click",
          },
          (err, found) => {
            if (found) {
              console.log(found.length);
            }
          }
        );
      }
    }
  );

  console.log(searched);
};

module.exports = { getSearchEvents };
