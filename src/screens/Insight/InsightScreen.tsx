import React from 'react';
import Profile from '../../components/profile/Profile';

const InsightScreen = ({ navigation, route }) => {
  return (
    <Profile
      nickname="nickname"
      title="title"
      self={false}
      follow={true}
      interests={[
        {
          name: 'interest',
        },
        {
          name: 'interest',
        },
        {
          name: 'interest',
        },
        {
          name: 'interest',
        },
        {
          name: 'interest',
        },
        {
          name: 'interest',
        },
      ]}
      createdAt="createdAt"
    />
  );
};

export default InsightScreen;
