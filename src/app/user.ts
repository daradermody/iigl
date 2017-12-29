export class User {
  email: string;
  name: string;
  company: string;
  password: string;

  constructor(email: string, name: string, company: string, password: string) {
    this.email = email;
    this.name = name;
    this.company = company;
    this.password = password;
  }

  isValid(): boolean {
    if (this.email && this.name && this.company && this.password) {
      return true;
    } else {
      return false;
    }
  }
}
