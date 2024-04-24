import LoginForm from '@/components/LoginForm/LoginForm';
import classes from "./page.module.css";

async function auth(formData : {
  username: string,
  password: string,
}) {
};

export default function Login() {
  return (
    <div className={classes.wrapper}>
      <h1>Log In</h1>
      <LoginForm />
    </div>
  );
};
