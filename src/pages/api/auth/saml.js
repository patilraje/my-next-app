import { Strategy as SamlStrategy } from 'passport-saml';
import passport from 'passport';
import nextConnect from 'next-connect';
import session from 'express-session';

const handler = nextConnect();

passport.use(new SamlStrategy({
  entryPoint: process.env.OKTA_SAML_ENTRYPOINT,
  issuer: process.env.OKTA_SAML_ISSUER,
  callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback`,
  cert: process.env.OKTA_SAML_CERT,
}, (profile, done) => {
  return done(null, profile);
}));

handler.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session());

handler.get(passport.authenticate('saml', {
  failureRedirect: '/',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

export default handler;
