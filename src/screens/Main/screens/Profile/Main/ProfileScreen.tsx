import React from "react";
import { Container } from "../../../components";
import { HeaderCard } from "../../Search/components";
import Top from "./old/Top";

const ProfileScreen = ({ navigation }) => {
  return (
    <Container>
      <HeaderCard
        name="David"
        isVerified={false}
        renderScrolling={false}
        distance={undefined}
      />
      <Top navigation={navigation} />
    </Container>
  );
};

export default ProfileScreen;
