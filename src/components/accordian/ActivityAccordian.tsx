import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { List, useTheme } from 'react-native-paper';

const ActivityAccordian = () => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const themeProp = useTheme();
  const styles = makeStyles(themeProp);
  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <List.Accordion
      title="Controlled Accordion"
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}
      style={styles.accordion}
    >
      <View style={styles.accordionContent}>
        <Text>마케팅</Text>
        <Text>기획</Text>
        <Text>디자인</Text>
        <Text>마케팅</Text>
        <Text>기획</Text>
        <Text>디자인</Text>
        <Text>마케팅</Text>
        <Text>기획</Text>
        <Text>디자인</Text>
      </View>
    </List.Accordion>
  );
};

function makeStyles(theme: ReactNativePaper.Theme) {
  return StyleSheet.create({
    accordion: {
      backgroundColor: theme.colors.graphic.white,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      width: 350,
    },
    accordionContent: {
      backgroundColor: theme.colors.graphic.white,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 350,
      height: 200,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
    },
  });
}

export default ActivityAccordian;

// accordian-content: {
//    backgroundColor: theme.colors.graphic.black,
//    width: 340,
//    borderRadius: 12,
//    height: 100,
//  },
