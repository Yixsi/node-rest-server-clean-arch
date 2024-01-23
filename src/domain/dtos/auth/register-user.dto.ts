import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}
  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    // Object is the same as the body

    // Validations

    const { name, email, password } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Invalid email"];
    if (!password) return ["Missing password"];
    if (password.length < 6)
      return ["Password must be at least 6 characters long"];

    return [
      undefined, // no errors
      new RegisterUserDto(name, email.toLowerCase(), password),
    ];
  }
}

/**  
    We can only instantiate the RegisterUserDto object
    inside the class because the constructor is private, each time we use this dto we know
    the info is validated
*/
