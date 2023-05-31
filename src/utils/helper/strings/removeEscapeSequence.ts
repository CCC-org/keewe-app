export default function removeEscapeSequences(str: string): string {
  // Matches escape sequences like \n, \t, \r, etc.
  const escapeSequenceRegex = /\\(.)/g;

  return str.replace(escapeSequenceRegex, '');
}
