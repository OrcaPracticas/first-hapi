import bcrypt from 'bcrypt';

export const encrypt = async (pass: string) => {
  const saltRounds = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, saltRounds);
};
