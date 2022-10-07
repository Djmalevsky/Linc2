import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchableDropdown from "react-native-searchable-dropdown";
import majors from "./majors";

const MajorSelect = () => {
  const [major, setMajor] = useState();
  const [valid, setValid] = useState(false);

  return (
    <SafeAreaView>
      <SearchableDropdown
        onItemSelect={(item) => {
          setMajor(item.name);
          setValid(true);
        }}
        onChangeText={(text) => {
          setMajor(text);
          setValid(false);
        }}
        containerStyle={{ padding: 5 }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: "#ddd",
          borderColor: "#bbb",
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{ color: "#222" }}
        //itemsContainerStyle={{ maxHeight: 400 }}
        items={majors}
        //defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: "placeholder",
          value: valid ? major : null,
          underlineColorAndroid: "transparent",
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
          },
          autoFocus: true,
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
    </SafeAreaView>
  );
};

export default MajorSelect;
