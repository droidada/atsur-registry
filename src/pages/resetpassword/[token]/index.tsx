import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../providers/auth.context";
import axios from "@/lib/axios";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function ResetPassword() {
  const resetPasswordPasswordSchema = object({
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });

  type ResetPasswordInput = TypeOf<typeof resetPasswordPasswordSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { logIn, user, error: resetPasswordPasswordError } = useAuthContext();

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

  const onSubmitHandler: SubmitHandler<ResetPasswordInput> = async (values) => {
    const token = router.query.token;
    try {
      setLoading(true);
      console.log(values);
      const usr = await axios.post(`${pubAPI}/auth/reset-password/${token}`, {
        password: values.password,
        confirm: values.confirmPassword,
      });

      console.log("usr is ", usr);
      console.log("resetPasswordPassword user is ", values);

      setLoading(false);
      if (usr.status) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <>
      <Layout headerStyle={2} footerStyle={1}>
        <div className="tf-section-2 pt-60 widget-box-icon">
          <div className="themesflat-container w920">
            <div className="row">
              <div className="col-md-12">
                <div className="heading-section-1">
                  <h2 className="tf-title pb-16 to-black">Reset Password</h2>
                  <p className="pb-40 to-black">Enter your new password</p>
                </div>
              </div>
              <div className="col-12">
                <div className="widget-login">
                  <form
                    className="comment-form"
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit(onSubmitHandler)}
                  >
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
                        helperText={
                          errors["password"] ? errors["password"].message : ""
                        }
                        {...register("password")}
                      />
                      <i
                        className="icon-show password-addon tf-color"
                        id="password-addon"
                      />
                    </fieldset>
                    <fieldset className="password">
                      <label className="to-white">Confirm Password *</label>
                      <TextField
                        className="password-input"
                        type="password"
                        id="confirmPassword"
                        placeholder="Min. 8 character"
                        name="confirmPassword"
                        tabIndex={2}
                        aria-required="true"
                        fullWidth
                        error={!!errors["confirmPassword"]}
                        helperText={
                          errors["confirmPassword"]
                            ? errors["confirmPassword"].message
                            : ""
                        }
                        {...register("confirmPassword")}
                      />
                      <i
                        className="icon-show password-addon tf-color"
                        id="password-addon"
                      />
                    </fieldset>
                    <div className="btn-submit mb-30">
                      <button
                        type="submit"
                        className="tf-button style-1 h50 w-100"
                      >
                        Reset Password
                        <i className="icon-arrow-up-right2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}