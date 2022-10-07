import React, { useContext, useEffect, useState } from "react";
import GetData from "../../../../localStorage/GetData";
import { Context } from "../../../../context/authContext";
import {
  GradientButton,
  Header,
  Container,
  ContentContainer,
} from "../../components";

import InfoList from "./InfoList";
import useStatusBar from "../../../../hooks/useStatusBar";

const AgreementScreen = () => {
  useStatusBar("dark-content");
  const { createAccount } = useContext(Context);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    (async () => {
      const stringGender = await GetData("gender");
      const preferred_gender = 2;
      const name = await GetData("name");
      const bday = await GetData("bday");
      const stringSchoolYear = await GetData("schoolYear");
      const stringifiedPhotos = await GetData("photos");
      const stringifiedPassions = await GetData("passions");

      const photos = JSON.parse(stringifiedPhotos);
      const passions = JSON.parse(stringifiedPassions);
      const gender = parseInt(stringGender);
      const school_year = parseInt(stringSchoolYear);

      setUserData({
        // location added later
        gender,
        preferred_gender,
        name,
        bday,
        school_year,
        photos,
        passions,
      });
    })();
  }, []);

  return (
    <Container usingKeyboardIOS={false}>
      <Header header="Linc Responsibly" alt />
      <ContentContainer>
        <InfoList />
      </ContentContainer>
      <GradientButton
        callback={() => createAccount(userData)}
        isDisabled={false}
        buttonTitle="I agree"
      />
    </Container>
  );
};

export default AgreementScreen;
