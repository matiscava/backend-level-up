import { hash, compare } from "bcrypt";

const encrypt = async ( pass:string ) => {
  const passwortHash = await hash(pass, 10);
  return passwortHash;
};

const verified = async ( pass:string, passHash:string ) => {
  const isCorrect = await compare(pass, passHash);
  return isCorrect
};

export { encrypt, verified };