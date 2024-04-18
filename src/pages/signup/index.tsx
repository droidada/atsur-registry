import { TextField } from "@mui/material";
import Layout from "@/open9/layout/Layout";
import Link from "next/link";
import Image from "@/components/common/image";
import { useState, useEffect } from "react";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import axios from "@/lib/axios";
import { useToast } from "@/providers/ToastProvider";
import { LoadingButton } from "@mui/lab";

const pubAPI = process.env.NEXT_PUBLIC_API_ENDPOINT;

export const getServerSideProps = async ({ req, query, params }) => {
  console.log(query);
  const { token } = query;
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

export default function SignUp({ invitationData }) {
  const signUpSchema = object({
    firstName: string().nonempty("First name is required"),
    lastName: string().nonempty("Last name is required"),
    email: string().nonempty("Email is required").email("Email is invalid"),
    password: string()
      .nonempty("Password is required")
      .min(8, "Password must be more than 8 characters")
      .max(32, "Password must be less than 32 characters"),
    confirmPassword: string().nonempty("Confirm password is required"),
  }).refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    },
  );
  const [invitee, setInvitee] = useState(invitationData?.invitation?.invitee);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const token = router.query.token;
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const toast = useToast();
  type SignUpInput = TypeOf<typeof signUpSchema>;

  const {
    register,
    formState: { errors, isSubmitSuccessful },
    reset,
    setValue,
    handleSubmit,
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    setValue("firstName", invitee?.firstName);
    setValue("lastName", invitee?.lastName);
    setValue("email", invitee?.email);
  }, [invitee]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<SignUpInput> = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      setError(false);
      setSuccess(false);
      const resp = await axios.post(`${pubAPI}/auth/register`, {
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        password: values.password,
        confirmPassword: values.confirmPassword,
        username: values.email,
        inviteToken: token,
      });
      console.log(resp.data);
      //success message
      toast.success("Account created successfully");
      //redirect to login page

      setSuccess(true);
      invitee ? router.push(`/login?token=${token}`) : router.push("/login");
    } catch (error) {
      console.error(error.message);
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
      <Layout headerStyle={2} footerStyle={2}>
        <div className="tf-section-2 pt-60 widget-box-icon">
          <div className="themesflat-container w920">
            <div className="row">
              <div className="col-md-12">
                <div className="heading-section-1">
                  <h2 className="tf-title pb-16 to-black">
                    Create your account
                  </h2>
                  <p className="pb-40 to-black">
                    Let’s get started with your 30 days free trial
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
                    <fieldset className="name">
                      <label className="to-white">First Name *</label>
                      <TextField
                        type="text"
                        id="firstName"
                        placeholder="Your first name*"
                        name="firstName"
                        tabIndex={2}
                        aria-required="true"
                        fullWidth
                        error={!!errors["firstName"]}
                        helperText={
                          errors["firstName"] ? errors["firstName"].message : ""
                        }
                        {...register("firstName")}
                      />
                    </fieldset>
                    <fieldset className="name">
                      <label className="to-white">Last Name *</label>
                      <TextField
                        type="text"
                        id="lastName"
                        placeholder="Your last name*"
                        name="lastName"
                        tabIndex={2}
                        aria-required="true"
                        fullWidth
                        error={!!errors["lastName"]}
                        helperText={
                          errors["lastName"] ? errors["lastName"].message : ""
                        }
                        {...register("lastName")}
                      />
                    </fieldset>
                    <fieldset className="email">
                      <label className="to-white">Email *</label>
                      <TextField
                        type="text"
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
                        placeholder="Min. 8 characters"
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
                        className="icon-show password-addon"
                        id="password-addon"
                      />
                    </fieldset>
                    <fieldset className="password">
                      <label className="to-white">Confirm password *</label>
                      <TextField
                        className="password-input"
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm password"
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
                        className="icon-show password-addon"
                        id="password-addon"
                      />
                      <div className="widget-category-checkbox p-2">
                        <label className="tf-color">
                          I agree to all Terms, Privacy Policy and fees
                          <input type="checkbox" />
                          <span className="btn-checkbox" />
                        </label>
                      </div>
                    </fieldset>
                    <div className="btn-submit mb-30">
                      <LoadingButton
                        loading={loading}
                        className="tf-button style-1 h50 w-100"
                        type="submit"
                      >
                        Sign up
                        <i className="icon-arrow-up-right2" />
                      </LoadingButton>
                    </div>
                  </form>
                  <div className="other tf-color">or continue</div>
                  <div className="login-other">
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/google.png" alt="" />
                      <span>Login with google</span>
                    </Link>
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/facebook.png" alt="" />
                      <span>Login with facebook</span>
                    </Link>
                    <Link href="#" className="login-other-item">
                      <Image src="/assets/images/apple.png" alt="" />
                      <span>Login with apple</span>
                    </Link>
                  </div>
                  <div className="no-account tf-color">
                    Already have an account?{" "}
                    <Link href="/login" className="tf-color font-bold">
                      Log in
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
