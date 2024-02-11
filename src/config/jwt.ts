import jwt from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(payload: Object, duration: string = "2h") {
    return new Promise<string | null>((resolve) => {
      jwt.sign(payload, "SEED", { expiresIn: duration }, (err, token) => {
        if (err) resolve(null);

        resolve(token!);
      });
    });
  }
}
