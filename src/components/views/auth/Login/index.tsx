import Link from "next/link";
import styles from "./Login.module.scss";
import { useRouter } from "next/router";
import { FormEvent, use, useState } from "react";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";

const LoginView = () => {
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsloading(true);
    setError("");
    const form = event.target as HTMLFormElement;
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsloading(false);
        form.reset();
        push(callbackUrl);
      } else {
        setIsloading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsloading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't have an account? Sign Up "
    >
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" type="email" />
        <Input label="Password" name="password" type="password" />
        <Button
          variant="primary"
          type="submit"
          className={styles.login__button}
        >
          {" "}
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button
          type="button"
          className={styles.login__other__button}
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          <i className="bx bxl-google" /> Login with Google
        </Button>
      </div>
    </AuthLayout>
  );
};

export default LoginView;
