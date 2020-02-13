export class Game {
  // tslint:disable:max-line-length
  static defaultIconUrl = 'https://lh3.googleusercontent.com/proxy/pYUwr3B6ilFQgkz-6oEq1bDphvaoKkycJUD7c5J3knmLKOKsbtouoAfQl7AiEQbxJxN8z8U-EvcVUTraf2h6SO8dJuDqfspEJ9yUc5LhVdrXeeXwH3XFpIOJCmo1';

  name: string;
  iconUrl: string;

  constructor(name: string, iconUrl: string = Game.defaultIconUrl) {
    this.name = name;
    this.iconUrl = iconUrl;
  }
}
