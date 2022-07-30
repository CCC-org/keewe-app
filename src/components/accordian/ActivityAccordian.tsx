import { View, StyleSheet } from 'react-native';
import React, { Fragment, useState } from 'react';
import { List, useTheme } from 'react-native-paper';
import AccordianTagButton from '../buttons/AccordianTagButton';
import {
  ActivityGroupInterface,
  ActivityTagInterface,
} from '../../constants/ActivitySelection/tags';

interface ActivityAccordianProps {
  activities: ActivityGroupInterface;
  title: string;
  genre: string;
}

const ActivityAccordian = ({ activities, title, genre }: ActivityAccordianProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const themeProp = useTheme();
  const styles = makeStyles(themeProp);
  const handlePress = () => {
    setExpanded(!expanded);
  };
  return (
    <List.Accordion
      title={title}
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}
      style={styles.accordion}
    >
      <View style={styles.accordionContent}>
        {activities[genre].groupTags.map((tag: ActivityTagInterface) => {
          return (
            <Fragment key={tag.id}>
              <AccordianTagButton genre={genre}></AccordianTagButton>
            </Fragment>
          );
        })}
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
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 350,
      minHeight: 64,
      maxHeight: 256,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      paddingLeft: 12,
      flexWrap: 'wrap',
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
