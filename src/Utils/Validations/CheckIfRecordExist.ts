import boom from '@hapi/boom';

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
