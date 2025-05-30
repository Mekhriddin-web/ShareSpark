import { Passport } from 'passport';
import { type Express } from 'express';
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

import { type AppContext } from './ctx';
import { env } from './env';

export const applyPassportToExpressApp = (expressApp: Express, ctx: AppContext): void => {
  const passport = new Passport();

  passport.use(
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        secretOrKey: env.JWT_SECRET,
      },
      (jwtPayload: string, done) => {
        ctx.prisma.user
          .findUnique({
            where: { id: jwtPayload },
          })
          .then(user => {
            if (!user) {
              done(null, false);
              return;
            }
            done(null, user);
          })
          .catch(error => {
            done(error, false);
          });
      }
    )
  );

  expressApp.use((req, res, next) => {
    if (!req.headers.authorization) {
      next();
      return;
    }
    passport.authenticate('jwt', { session: false }, (...args: unknown[]) => {
      req.user = args[1] || undefined;
      next();
    })(req, res, next);
  });
};
