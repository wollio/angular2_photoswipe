export class Image {

  index: number;
  pid: string;
  largeUrl: string;
  thumbUrl: string;
  size: string;
  width: number;
  height: number;
  description: string;
  author: string;

  set id (newId: number) {
    this.pid = '' + newId;
  }

  constructor() {}
}
