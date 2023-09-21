import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./users.services";

const createUser: RequestHandler = async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const createUser = await UserService.createUser(userData);

  res.status(201).json({
    success: true,
    message: "User create successfully",
    data: createUser,
  });
};

const getAllUsers: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = await UserService.getAllUsers();

  res.status(201).json({
    success: true,
    message: "User retrip successful",
    data: result,
  });
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { id, password } = req.body;

  try {
    const { accessToken, refreshToken } = await UserService.loginUser(
      id,
      password
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Login successful.",
      data: accessToken,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Authentication failed.",
      data: error,
    });
  }
};

const getSingleUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const getUser = await UserService.getSingleUser(id);
  res.status(201).json({
    success: true,
    message: "find successfull",
    data: getUser,
  });
};

const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id);

  res.status(200).json({
    success: true,
    message: "User Delete success",
    data: result,
  });
};

export const UserController = {
  createUser,
  getAllUsers,
  loginUser,
  getSingleUser,
  deleteUser,
};
