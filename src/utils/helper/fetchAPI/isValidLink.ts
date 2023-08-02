import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import axios from 'axios';

const handleSheetLinkComplete = async (
  linkText: string,
  setLinkText: React.Dispatch<React.SetStateAction<string>>,
  linkSheetRef: React.RefObject<BottomSheetModalMethods>,
  setIsValidSite: React.Dispatch<React.SetStateAction<boolean>>,
  isError: () => void,
) => {
  try {
    // Check if the URL is valid with or without a protocol
    const isValidURL = validateURL(linkText) || validateURL(`http://${linkText}`);
    if (!isValidURL) {
      throw new Error('Invalid URL format');
    }

    // If the URL doesn't already have a protocol, add it
    const URL =
      linkText.includes('http://') || linkText.includes('https://')
        ? linkText
        : `http://${linkText}`;
    const response = await axios.get(URL);
    const finalUrl = response.request.responseURL || null;
    if (finalUrl) {
      setLinkText(finalUrl);
    }

    if (response.status === 200) {
      setIsValidSite(true);
      linkSheetRef.current?.close();
    } else {
      setIsValidSite(false);
      throw new Error('Invalid link');
    }
  } catch (error) {
    linkSheetRef.current?.close();
    isError();
  }
};
function validateURL(textval: string) {
  const urlregex = new RegExp(
    '^(http://|https://)?[a-z0-9]+([-.]{1}[a-z0-9]+)*.[a-z]{2,5}(:[0-9]{1,5})?(/.*)?$',
  );
  return urlregex.test(textval);
}
export default handleSheetLinkComplete;
