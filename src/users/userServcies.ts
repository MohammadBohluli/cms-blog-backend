import fakeUser from "../data/user.data";

export const getAllUser = () => {
  if (fakeUser.length === 0) throw new Error("not any uset add yet");
  return fakeUser;
};

export const getUserById = (id: number) => {
  const user = fakeUser.find((user) => user.id === id);
  return user;
};
