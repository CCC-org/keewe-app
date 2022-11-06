import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinkPreview, LinkPreviewProps } from '@flyerhq/react-native-link-preview';
interface customProps extends LinkPreviewProps {
  width?: number | string;
}
const FeedLinkCard = ({ text }: customProps) => {
  return <LinkPreview text={text} />;
};

export default FeedLinkCard;

const styles = StyleSheet.create({});
