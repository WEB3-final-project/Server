import { 
  loginUser,
  createUser, 
  deleteUserPermanently,
  deleteUserTemporarily,
  logoutUser,
  checkToken
} from '../services/auth.services.js';
import "dotenv/config";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000 
};

export const login = async (req, res) => {
  try {
    const data = await loginUser(req.body);
    

    res.cookie('refresh_token', data.refreshToken, cookieOptions);

    return res.status(200).json({ 
      access_token: data.access_token, 
      token_type: "Bearer", 
      expires_in: data.expires_in, 
      role: data.role 
    });
  } catch (error) {
    return handleError(res, error, "Something went wrong during login");
  }
};

export const signUp = async (req, res) => {
  try {
    const newUser = await createUser(req.body);
    return res.status(201).json({ 
      message: `${newUser.role} registered`, 
      user: { id: newUser.id, email: newUser.email, full_name: newUser.full_name, role: newUser.role } 
    });
  } catch (error) {
    if (error.code === 'P2002' || (error.meta && error.meta.target?.includes('email'))) {
      return res.status(400).json({ message: "Email already in use" });
    }
    return handleError(res, error, "Server error during registration");
  }
};

export const deletePermanently = async (req, res) => {
  try {
    await deleteUserPermanently(req.params.id, req.user.role);
    return res.status(200).json({ message: "User deleted permanently successfully" });
  } catch (error) {
    return handleError(res, error, "Something went wrong");
  }
};

export const deleteTemporarily = async (req, res) => {
  try {
    await deleteUserTemporarily(req.params.id);
    return res.status(200).json({ message: "User deleted temporarily successfully" });
  } catch (error) {
    return handleError(res, error, "Something went wrong");
  }
};

export const logout = async (req, res) => {
  try {
    const userId = req.user.id;
    const refreshToken = req.cookies.refresh_token;

    await logoutUser(userId, refreshToken);

    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const checkLoginToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    const result = await checkToken(refreshToken);
    return res.status(200).json(result);
  } catch (error) {
    return handleError(res, error, "Erreur interne du serveur");
  }
};

function handleError(res, error, defaultMessage) {
  try {
    const parsedError = JSON.parse(error.message);
    if (parsedError.status && parsedError.message) {
      return res.status(parsedError.status).json({ message: parsedError.message });
    }
  } catch {
    console.error(error);
  }
  return res.status(500).json({ message: defaultMessage });
}