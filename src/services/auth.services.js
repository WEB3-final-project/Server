import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateCreateUserData, validateLoginUser } from '../validators/auth.validators.js';
import "dotenv/config";
import { prisma } from "../config/db.js";

export const loginUser = async (body) => {
  const { email, password } = body;
  
  const validationError = validateLoginUser(body);
  if (validationError) {
    throw new Error(JSON.stringify({ status: 400, message: validationError }));
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) {
    throw new Error(JSON.stringify({ status: 400, message: "Invalid credentials" }));
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error(JSON.stringify({ status: 400, message: "Invalid credentials" }));
  }

  const expires_in = "15m";
  const access_token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: expires_in }
  );

  const refreshToken = jwt.sign(
    { user_id: user.id }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { expiresIn: '7d' }
  );

  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      user_id: user.id,
      expires_at: expirationDate
    }
  });

  return { access_token, refreshToken, expires_in, role: user.role };
};

export const createUser = async (body, file) => {
  const { bio, full_name, email, password, role } = body;
  const external_links = body.external_links
  ? JSON.parse(body.external_links)
  : null;
  const photo_url = file ? `/uploads/${file.filename}` : null;

  const validationError = validateCreateUserData(body);
  if (validationError) {
    throw new Error(JSON.stringify({ status: 400, message: validationError }));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (role === "speaker") {
    return await prisma.user.create({
      data: { photo_url, bio, full_name, external_links, email, password: hashedPassword, role: "speaker" }
    });
  } else if (role === "participant") {
    return await prisma.user.create({
      data: { full_name, email, password: hashedPassword, role: "participant" }
    });
  } else if (role === "admin") {
    return await prisma.user.create({
      data: { email, password: hashedPassword, full_name, role: "admin" }
    });
  } else {
    throw new Error(JSON.stringify({ status: 400, message: "Invalid role specified" }));
  }
};

export const deleteUserPermanently = async (id, userRole) => {
  if (userRole !== 'admin') {
    throw new Error(JSON.stringify({ status: 403, message: "Forbidden" }));
  }
  return await prisma.user.delete({
    where: { id: id },
  });
};

export const deleteUserTemporarily = async (id) => {
  return await prisma.user.update({
    where: { id: id },
    data: { deleted_at: new Date() },
  });
};

export const logoutUser = async (userId, refreshToken) => {
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({
      where: { token: refreshToken }
    });
  }

  await prisma.refreshToken.deleteMany({
    where: { 
      user_id: userId,
      expires_at: { lt: new Date() }
    }
  });
};

export const checkToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error(JSON.stringify({ status: 401, message: "No refresh token provided" }));
  }

  const tokenInDb = await prisma.refreshToken.findUnique({
    where: { token: refreshToken },
    include: { user: true }
  });
  
  if (!tokenInDb) {
    throw new Error(JSON.stringify({ status: 403, message: "Token revoked or invalid" }));
  }

  if (tokenInDb.expires_at < new Date()) {
    await prisma.refreshToken.delete({ where: { token: refreshToken } });
    throw new Error(JSON.stringify({ status: 403, message: "Token expired" }));
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        reject(new Error(JSON.stringify({ status: 403, message: "Invalid refresh token" })));
        return;
      }

      const newAccessToken = jwt.sign(
        { userId: tokenInDb.user.id, email: tokenInDb.user.email, role: tokenInDb.user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
      );

      resolve({
        access_token: newAccessToken,
        expires_in: 900
      });
    });
  });
};