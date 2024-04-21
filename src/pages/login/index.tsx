"use client";
import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import Image from "@/components/common/image";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../providers/auth.context";
import { useToast } from "@/providers/ToastProvider";
import axios from "@/lib/axios";

export const getServerSideProps = async ({ req, query, params }) => {
  console.log(query);
  const { token } = query;
  console.log(token);
  if (token) {
    try {
      const res = await axios.post(`/invite/fetch`, {
        token,
      });

      console.log(res.data);

      return { props: { invitationData: res.data?.data } };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  } else {
    return { props: {} };
  }
};

export default function Login({ invitationData }) {
  const [invitee, setInvitee] = useState(invitationData?.invitation?.invitee);
  const loginSchema = object({
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
  });
  const toast = useToast();

  type LoginInput = TypeOf<typeof loginSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    handleSubmit,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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

  useEffect(() => {
    setValue("email", invitee?.email);
  }, [invitee]);

  const onSubmitHandler: SubmitHandler<LoginInput> = async (values) => {
    try {
      setLoading(true);
      console.log(values);
      const usr = await logIn(values.email, values.password);

      console.log("usr is ", usr);
      if (usr?.error) {
        throw usr.error;
      }
      console.log("login user is ", user);

      if (usr.ok) {
        invitee
          ? router.replace(`/invitation/${router.query.token}`)
          : router.replace("/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong. Please try again",
      );
    } finally {
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
                  <h2 className="tf-title pb-16 to-black">Login</h2>
                  <p className="pb-40 to-black">
                    Get started today by entering just a few details
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
                        disabled={invitee?.email ? true : false}
                        aria-required="true"
                        fullWidth
                        error={!!errors["email"]}
                        helperText={
                          errors["email"] ? errors["email"].message : ""
                        }
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
                        helperText={
                          errors["password"] ? errors["password"].message : ""
                        }
                        {...register("password")}
                      />
                      <i
                        className="icon-show password-addon tf-color"
                        id="password-addon"
                      />
                      <div className="forget-password tf-color">
                        <Link className="tf-color" href="/forgotpassword">
                          Forgot password?
                        </Link>
                      </div>
                    </fieldset>
                    <div className="btn-submit mb-30">
                      <LoadingButton
                        loading={loading}
                        disabled={loading}
                        variant="contained"
                        type="submit"
                        className="tf-button style-1 h50 w-100"
                      >
                        Login
                        <i className="icon-arrow-up-right2" />
                      </LoadingButton>
                    </div>
                  </form>
                  <div className="other tf-color">or continue</div>
                  <div className="login-other">
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/google.png" alt="" />
                      <span>Sign with google</span>
                    </Link>
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/facebook.png" alt="" />
                      <span>Sign with facebook</span>
                    </Link>
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/apple.png" alt="" />
                      <span>Sign with apple</span>
                    </Link>
                  </div>
                  <div className="no-account tf-color ">
                    Don&lsquo;t have an account?{" "}
                    <Link href="/signup" className="tf-color font-bold">
                      Sign up
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
