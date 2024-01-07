import boom from '@hapi/boom';
import { NextFunction } from 'express';

export const checkIfRecordExist = async (
  services: Array<any>,
  message: string
): Promise<any> => {
  for (const service of services) {
    const record = await service;

    if (!record) {
      return boom.forbidden(message);
    }
  }
};
