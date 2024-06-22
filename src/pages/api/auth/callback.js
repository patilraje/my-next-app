import passport from 'passport';
import nextConnect from 'next-connect';
import session from 'express-session';

const handler = nextConnect();

handler.use(session({ secret: 'secret', resave: false, saveUninitialized: true }))
  .use(passport.initialize())
  .use(passport.session());

handler.post(passport.authenticate('saml', {
  failureRedirect: '/',
  failureFlash: true
}), (req, res) => {
  res.redirect('/');
});

export default handler;
