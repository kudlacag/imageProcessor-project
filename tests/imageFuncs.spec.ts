import path from 'path';
import app from '../src/index';
import {Server} from 'http';
import e, {response} from 'express';
import request from 'supertest';
import {ImageDetails} from '../src/interfaces/interfaces';
import {showTheImage, imageAvailable} from '../src/resize/imageFuncs';
import fs from 'fs';

const server: Server = app.listen();

describe('testing functions functionalities', () => {
  it('will work as normal as it supposed to be (imageAvailable Func)', async (): Promise<void> => {
    const image: ImageDetails = {
      filename: 'icelandwaterfall',
      width: 300,
      height: 300,
    };

    const image2: ImageDetails = {
      filename: 'icelandwaterfall',
      width: 300,
      // height: 250,
    };
    // it will pass;
    expect(imageAvailable(image)).toEqual(image);

    //will will pass if false image
    expect(imageAvailable(image2)).toBe('please add all three arguments');
    expect(imageAvailable(image2)).not.toEqual(image);
  });

  it('showTheImage Func testing', async (): Promise<void> => {
    const image: ImageDetails = {
      filename: 'icelandwaterfall',
      width: 300,
      height: 300,
    };

    const image2: ImageDetails = {
      filename: 'icelandwaterfall',
      width: 300,
      // height: 250,
    };

    expect(await showTheImage(image)).toBeTruthy();
    expect(await showTheImage(image2)).toBeFalsy();
    expect(await showTheImage(image2)).not.toMatch(
      'images/thumb/icelandwaterfall-300-300.jpg'
    );
  });

  it('deleteImage func testing on the url', async (): Promise<void> => {
    const response = await request(server).get(
      '/image/delete?filename=icelandwaterfall&width=300&height='
    );

    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'the file you want delete is already deleted or you are writing wrong filename'
    );
  });
  it('displayTheImage url testing 2', async (): Promise<void> => {
    const response = await request(server).get(
      '/image/delete?filename=icelandwaterfall&width=300&height=250'
    );

    expect(response.status).toBe(200);
    expect(response.text).toBe(
      'the icelandwaterfall was deleted from thumb Folder'
    );
  });

  it('displayTheImage url testing 1', async (): Promise<void> => {
    const response = await request(server).get(
      '/image?filename=icelandwaterfall&width=300&height='
    );

    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'please put an existing filename, width and height with positive numbers'
    );
  });
  it('displayTheImage url testing 2', async (): Promise<void> => {
    const response = await request(server).get(
      '/image?filename=icelandwaterfall&width=300&height=250'
    );

    expect(response.status).toBe(200);
    server.close();
  });
});
function res(
  req: {filename: string; width: number; height: number},
  res: any,
  response: e.Response<any, Record<string, any>>
): void | PromiseLike<void> {
  throw new Error('Function not implemented.');
}
