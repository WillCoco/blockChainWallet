import React from 'react';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';
import {Button} from 'react-native-elements';
import {H1, H2, H3, H4, PrimaryText} from 'react-native-normalization-text';
import {useNavigation} from 'react-navigation-hooks';
import colors from '../../helpers/colors';
import i18n from '../../helpers/i18n';

export default () => {
  const {navigate, goBack} = useNavigation();
  const complete = () => {
    // 校验
    const pass = true;
    if (pass) {
      goBack('CREATE_WALLET');
    } else {
      // 提示
    }
  };

  return (
    <>
      <Text>助记词确认顺序</Text>
      <View>
        {
          ['123', '333'].map(word => {

            return (
              <PrimaryText>{word}</PrimaryText>
            );
          })
        }
      </View>
      <View>
        {
         ['123', '333'].map(word => {

           return (
             <PrimaryText>{word}</PrimaryText>
           );
         })
        }
      </View>
      <Button
        iconRight
        containerStyle={styles.btnContainerStyle}
        title={i18n.t('complete')}
        onPress={complete}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.theme,
    height: '24%',
  },
});
