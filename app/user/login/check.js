export default function Check(req) {
  const { email } = req.body;

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (!isValidEmail(email)) {
    return;
  }

  return true;
}
