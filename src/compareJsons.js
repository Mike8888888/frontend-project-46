/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
function compareJsons(file1, file2) {
  const file1PropsArray = Object.keys(file1);
  const file2PropsArray = Object.keys(file2);
  const result = [];

  file1PropsArray.map((key) => {
    switch (Object.hasOwn(file1, key)) {
      case Object.hasOwn(file2, key):
        if (file1[key] === file2[key]) {
          result.push(`  ${key}: ${file1[key]}`);
          return result;
        }
        result.push(`- ${key}: ${file1[key]}`);
        result.push(`+ ${key}: ${file2[key]}`);
        break;

      case !Object.hasOwn(file2, key):
        result.push(`- ${key}: ${file1[key]}`);
        break;

      default:
        return result.push('error');
    }
  });

  file2PropsArray.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      result.push(`+ ${key}: ${file2[key]}`);
    }
  });
  result.sort((a, b) => {
    if (a[2] > b[2]) {
      return 1;
    }
    if (a[2] < b[2]) {
      return -1;
    }
    return 0;
  });
  return result;
}

export default compareJsons;
