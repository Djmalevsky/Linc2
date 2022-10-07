import React from "react";
import { Container, ContentContainer, GradientButton, Header } from "./index";

const Screen = ({
  header,
  buttonTitle,
  callback,
  isDisabled,
  Content,
  usingKeyboardIOS,
}) => {
  return (
    <Container usingKeyboardIOS={usingKeyboardIOS}>
      <Header header={header} />
      <ContentContainer>
        <Content />
      </ContentContainer>
      <GradientButton
        buttonTitle={buttonTitle}
        callback={callback}
        isDisabled={isDisabled}
      />
    </Container>
  );
};

export default Screen;
