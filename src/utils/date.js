export const formatDateOnly = (date) => {
  return new Intl.DateTimeFormat(['pt-br']).format(new Date(date))
}

export const formatBirthDate = (date) => {
  const currentYear = new Intl.DateTimeFormat(['pt-br']).format(new Date()).split('/')[2]
  const birthYear = new Intl.DateTimeFormat(['pt-br']).format(date).split('/')[2]
  const birthDate = currentYear - birthYear;

  return birthDate
}