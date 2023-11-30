export const colorAutorization = (autorization) => {
  if(autorization === "administrator") {
    return 'authorization red'
  }

  if(autorization === "winner") {
    return 'authorization yellow'
  }

  if(autorization === "deliveryman") {
    return 'authorization green'
  }

  if(autorization === "legal") {
    return 'authorization darkness'
  }

  return 'authorization'
}