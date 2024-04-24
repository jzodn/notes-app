import SignupForm from '@/components/SignupForm/SignupForm';
import classes from "./page.module.css";

export default function Login() {
  return (
    <div className={classes.wrapper}>
      <h1>Sign up!</h1>
      <SignupForm />
    </div>
  );
};
