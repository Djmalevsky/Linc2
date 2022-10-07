import { functions } from "../../../../../config/firebaseConfig";
import { StoreData } from "../../../../../localStorage";

export default async () => {
  functions
    .httpsCallable("query")({
      filters: {
        radius: -1,
      },
    })
    .then((response) => {
      StoreData("profiles", JSON.stringify(response.data));
      console.log(response.data);
      return response.data;
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
};

/*
        const dist =
          response.data.results[currIndex].location === "0"
            ? "Less than 1"
            : response.data.results[currIndex].location;
        setDistance(dist);
        */
