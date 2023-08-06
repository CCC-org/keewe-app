import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { SvgXml } from 'react-native-svg';
import darkChevronRightXml from '../../../constants/Icons/Chevrons/darkChevronRightXml';
import theme from '../../../theme/light';
import { navigate } from '../../../utils/hooks/navigaton/navigator';

interface ChallengeEditOptionProps {
  option: string;
  value?: string;
  placeholder?: string;
  navigateTo?: string;
  params?: any;
}

const ChallengeEditOption = ({
  option,
  value,
  placeholder,
  navigateTo,
  params,
}: ChallengeEditOptionProps) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={theme.fonts.text.body1.regular}>{option}</Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <Text
            style={{
              ...theme.fonts.text.body1.regular,
              color: value
                ? theme.colors.brand.onprimary.container
                : `${theme.colors.graphic.black}4d`,
            }}
          >
            {value ? value : placeholder}
          </Text>
          {navigateTo && (
            <Pressable
              onPress={() => navigate(navigateTo, { ...params })}
              style={{ paddingLeft: 16 }}
            >
              <SvgXml xml={darkChevronRightXml} />
            </Pressable>
          )}
        </View>
      </View>
    </>
  );
};

export default ChallengeEditOption;

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
});
