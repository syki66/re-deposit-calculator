const getDateDiff = (date_1, date_2) => {
  const date1 = new Date(date_1);
  const date2 = new Date(date_2);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays - 1;
};

const addMonths = (date, months) => {
  const newDate = new Date(date.setMonth(date.getMonth() + months));

  return newDate.toISOString().split("T")[0];
};

export { getDateDiff, addMonths };
