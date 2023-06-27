import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { SvgXml } from 'react-native-svg';
import person from '../../constants/Icons/Avatar/personXml';
import { useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getUserId } from '../../utils/hooks/asyncStorage/Login';
import { BlockedUser } from '../../types/block/block';
import TwoButtonModal from '../../components/modal/TwoButtonModal';
interface FollowListSectionProps {
  blockList: BlockedUser[];
  mutation: UseMutationResult<unknown, unknown, number, void>;
}

const BlockListSection = ({ blockList, mutation }: FollowListSectionProps) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const [isModal, setIsModal] = useState(false);
  const handleUnblockUser = (id: string | number) => {
    mutation.mutate(Number(id));
    setIsModal(false);
  };

  const handleGoToProfileOnImagePress = async (itemUserId: number) => {
    const localUserId = await getUserId();
    if (localUserId === String(itemUserId)) {
      navigation.navigate('MyProfile', { userId: localUserId, enteredByTab: false });
    } else {
      navigation.navigate('Profile', { userId: itemUserId });
    }
  };

  return (
    <ScrollView
      style={{
        padding: 10,
      }}
    >
      {blockList.map((item, idx) => {
        return (
          <View key={idx} style={styles.container}>
            <View style={styles.profile}>
              <>
                <Pressable onPress={() => handleGoToProfileOnImagePress(item.id)}>
                  {item?.imageURL ? (
                    <Image
                      source={{ uri: item?.imageURL }}
                      style={{ width: 50, height: 50, borderRadius: 100 }}
                    />
                  ) : (
                    <SvgXml xml={person} width={48} height={48} />
                  )}
                </Pressable>
                <View
                  style={{
                    marginLeft: 12,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                  }}
                >
                  <Text style={[theme.fonts.text.body1.bold]}>{item?.nickname}</Text>
                  <Text style={[theme.fonts.text.body2.regular, { color: '#12131480' }]}>
                    {item?.title || 'NO TITLE'}
                  </Text>
                </View>
              </>
            </View>
            <Pressable onPress={() => setIsModal(true)} style={styles.button}>
              <Text
                style={[
                  theme.fonts.text.body2.bold,
                  {
                    color: '#121314',
                  },
                ]}
              >
                차단 해제
              </Text>
            </Pressable>
            <TwoButtonModal
              dismissable={true}
              visible={isModal}
              onDismiss={() => setIsModal(false)}
              mainTitle="차단을 해제할까요?"
              leftButtonText="취소"
              rightButtonText="해제하기"
              leftButtonPress={() => setIsModal(false)}
              rightButtonPress={() => handleUnblockUser(item.id)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};

export default BlockListSection;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 24,
    backgroundColor: '#B0E817',
    zIndex: 0,
    width: 76,
    height: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
