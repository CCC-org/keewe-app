export default function removeEscapeSequences(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  // Matches escape sequences like \n, \t, \r, etc.
  const escapeSequenceRegex = /\\(.)/g;

  return str.replace(escapeSequenceRegex, '');
}
