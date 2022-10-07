/* eslint-disable promise/no-nesting */
const functions = require("firebase-functions");
const axios = require("axios");
const admin = require("firebase-admin");

admin.initializeApp();
const elasticSearchConfig = functions.config().elasticsearch;
const elasticUrl = elasticSearchConfig.url + "/api/as/v1/engines/linc";
const auth = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${elasticSearchConfig.key}`,
  },
};

// unit "M" for miles, "K" for kilometers
// GeoDataSource formula
function distance(lat1, lon1, lat2, lon2, unit) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    return dist;
  }
}

const getFirestoreDoc = async (id, userLoc) => {
  const doc = await admin.firestore().collection("users").doc(id).get();

  firestoreDoc = doc.data();
  const userLocArray = userLoc.split(",");
  const lat1 = userLocArray[1];
  const lon1 = userLocArray[0];

  const resultLocArray = firestoreDoc.location.split(",");
  const lat2 = resultLocArray[1];
  const lon2 = resultLocArray[0];
  const dist = Math.round(distance(lat1, lon1, lat2, lon2, "M")).toString();

  // calculate distance and replace the location with it
  firestoreDoc.location = dist;
  return firestoreDoc;
};

const getSearchFilters = (doc, filters, uid, userLoc) => {
  let queryFilters = [];

  if (filters.radius !== -1) {
    queryFilters.push({
      location: {
        center: userLoc,
        distance: filters.radius,
        unit: "mi",
      },
    });
  }
  if (filters.gender) {
    queryFilters.push({ gender: filters.gender });
  }

  let passionArray = [];
  for (const i in filters.passions) {
    passionArray.push({
      passions: filters.passions[i].toString(),
    });
  }
  if (passionArray.length > 0) {
    queryFilters.push({
      all: passionArray,
    });
  }
  const queryData = {
    query: "",
    filters: {
      all: queryFilters,
      none: [{ id: uid }], // dont show user themselves
    },
  };
  return queryData;
};

exports.query = functions
  .region("us-east1")
  .https.onCall(async (data, context) => {
    const searchUrl = elasticUrl + "/search";
    //const searchTerm = data.searchTerm;
    const uid = context.auth.uid;

    const response = await admin
      .firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const filters = data.filters;
          const userLoc = doc.data().location;
          const queryData = getSearchFilters(doc, filters, uid, userLoc);
          return axios
            .post(searchUrl, queryData, auth)
            .then((res) => {
              const response = res.data;
              const elasticResults = response.results;
              let resultArray = [];

              for (const i in elasticResults) {
                const resultID = elasticResults[i].id.raw;
                const firestoreDoc = getFirestoreDoc(resultID, userLoc);
                resultArray.push(firestoreDoc);
              }
              const promise = Promise.all(resultArray)
                .then((vals) => {
                  const r = {
                    meta: response.meta,
                    results: vals,
                  };
                  return r;
                })
                .catch((e) => {
                  return e;
                });
              return promise;
            })
            .catch((error) => {
              return error;
            });
        } else {
          // no data in firebase
          return null;
        }
      })
      .catch((e) => {
        return null;
      });

    return response;
  });

exports.writeToElastic = functions
  .region("us-east1")
  .firestore.document("/users/{uid}")
  .onWrite((change, context) => {
    if (change.before.data() !== change.after.data()) {
      const data = change.after.data();
      const elasticData = {};
      if (data !== undefined) {
        if (data.gender !== undefined) {
          elasticData.gender = data.gender.toString();
        }
        if (data.preferred_gender !== undefined) {
          elasticData.preferred_gender = data.preferred_gender.toString();
        }
        if (data.bday !== undefined) {
          elasticData.bday = data.bday;
        }
        if (data.school_year !== undefined) {
          elasticData.school_year = data.school_year.toString();
        }
        if (data.passions !== undefined) {
          elasticData.passions = data.passions;
        }
        if (data.location !== undefined) {
          elasticData.location = data.location;
        }
        if (data.school !== undefined) {
          elasticData.school = data.school.toString();
        }
        if (data.major !== undefined) {
          elasticData.major = data.major.toString();
        }
      } else {
        return null;
      }
      const uid = context.params.uid;
      elasticData.id = uid;
      const documentUrl = elasticUrl + "/documents";

      return axios
        .post(documentUrl, elasticData, auth)
        .then((response) => {
          return;
        })
        .catch((error) => {
          return;
        });
    } else {
      return null;
    }
  });

exports.deleteCurrentUser = functions
  .region("us-east1")
  .https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const headers = auth.headers;
    const documentUrl = elasticUrl + "/documents";

    const deleteFirebaseAuth = admin.auth().deleteUser(uid);
    const deleteFirebaseData = admin
      .firestore()
      .collection("users")
      .doc(uid)
      .delete();
    const deleteElasticData = axios.delete(documentUrl, {
      data: [uid],
      headers: headers,
    });

    const promise = Promise.all([
      deleteFirebaseAuth,
      deleteFirebaseData,
      deleteElasticData,
    ]);

    try {
      const result = await promise;
      return;
    } catch (error) {
      return;
    }
  });

exports.cancelSignup = functions
  .region("us-east1")
  .https.onCall(async (data, context) => {
    const uid = context.auth.uid;
    const response = await admin
      .auth()
      .deleteUser(uid)
      .then((res) => {
        return res;
      })
      .catch((e) => {
        return e;
      });

    return response;
  });

// firebase functions:config:set elasticsearch.key="private-69k8gj3jq98jrv4z854t79wh" elasticsearch.url="https://linc.ent.us-east1.gcp.elastic-cloud.com"
