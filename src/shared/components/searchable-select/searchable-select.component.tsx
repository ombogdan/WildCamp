import React, {useState, useEffect} from "react";
import {
  FlatList,
  Modal,
  Platform,
  TouchableOpacity,
  View,
  Text,
  KeyboardAvoidingView
} from "react-native";
import {SearchableSelectProps} from "components/searchable-select/searchable-select.types";
import {AppIcon} from "shared/assets";
import {Box} from "ui-kit/box";
import {hexToRGBA} from "utils/hexToRgba";
import {useTheme} from "theme/ThemeProvider";
import CustomInput from "ui-kit/custom-input/custom-input.component";
import {useTranslation} from "react-i18next";
import {useStyles} from "./searchable-select.styles";

const SearchableSelect = ({
                            modalVisible,
                            dataSource,
                            placeholder,
                            disablePicker,
                            changeAnimation,
                            close,
                            small,
                            selectedValue,
                            selectedColorLabel,
                            checkInput,
                            fontSize,
                            onCloseModal,
                            name,
                            onSelectValue,
                            disableSearch,
                            error,
                            addNewBrand,
                          }: SearchableSelectProps) => {
  const styles = useStyles({small, error});
  const {theme} = useTheme();
  const {t} = useTranslation();

  const [modalVisibleState, setModalVisibleState] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [dataSourceState, setDataSourceState] = useState(dataSource);
  const [showBrandInput, setShowBrandInput] = useState(false);
  const [brandName, setBrandName] = useState('');

  useEffect(() => {
    if (modalVisible !== undefined && modalVisible !== modalVisibleState) {
      setModalVisibleState(modalVisible);
    }
  }, [modalVisible]);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const _searchFilterFunction = (searchText: string, data: Array<{ text: string }>) => {
    if (searchText) {
      const newData = data.filter((item) => {
        const itemData = item.text.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.includes(textData);
      });
      // @ts-ignore
      setDataSourceState([...newData]);
      setSearchText(searchText);
    } else {
      setDataSourceState(dataSource);
      setSearchText(searchText);
    }
  };

  return (
    <View>
      <Text style={styles.selectName}>{name}</Text>
      <View style={styles.selectView}>
        <TouchableOpacity
          style={[styles.selectLabelTouchableOpacity, close && {width: "92%"}]}
          disabled={disablePicker}
          onPress={() => {
            setModalVisibleState(true);
            if (checkInput) {
              checkInput();
            }
          }}
          activeOpacity={0.7}>
          {selectedValue?.text ? (
            <Text
              numberOfLines={2}
              style={[
                styles.selectedLabelText,
                {
                  color: selectedColorLabel || (disablePicker ? "#A9A9A9" : "black"),
                  fontSize: fontSize || 16
                }
              ]}>
              {typeof selectedValue?.text === "string" ? selectedValue.text.trimStart() : selectedValue?.text}
            </Text>
          ) : (
            <Text style={styles.placeholderText}>{placeholder}</Text>
          )}
        </TouchableOpacity>
        <View style={styles.iconView}>
          <TouchableOpacity
            disabled={disablePicker}
            onPress={() => setModalVisibleState(true)}
            activeOpacity={1}>
            <AppIcon name="arrowDown" size={30}/>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        supportedOrientations={[
          "portrait",
          "portrait-upside-down",
          "landscape",
          "landscape-left",
          "landscape-right"
        ]}
        presentationStyle="overFullScreen"
        transparent
        visible={modalVisibleState}
        animationType={changeAnimation}
        onRequestClose={() => {
          setModalVisibleState(false);
          setSearchText("");
          if (onCloseModal) {
            onCloseModal();
          }
        }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalView}>
          <View style={styles.modalView1}>
            <Box alignItems="center" mb={6} pt={18}>
              <Text style={styles.modalName}>{name}</Text>
            </Box>
            {!disableSearch &&
              <Box alignItems="center" pl={16} pr={16} pb={8} style={styles.searchContainer}>
                <CustomInput
                  addProduct
                  blueFocus
                  leftIcon="search"
                  value={searchText}
                  placeholder={t('search')}
                  onChangeValue={(newValue) => {
                    _searchFilterFunction(newValue, dataSource);
                  }}/>
              </Box>
            }
            {addNewBrand && !showBrandInput &&
              <TouchableOpacity onPress={() => setShowBrandInput(true)}>
                <Box
                  mb={9}
                  mt={5}
                  pl={16}
                  pr={16}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  style={styles.addNewBrandContainer}>
                  <Text style={styles.addNewBrandText}>{t('addNewBrand')}</Text>
                  <AppIcon name="pencilEdit" color="blue"/>
                </Box>
              </TouchableOpacity>
            }
            {addNewBrand && showBrandInput &&
              <Box alignItems="center" pl={16} pr={16} pb={8} style={styles.searchContainer}>
                <CustomInput
                  addProduct
                  blueFocus
                  value={brandName}
                  placeholder={t('addYourBrand')}
                  onChangeValue={(newValue) => {
                    setBrandName(newValue);
                  }}/>
              </Box>
            }
            <TouchableOpacity
              style={styles.modalCloseButton}
              hitSlop={10}
              onPress={() => {
                setModalVisibleState(false);
                setSearchText("");
                if (onCloseModal) {
                  onCloseModal();
                }
              }}>
              <AppIcon name="cross" size={18}/>
            </TouchableOpacity>
            <View style={styles.separator}/>
            <FlatList
              keyboardShouldPersistTaps="always"
              keyExtractor={(item) => `${`${item.id}_${item.text}`}`}
              showsVerticalScrollIndicator
              initialNumToRender={20}
              onEndReachedThreshold={0.5}
              numColumns={1}
              data={searchText === "" ? dataSource : dataSourceState}
              renderItem={({item}) => {
                const existEl = (selectedValue?.id ?? null) === item.id;
                return (
                  <View
                    style={[
                      styles.itemPickerContainer,
                      existEl && {backgroundColor: hexToRGBA(theme.palette.blue, 0.1)},
                    ]}>
                    <TouchableOpacity
                      style={styles.touchableItemPickerView}
                      onPress={() => {
                        onSelectValue(item);
                        setModalVisibleState(false);
                        setSearchText("");
                        setShowBrandInput(false);
                        setBrandName('');
                        if (onCloseModal) {
                          onCloseModal();
                        }
                      }}>
                      <View style={styles.itemPickerView}>
                        <Text style={styles.pickerItemName}>{item?.text ?? ""}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.separator}/>
                  </View>
                );
              }}
            />
            {showBrandInput &&
              <TouchableOpacity
                style={styles.saveBrandContainer}
                onPress={() => {
                  if (brandName) {
                    onSelectValue({text: brandName, id: null}, true);
                    setModalVisibleState(false);
                    setSearchText("");
                    setShowBrandInput(false);
                    setBrandName('');
                    if (onCloseModal) {
                      onCloseModal();
                    }
                  }
                }}>
                <Text style={styles.saveBrand}>{t('saveBrand')}</Text>
              </TouchableOpacity>
            }
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default SearchableSelect;
