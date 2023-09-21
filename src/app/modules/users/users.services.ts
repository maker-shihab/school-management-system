import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Error as MongooseError } from "mongoose";
import { IUser } from "./users.interface";
import { User } from "./users.model";
const salt = bcrypt.genSaltSync(10);

const createUser = async (user: IUser): Promise<IUser | null> => {
  const { id, password, role } = user;
  // check password
  if (!password) {
    throw new MongooseError("User id is required");
  }

  // set role
  if (!role) {
    user.role = "student";
  }
  // HashPassword
  const hashPassword = await bcrypt.hash(user.password, salt);

  const newUser = new User({ id, password: hashPassword, role });
  // create User
  const createUser = await User.create(newUser);
  return createUser;
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

// Access token
export const genAccesstoken = (userId: string, role: string): string => {
  return jwt.sign({ userId, role }, "access-secret", { expiresIn: "5m" });
};

// Refresh token
export const genRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, "refresh-secreat", { expiresIn: "7d" });
};

const loginUser = async (id: string, password: string) => {
  // User check
  const user = await User.findOne({ id });
  if (!user) {
    throw new Error("Invalid id");
  }

  // Password check
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("User ID and Password Not matched");
  }

  const accessToken = genAccesstoken(user.id, user.role);
  const refreshToken = genRefreshToken(user.id);

  return { accessToken, refreshToken };
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  loginUser,
  getSingleUser,
  deleteUser,
};
