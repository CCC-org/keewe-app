import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';
import { INTEREST_ICONS } from '../profile/constant';
import { SvgXml } from 'react-native-svg';

interface HeaderTextProps {
  header?: string;
  subTitle?: string;
  interest?: string;
}
const HeaderText = ({ header, subTitle, interest }: HeaderTextProps) => {
  const theme = useTheme();
  const styles = createStyles(theme);
  if (subTitle === '') {
    subTitle = undefined;
  }
  return (
    <View>
      <View style={styles.mainTitle}>
        <Text style={styles.header}>{header}</Text>
        {interest && (
          <View
            style={{
              ...styles.profile,
              backgroundColor: theme.colors.brand.surface.container1,
            }}
          >
            <SvgXml xml={INTEREST_ICONS[interest ?? ''] ?? INTEREST_ICONS['기본']} />
          </View>
        )}
      </View>
      {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
    </View>
  );
};

export default HeaderText;

function createStyles(theme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      width: '100%',
      marginTop: 4,
      fontSize: 26,
      fontWeight: '600',
      textAlign: 'left',
    },
    mainTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    subTitle: {
      width: '80%',
      marginTop: 8,
      marginHorizontal: 2,
      fontSize: 14,
      lineHeight: 20,
      textAlign: 'left',
      color: '#121314',
      opacity: 0.6,
    },
    profile: {
      height: 40,
      width: 40,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
}
