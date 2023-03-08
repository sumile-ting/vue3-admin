import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer';
import userMock from './mock/user';
import menuMock from './mock/menu';

export function setupProdMockServer() {
  createProdMockServer([...userMock, ...menuMock]);
}