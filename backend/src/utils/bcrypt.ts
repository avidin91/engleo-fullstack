import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const encodePassword = async (rawPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(rawPassword, salt);
    return hash;
  } catch (error) {
    console.error('Error occurred during password encryption:', error);
    throw new Error('Error occurred during password encryption');
  }
};

export const matchingPassword = async (password: string, hash) => {
  return await bcrypt.compare(password, hash);
};
