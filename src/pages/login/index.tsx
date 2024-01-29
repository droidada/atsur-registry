import Layout from "@/open9/layout/Layout"
import Link from "next/link"
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";

export default function Login() {

    const loginSchema = object({
        email: string().nonempty("Email is required").email("Email is invalid"),
        password: string()
          .nonempty("Password is required")
          .min(8, "Password must be more than 8 characters")
          .max(32, "Password must be less than 32 characters"),
      });
    
      type LoginInput = TypeOf<typeof loginSchema>;
    
      const {
        register,
        formState: { errors, isSubmitSuccessful },
        reset,
        handleSubmit,
      } = useForm<LoginInput>({
        resolver: zodResolver(loginSchema),
      });
    
      const [loading, setLoading] = useState(false);
      const router = useRouter();
      const [error, setError] = useState(false);
      const { logIn, user, error: loginError } = useAuthContext();

      useEffect(() => {
        if (isSubmitSuccessful) {
          reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [isSubmitSuccessful]);
    
      useEffect(() => {
        setError(false);
        // setSuccess(false);
      }, []);

      const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
        try {
          setLoading(true);
          console.log(values);
          const usr = await logIn(values.email, values.password);

          console.log("usr is ", usr);
          console.log("login user is ", user);

          setLoading(false);

        //   if (usr?.error) {
        //     setError(true);
        //     return;
        //   }
    
        //   if (usr.ok && user?.onboarded === false) {
        //     router.replace("/profile/setup");
        //     return;
        //   }
    
           router.replace("/dashboard");
           return;
        } catch (error) {
          console.log(error);
          setError(true);
          setLoading(false);
        }
      };

    return (
        <>
            <Layout headerStyle={2} footerStyle={2}>
                <div className="tf-section-2 pt-60 widget-box-icon">
                    <div className="themesflat-container w920">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="heading-section-1">
                                    <h2 className="tf-title pb-16 to-black">Login</h2>
                                    <p className="pb-40 to-black">Get started today by entering just a few details</p>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="widget-login">
                                    <form
                                        className="comment-form"
                                        autoComplete="off"
                                        noValidate
                                        onSubmit={handleSubmit(onSubmitHandler)}>
                                        <fieldset className="email">
                                            <label className="to-white">Email *</label>
                                            <TextField
                                                type="email"
                                                id="email"
                                                placeholder="mail@website.com"
                                                name="email"
                                                tabIndex={2}
                                                aria-required="true"
                                                fullWidth
                                                error={!!errors["email"]}
                                                helperText={errors["email"] ? errors["email"].message : ""}
                                                {...register("email")}
                                                />
                                        </fieldset>
                                        <fieldset className="password">
                                            <label className="to-white">Password *</label>
                                            <TextField
                                                className="password-input"
                                                type="password"
                                                id="password"
                                                placeholder="Min. 8 character"
                                                name="password"
                                                tabIndex={2}
                                                aria-required="true"
                                                fullWidth
                                                error={!!errors["password"]}
                                                helperText={errors["password"] ? errors["password"].message : ""}
                                                {...register("password")}
                                                />
                                            <i className="icon-show password-addon tf-color" id="password-addon" />
                                            <div className="forget-password">
                                                <Link href="#">Forgot password?</Link>
                                            </div>
                                        </fieldset>
                                        <div className="btn-submit mb-30">
                                            <button type="submit" className="tf-button style-1 h50 w-100">Login<i className="icon-arrow-up-right2" /></button>
                                        </div>
                                    </form>
                                    <div className="other">or continue</div>
                                    <div className="login-other">
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/google.png" alt="" />
                                            <span>Sign with google</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/facebook.png" alt="" />
                                            <span>Sign with facebook</span>
                                        </Link>
                                        <Link href="#" className="login-other-item">
                                            <img src="/assets/images/apple.png" alt="" />
                                            <span>Sign with apple</span>
                                        </Link>
                                    </div>
                                    <div className="no-account">Don&lsquo;t have an account? <Link href="/sign-up" className="tf-color">Sign up</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}