const isValidPassword = (password) => {
  const _regexPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{12,}$/;

  return _regexPassword.test(password);
};

export const generatePassword = () => {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

  const getRandomChar = (string) => string[Math.floor(Math.random() * string.length)];

  let password;
  do {
    password = getRandomChar(uppercaseChars) +
               getRandomChar(lowercaseChars) +
               getRandomChar(numbers) +
               getRandomChar(specialChars);

    for (let i = password.length; i <= 12; i++) {
      password += getRandomChar(uppercaseChars + lowercaseChars + numbers + specialChars);
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

  } while (!isValidPassword(password));

  return password;
};
