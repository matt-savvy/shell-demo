function isAdmin(user) {
  return user.roles.includes("Admin");
}

function canUserChangeEmail(user) {
  return isAdmin(user);
}
