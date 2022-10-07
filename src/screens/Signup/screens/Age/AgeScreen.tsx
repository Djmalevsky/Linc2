import React, { useState, Fragment } from "react";
import { View, Text } from "react-native";
import {
  CodeField,
  useClearByFocusCell,
  Cursor,
} from "react-native-confirmation-code-field";
import {
  GradientButton,
  Header,
  Container,
  ContentContainer,
} from "../../components";
import styles from "./styles";
import isValidDate from "./functions/isValidDate";
import StoreData from "../../../../localStorage/StoreData";

const CELL_COUNT = 8;

const AgeScreen = ({ navigation }) => {
  const [value, setValue] = useState("");
  const [currIndex, setCurrIndex] = useState(0);
  const [valid, setValid] = useState(false);
  const [invalidIndex, setInvalidIndex] = useState(-1);
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const onContinuePress = async () => {
    const formattedValue =
      value.substr(4, 4) + "-" + value.substr(0, 2) + "-" + value.substr(2, 2);
    await StoreData("bday", formattedValue);
    navigation.navigate("Gender");
  };

  const onChangeText = (text: string) => {
    if (invalidIndex > -1 && text.length > currIndex) {
      return;
    } else if (invalidIndex > -1 && text.length < currIndex) {
      setInvalidIndex(-1);
    }
    setValue(text);
    setCurrIndex(text.length);
    const indexErr = isValidDate(text);
    if (indexErr > -1) {
      setInvalidIndex(indexErr);
    }
    if (text.length >= 8) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const AgeInput = () => {
    return (
      <View>
        <CodeField
          caretHidden={true}
          autoFocus
          {...props}
          value={value}
          onChangeText={onChangeText}
          cellCount={CELL_COUNT}
          keyboardType="number-pad"
          textContentType="none"
          autoCompleteType="off"
          renderCell={({ index, symbol, isFocused }) => {
            const isError = index === invalidIndex;
            const isPast = currIndex > index;
            const active = isFocused || isPast;
            let placeholder;
            if (index < 2) {
              placeholder = "M";
            } else if (index < 4) {
              placeholder = "D";
            } else {
              placeholder = "Y";
            }

            return (
              <Fragment key={index}>
                <View
                  style={[
                    styles.cell,
                    active ? styles.activeBorder : styles.inactiveBorder,
                    isError && styles.invalidBorder,
                  ]}
                >
                  <Text
                    style={[
                      styles.placeholderText,
                      active ? styles.active : styles.inactive,
                      isError && styles.invalid,
                      { textAlign: "center" },
                    ]}
                    key={`value-${index}`}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol ||
                      (isFocused ? <Cursor /> : <Text>{placeholder}</Text>)}
                  </Text>
                </View>
                {index === 1 || index === 3 ? (
                  <View
                    key={`separator-${index}`}
                    style={[
                      styles.separator,
                      isPast ? styles.activeBorder : styles.inactiveBorder,
                    ]}
                  />
                ) : null}
              </Fragment>
            );
          }}
        />
      </View>
    );
  };

  return (
    <Container usingKeyboardIOS>
      <Header header="My birthday is" />
      <ContentContainer>
        <AgeInput />
      </ContentContainer>
      <GradientButton
        callback={onContinuePress}
        isDisabled={!valid || invalidIndex > -1}
        buttonTitle="Continue"
      />
    </Container>
  );
};

export default AgeScreen;
