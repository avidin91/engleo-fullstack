import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encodePassword = async (rawPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS); // Генерация соли
    const hash = await bcrypt.hash(rawPassword, salt); // Создание хэша с использованием соли
    return hash;
  } catch (error) {
    console.error('Error occurred during password encryption:', error);
    throw new Error('Error occurred during password encryption');
  }
};
