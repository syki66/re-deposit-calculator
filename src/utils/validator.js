const isOnlyNum = (value) => {
  // 숫자만 포함하고 있는지 검사
  if (/^\d+$/.test(value)) {
    return true;
  }
  return false;
};

const isFloat = (value) => {
  if (/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/.test(value)) {
    return true;
  }
  return false;
};

const removeComma = (num) => {
  // 쉼표 제거
  return parseInt(num.replace(/[^0-9]/g, ""), 10);
};

const addComma = (num) => {
  // 쉼표 추가
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export { isFloat, isOnlyNum, addComma, removeComma };
