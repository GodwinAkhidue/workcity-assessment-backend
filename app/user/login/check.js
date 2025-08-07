export default function Check(req) {
  const { email } = req.body;

  //Validate Email format using email regex
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (!isValidEmail(email)) {
    return;
  }

  return true;
}
