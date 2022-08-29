import React, { useState } from 'react';
import TextInputDetail from '../../components/texts/TextInputDetail';

const CategoryCreateScreen = ({ navigation, route }) => {
  const customCategory: string[] = route.param?.category ?? [];

  const [input, setInput] = useState<string>('');

  return (
    <>
      <TextInputDetail
        setInputValue={setInput}
        infoText="관심사"
        inputValue={input}
        label=""
        placeholder="관심사를 입력하세요"
        letterLimit={25}
      />
    </>
  );
};

export default CategoryCreateScreen;
