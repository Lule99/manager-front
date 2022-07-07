const ParseLogin = (loginForm) => {
  return `
    <Login>
        <Email>${loginForm.email}</Email>
        <Lozinka>${loginForm.password}</Lozinka>
    </Login>`;
};

export default ParseLogin;
