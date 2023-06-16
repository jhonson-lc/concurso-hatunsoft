import {User} from "@prisma/client";

export const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    userName: user.userName,
    fullName: user.fullName,
    image: user.image,
  };
};
