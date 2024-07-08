import archiver from 'archiver';
import chalk from 'chalk';
import express, { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { not } from '@vighnesh153/tools-platform-independent';
import { ROOT_HTML_FILE_PATH } from '../constants';
import { getDirectoryInformation, getDirName, isDirectoryPath, isPathValid } from './utils';

export function frontendCodeHandler() {
  return express.static(getDirName(), {
    immutable: true,
    maxAge: '30000',
  });
}

export function validateRequestPathExists(servingPath: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const resolvedPath = path.resolve(servingPath, req.path.slice(1));
    if (isPathValid(resolvedPath)) {
      next();
      return;
    }
    res.status(404).json({
      message: `This path is invalid: ${resolvedPath}`,
    });
  };
}

export function handleZip(servingPath: string) {
  return (req: Request, res: Response) => {
    const userRequestedPath = path.resolve(servingPath, `${req.query.path}`.slice(1));
    const folderName = path.basename(userRequestedPath);

    // zip archive configuration
    const zipArchive = archiver('zip');

    zipArchive.on('end', () => {
      /* eslint-disable no-console */
      console.log(chalk.green(`${zipArchive.pointer()} total bytes`));
      /* eslint-enable no-console */
    });

    zipArchive.on('error', (error) => {
      res.status(500).send({ error });
    });

    // name the output file
    res.attachment(`${folderName}.zip`);

    // pipe zip output stream to response
    zipArchive.pipe(res);

    // add the folder stream to archive
    zipArchive.directory(userRequestedPath, folderName);

    zipArchive.finalize().then(() => {
      /* eslint-disable no-console */
      console.log(chalk.yellow('/zip: Configuration complete'));
      /* eslint-enable no-console */
    });
  };
}

export function handleDirectory(servingPath: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRequestedPath = path.resolve(servingPath, req.path.slice(1));

    if (not(isDirectoryPath(userRequestedPath))) {
      next();
      return;
    }

    const htmlFile = fs.readFileSync(path.resolve(getDirName(), ROOT_HTML_FILE_PATH), { encoding: 'utf-8' });
    const replacedFile = htmlFile.replace(
      '__REPLACEMENT__',
      JSON.stringify(getDirectoryInformation(userRequestedPath))
    );
    res.send(replacedFile);
  };
}

export function methodNotAllowed() {
  return (req: Request, res: Response) => {
    res.status(405).json({
      message: `Method "${req.method}" is not allowed. Supported method is "GET"`,
    });
  };
}

export function handleFileDownload(servingPath: string) {
  return express.static(servingPath, {
    dotfiles: 'allow',
    setHeaders: (res) => {
      res.setHeader('content-type', 'application/octet-stream');
    },
  });
}
