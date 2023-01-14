import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'react-native-paper';

interface ProfileListProps {
  title: string;
  content: string;
  contentColor?: string;
  height?: number;
  handlePress: () => void;
}

const ProfileList = ({ title, content, contentColor, height, handlePress }: ProfileListProps) => {
  const theme = useTheme();
  return (
    <View style={{ padding: 16, flexDirection: 'row' }}>
      <View style={{ flex: 8, height: height ?? undefined }}>
        <Text style={theme.fonts.text.body1.regular}>{title}</Text>
      </View>
      <View style={{ flex: 11 }}>
        <Pressable onPress={handlePress}>
          <View>
            <Text
              style={{
                ...theme.fonts.text.body1.bold,
                color: contentColor ?? theme.colors.brand.onprimary.container,
              }}
            >
              {content}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileList;
