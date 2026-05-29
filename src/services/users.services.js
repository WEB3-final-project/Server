export const updateUserPhoto = async (userId, file) => {
    if (!file) {
        throw new Error("No file uploaded");
    }

    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    const photo_url = `/uploads/${file.filename}`;

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { photo_url: photo_url }
    });

    const { password, ...safeUser } = updatedUser;

    return safeUser;
};