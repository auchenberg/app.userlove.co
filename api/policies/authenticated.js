module.exports = function(req, res, next){

  if (req.isAuthenticated()){
    return next();
  } else {
    sails.log.error("policies authenticated.js redirect to /login");
    return res.redirect('/login/');
  }

};