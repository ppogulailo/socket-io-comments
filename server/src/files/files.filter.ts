import { RequestModel } from 'src/type/request.type';

export const imageFileFilter = (
  req: RequestModel,
  file: Express.Multer.File,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|txt)$/)) {
    console.log(callback);
    req.fileValidationError = 'Only image and txt files allowed';
    return callback(null, false);
  }
  callback(null, true);
};
