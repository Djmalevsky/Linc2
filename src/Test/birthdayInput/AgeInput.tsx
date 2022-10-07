//    "postinstall": "node ./node_modules/react-native-confirmation-code-field/path-rn-62.js"

import React, { useState, Fragment } from "react";
import { SafeAreaView, Text, View } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import styles from "./styles";

const CELL_COUNT = 8;

const FormattingExample = () => {
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <SafeAreaView style={styles.root}>
      <CodeField
        autoFocus
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }) => {
          let placeholder;
          {
            if (index < 2) {
              placeholder = "M";
            } else if (index < 4) {
              placeholder = "D";
            } else {
              placeholder = "Y";
            }
          }
          return (
            <Fragment key={index}>
              <Text
                key={`value-${index}`}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol ||
                  (isFocused ? (
                    <Cursor />
                  ) : (
                    <Text style={{ color: "#AAA" }}>{placeholder}</Text>
                  ))}
              </Text>
              {index === 1 || index === 3 ? (
                <View style={{ justifyContent: "center" }}>
                  <Text>/</Text>
                </View>
              ) : null}
            </Fragment>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FormattingExample;
