const normalizeString = (string) => {
  return string
    .toLowerCase()
    .replaceAll('òa', 'oà')
    .replaceAll('óa', 'oá')
    .replaceAll('ỏa', 'oả')
    .replaceAll('õa', 'oã')
    .replaceAll('ọa', 'oạ')
    .replaceAll('òe', 'oè')
    .replaceAll('óe', 'oé')
    .replaceAll('ỏe', 'oẻ')
    .replaceAll('õe', 'oẽ')
    .replaceAll('ọe', 'oẹ')
    .replaceAll('ùy', 'uỳ')
    .replaceAll('úy', 'uý')
    .replaceAll('ủy', 'uỷ')
    .replaceAll('ũy', 'uỹ')
    .replaceAll('ụy', 'uỵ')
    .replace(/[.,;*+?<>^~$#&!@{}()|[\]\\]/g, '')
    .replace(/^\s*|\s(?=\s)|\s*$/g, '')
    .trim();
};

const validateUserSay = (userSay, processedIntent) =>
  normalizeString(userSay) === processedIntent;

export { normalizeString, validateUserSay };
