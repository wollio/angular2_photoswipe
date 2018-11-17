export class Image {

  index: number;
  pid: string;
  largeUrl: string;

  thumbUrl: string;
  thumbWidth: number;
  thumbHeight: number;

  size: string;
  width: number;
  height: number;

  html: string;

  description: string;
  author: string;

  set id (newId: number) {
    this.pid = '' + newId;
  }

  constructor() {}
}
