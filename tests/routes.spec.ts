import path from 'path';
import app from '../src/index';
import {Server} from 'http';
import e, {response} from 'express';
import request from 'supertest';
import {showTheImage, imageAvailable} from '../src/resize/imageFuncs';
import fs from 'fs';

const server: Server = app.listen();

describe('route testing', () => {
  it('deleteImage func testing on the url', async (): Promise<void> => {
    const response = await request(server).get('/image');

    expect(response.status).toBe(400);
    expect(response.text).toEqual(
      'please put an existing filename, width and height with positive numbers'
    );
  });

  it('deleteImage func testing on the url', async (): Promise<void> => {
    const response = await request(server).get('/imagessss');

    expect(response.status).toBe(404);
    expect(response.text).toMatch('Cannot GET /imagesss');
    server.close();
  });
});
