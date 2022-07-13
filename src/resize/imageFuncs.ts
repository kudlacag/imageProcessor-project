import {Request, Response} from 'express';
import sharp, {OutputInfo} from 'sharp';
import path from 'path';
import fs from 'fs';

import {ImageDetails} from '../interfaces/interfaces';

export const showTheImage = async (
  image: ImageDetails
): Promise<OutputInfo | undefined> => {
  const {filename, width, height} = image;
  try {
    const oldImage = path.resolve(`images/imagesFull/${filename}.jpg`);
    const newImage = path.resolve(
      `images/thumb/${filename}-${width}-${height}.jpg`
    );

    if (image.filename && image.width && image.height) {
      fs.mkdir(path.join('images/', 'thumb'), {recursive: true}, (err) => {
        if (err) {
          // eslint-disable-next-line no-console
          return 'please put filename, width and height';
        }
      });
    }

    const resizedImage = await sharp(oldImage)
      .resize(Number(width), Number(height))
      .toFile(newImage);

    if (!resizedImage) {
      throw new Error('something went wrong');
    }
    return resizedImage;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error is in sharp: ', error);
  }
};

export const imageAvailable = (imageInfo: ImageDetails) => {
  const {filename, width, height} = imageInfo;

  if (!filename || !width || !height) {
    // eslint-disable-next-line no-console
    console.log('please put filename, width and height');
    return 'please add all three arguments';
  }

  return imageInfo;
};

export const displayTheImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  const urlImage: ImageDetails = {
    filename: req.query.filename as unknown as string,
    width: req.query.width as unknown as number,
    height: req.query.height as unknown as number,
  };

  const imageExist = path.resolve(
    `images/thumb/${urlImage.filename}-${urlImage.width}-${urlImage.height}.jpg`
  );

  if (imageAvailable(urlImage)) {
    if (!fs.existsSync(imageExist)) {
      const newImage = await showTheImage(urlImage);

      if (!newImage) {
        res
          .status(400)
          .send(
            'please put an existing filename, width and height with positive numbers'
          );
      }
    }
  }

  res.status(200).sendFile(imageExist);
};

export const deleteImage = (req: Request, res: Response): void => {
  const image: ImageDetails = {
    filename: req.query.filename as unknown as string,
    width: Number(req.query.width as unknown as number),
    height: Number(req.query.height as unknown as number),
  };
  if (imageAvailable(image)) {
    const deletingImage = `images/thumb/${image.filename}-${image.width}-${image.height}.jpg`;

    fs.unlink(deletingImage, (err) => {
      if (!err) {
        // eslint-disable-next-line no-console
        console.log(`the ${req.query.filename} was deleted from thumb Folder`);
        res
          .status(200)
          .send(`the ${req.query.filename} was deleted from thumb Folder`);
      } else {
        res
          .status(400)
          .send(
            `the file you want delete is already deleted or you are writing wrong filename`
          );
      }
    });
  }
};
