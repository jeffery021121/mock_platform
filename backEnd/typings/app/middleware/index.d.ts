// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportRoutewarp from '../../../app/middleware/routewarp';

declare module 'egg' {
  interface IMiddleware {
    routewarp: typeof ExportRoutewarp;
  }
}
