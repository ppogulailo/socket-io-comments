export const MAX_TXT_FILE_SIZE = 'Max size file is 100kb';
export const POST_NOT_FOUND_ERROR = 'Post with this id was not found';
export const POST_SELECT_FIELD = {
  id: true,
  title: true,
  body: true,
  file: true,
  user: {
    select: {
      email: true,
      name: true,
      id: true,
    },
  },
  createdAt: true,
};
