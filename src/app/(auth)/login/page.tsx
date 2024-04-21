import LoginForm from '@/components/LoginForm/LoginForm';

async function auth(formData : {
  username: string,
  password: string,
}) {
};

export default function Login() {
  return (
    <>
      <h1>Log In</h1>
      <LoginForm />
    </>
  );
};
