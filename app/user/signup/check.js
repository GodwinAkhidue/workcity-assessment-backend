export default function Check(req) {
  const { firstname, lastname, email, password } = req.body;

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  if (typeof firstname !== "string") {
    return;
  }
  if (firstname.trim().length <= 0) {
    return;
  }
  if (typeof lastname !== "string") {
    return;
  }
  if (lastname.trim().length <= 0) {
    return;
  }
  if (!isValidEmail(email)) {
    return;
  }
  if (typeof password !== "string") {
    return;
  }

  return true;
}
