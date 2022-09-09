import { View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { IconXml } from '../../constants/InterestsIconXml';

const a = 0;

const NicknameCreationScreen = () => {
  return (
    <View>
      <SvgXml xml={IconXml[a]} />
      <SvgXml xml={IconXml[1]} />
      <SvgXml xml={IconXml[2]} />
      <SvgXml xml={IconXml[3]} />
      <SvgXml xml={IconXml[4]} />
      <SvgXml xml={IconXml[5]} />
      <SvgXml xml={IconXml[6]} />
      <SvgXml xml={IconXml[7]} />
      <SvgXml xml={IconXml[8]} />
      <SvgXml xml={IconXml[9]} />
      <SvgXml xml={IconXml[10]} />
      <SvgXml xml={IconXml[11]} />
      <SvgXml xml={IconXml[12]} />
      <SvgXml xml={IconXml[13]} />
      <SvgXml xml={IconXml[14]} />
      <SvgXml xml={IconXml[15]} />
      <SvgXml xml={IconXml[16]} />
      <SvgXml xml={IconXml[17]} />
      <SvgXml xml={IconXml[18]} />
      <SvgXml xml={IconXml[19]} />
      <SvgXml xml={IconXml[20]} />
    </View>
  );
};

export default NicknameCreationScreen;
/*const title = ['마케팅', "가상"]
const icons = [<마케팅/>, <가상/>]

import IconComponents

title.map(e, idx=> {
  return (
    View
      <TagsWithIconComponent title={e.title} iconComponent={IconComponents[idx]}/>
    View
  )
})*/
// 동적으로 아이콘을 띄우는 방법은 성능상의 저하가 체감이된다니까, 이것밖에 없음.

/*
{InterestWithIcon.map((e, idx) => {
  return (
    <View key={idx}>
      <SvgFromXml width={'100%'} height={'100%'} xml={e.icon} />
    </View>
  );
})}*/
