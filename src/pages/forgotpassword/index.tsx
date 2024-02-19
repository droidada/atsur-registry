import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import axios from "@/lib/axios";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function ForgotPassword() {
  const forgotPasswordSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
  });

  type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const { logIn, user, error: forgotPasswordError } = useAuthContext();

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

  const onSubmitHandler: SubmitHandler<ForgotPasswordInput> = async (
    values,
  ) => {
    try {
      setLoading(true);
      console.log(values);
      const res = await axios.post(`${pubAPI}/auth/forgot-password`, {
        email: values.email,
      });
      console.log(res);
      setLoading(false);

      // router.replace("/dashboard");
      return;
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
                  <h2 className="tf-title pb-16 to-black">Forgot Password</h2>
                  <p className="pb-40 to-black">
                    Enter your registered email to get your password reset link
                  </p>
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
                        helperText={
                          errors["email"] ? errors["email"].message : ""
                        }
                        {...register("email")}
                      />
                    </fieldset>
                    <div className="btn-submit mb-30">
                      <button
                        type="submit"
                        className="tf-button style-1 h50 w-100"
                      >
                        Submit
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
