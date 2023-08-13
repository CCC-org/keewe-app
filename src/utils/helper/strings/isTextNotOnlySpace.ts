const isTextNotOnlySpace = (insightText: string): boolean => {
  return insightText.trim().length > 0;
};

export default isTextNotOnlySpace;
