export const formatDateOnly = (date) => {
  return new Intl.DateTimeFormat(['pt-br']).format(new Date(date))
}

export const formatDateYMD = (date) => {
  const dataObj = new Date(date);
  const ano = dataObj.getFullYear();
  const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
  const dia = dataObj.getDate().toString().padStart(2, '0');

  const result = `${ano}-${mes}-${dia}`;
  return result
};

export const formatBirthDate = (date) => {
  const currentYear = new Intl.DateTimeFormat(['pt-br']).format(new Date()).split('/')[2]
  const birthYear = new Intl.DateTimeFormat(['pt-br']).format(date).split('/')[2]
  const birthDate = currentYear - birthYear;

  return birthDate
}