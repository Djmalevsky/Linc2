import * as React from "react";
import { View } from "react-native";
import Bullet from "./Bullet";

const InfoList = () => {
  return (
    <View>
      <Bullet icon="user" header="Do You" subHeader="Use your own identity" />
      <Bullet
        icon="link"
        header="Be Respectful"
        subHeader="Have regard for your peers"
      />
      <Bullet
        icon="message-circle"
        header="Practice Safe Interactions"
        subHeader="Meet up safely and do not release private info too soon"
      />
      <Bullet
        icon="shield"
        header="Keep Linc Safe"
        subHeader="Report inappropriate behavior"
      />
      <Bullet
        icon="umbrella"
        header="We're Watching Out for You"
        subHeader=""
      />
    </View>
  );
};

export default InfoList;
