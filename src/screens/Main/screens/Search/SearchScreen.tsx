import React, { useState, useEffect, useContext } from "react";
import GetData from "../../../../localStorage/GetData";
import LocDeniedScreen from "../../../Signup/screens/Location/LocDeniedScreen";
import { Context, getUserLoc } from "../../../../context/authContext";
import { Container, ContentContainer } from "../../components";
import EStyleSheet from "react-native-extended-stylesheet";
import { HeaderCard } from "./components";

const SearchScreen = () => {
  const { state } = useContext(Context);
  const initialData = state.profiles;

  const [filters, setFilters] = useState("");
  const [location, setLocation] = useState(false);
  const [data, setData] = useState(initialData);
  const [currIndex, setCurrIndex] = useState(0);
  //const isVerified = data.results[currIndex].school !== undefined;
  const isVerified = true;
  const offset = isVerified ? 95 : 43;

  const headerCardStyle = EStyleSheet.create({
    card: {
      minHeight: offset * EStyleSheet.value("$height"),
      width: "100%",
      marginBottom: "22rem",
    },
  });

  // maybe change when location updates?
  useEffect(() => {
    (async () => {
      const location = await getUserLoc();
      if (location !== null) {
        setLocation(true);
      }
      let searchFilters = await GetData("filters");
      if (searchFilters !== null) {
        searchFilters = JSON.parse(searchFilters);
        setFilters(searchFilters);
      } else {
        setFilters("");
      }
    })();
  }, []);
  // location permission turned off
  if (!location) {
    return <LocDeniedScreen />;
  }

  // maybe disable swiping on part above header (so users dont misswipe)?
  /*
  let curr;
  if (data) {
    console.log(data);
    curr = data.results[currIndex];
  } else {
    // no profiles available
    return <LocDeniedScreen />;
  }
  */

  return (
    <Container>
      <HeaderCard
        name="David"
        isVerified={true}
        distance="Less than 1"
        renderScrolling={true}
      />
      <ContentContainer></ContentContainer>
    </Container>
  );
};

export default SearchScreen;

/*
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.raw}
        renderItem={({ item }) => (
          <View>
            <Text>{item.location.raw}</Text>
          </View>
        )}
      />
      */
