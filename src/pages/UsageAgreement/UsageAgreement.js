/**
 * @author: Xu Ke
 * @date: 2020/1/8 11:59 AM
 * @Description: 使用协议
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryText, H3} from 'react-native-normalization-text';
import agreement from './agreement';
import {vh, vw, metrics} from '../../helpers/metric';

export default () => {
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.contentWrapper}>
        {agreement.map((item, index) => {
          return (
            <View key={`item_${index}`}>
              {item.titlePrimary && (
                <H3 style={styles.title}>{item.titlePrimary}</H3>
              )}
              {item.title && (
                <PrimaryText color="title" style={styles.titleP}>
                  {item.title}
                </PrimaryText>
              )}
              {item.content &&
                item.content.map((p, index) => (
                  <PrimaryText color="secondary" key={`p_${index}`}>
                    &emsp;&emsp;{p}
                  </PrimaryText>
                ))}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: metrics.spaceN,
    paddingTop: metrics.spaceN,
    paddingBottom: metrics.spaceL,
  },
  title: {
    textAlign: 'center',
    marginBottom: metrics.spaceS,
  },
  titleP: {
    marginTop: metrics.spaceS,
  },
});
