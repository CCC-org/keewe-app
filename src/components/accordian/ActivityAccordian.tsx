import { View, StyleSheet } from 'react-native';
import React, { Fragment, useState } from 'react';
import { List, useTheme } from 'react-native-paper';
import AccordianTagButton from '../buttons/AccordianTagButton';
import { ActivityTagInterface } from '../../constants/ActivitySelection/tags';
import { RootState, useAppSelector } from '../../redux/store';

interface ActivityAccordianProps {
  title: string;
  genre: string;
}

const ActivityAccordian = (props: ActivityAccordianProps) => {
  const { title, genre } = props;
  const [expanded, setExpanded] = useState<boolean>(false);

  const themeProp = useTheme();
  const styles = makeStyles(themeProp);
  const handlePress = () => {
    setExpanded(!expanded);
  };

  const activityTagGroups = useAppSelector((state: RootState) => {
    return state.activity[genre];
  });

  return (
    <List.Accordion
      title={title}
      left={(props) => <List.Icon {...props} icon="folder" />}
      expanded={expanded}
      onPress={handlePress}
      style={styles.accordion}
    >
      <View style={styles.accordionContent}>
        {activityTagGroups.groupTags.map((tag: ActivityTagInterface) => {
          return (
            <Fragment key={tag.id}>
              <AccordianTagButton
                genre={genre}
                isChecked={tag.isChecked}
                tagName={tag.name}
                themeColor={activityTagGroups.groupColor}
                tagId={tag.id}
              ></AccordianTagButton>
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
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      width: 320,
      maxWidth: 340,
      marginTop: 12,
    },
    accordionContent: {
      backgroundColor: theme.colors.graphic.white,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: 320,
      minHeight: 64,
      maxHeight: 240,
      borderBottomRightRadius: 12,
      borderBottomLeftRadius: 12,
      paddingLeft: 12,
      flexWrap: 'wrap',
      marginBottom: 12,
    },
  });
}

export default ActivityAccordian;
