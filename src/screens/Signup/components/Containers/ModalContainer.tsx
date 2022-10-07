/*
import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Modal from "react-native-modal";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ModalContainer = ({
  children,
  modalVisible,
  toggleModal,
  propagateSwipe = false,
}) => {
  const insets = useSafeAreaInsets();

  const styles = EStyleSheet.create({
    modalView: {
      backgroundColor: "white",
      flex: 1,
      borderRadius: "16rem",
      marginTop: insets.top,
    },
  });

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={toggleModal}
      swipeDirection={propagateSwipe ? undefined : "down"}
      onSwipeComplete={propagateSwipe ? undefined : toggleModal}
      propagateSwipe={propagateSwipe}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View style={styles.modalView}>{children}</View>
    </Modal>
  );
};

export default ModalContainer;

*/
