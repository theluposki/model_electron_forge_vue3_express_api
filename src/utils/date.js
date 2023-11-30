export const formatDateOnly = (date) => {
  return new Intl.DateTimeFormat(['pt-br']).format(date)
}