export const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  parentId: true,
  createdAt: true,
  children: { select: { id: true } },
  user: {
    select: {
      id: true,
      name: true,
      email: true,
    },
  },
};
