export class WallOfFameGame {
  name: string;
  imageLink: string;
  clicked: boolean;

  constructor(name: string, imageLink: string, clicked: boolean = false) {
    this.name = name;
    this.imageLink = imageLink;
    this.clicked =  clicked;
  }
}
