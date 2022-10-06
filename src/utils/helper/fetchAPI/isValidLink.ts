import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import axios from 'axios';

const handleSheetLinkComplete = async (
  linkText: string,
  linkSheetRef: React.RefObject<BottomSheetModalMethods>,
  setIsValidSite: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const URL = linkText.includes('http') ? linkText : `http://${linkText}`;
    const response = await axios.get(URL);
    if (response.status === 200) {
      setIsValidSite(true);
      linkSheetRef.current?.close();
    }
  } catch (error) {
    alert(error);
    setIsValidSite(false);
  }
};

export default handleSheetLinkComplete;
