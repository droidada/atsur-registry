// import {
//   Box,
//   FormControlLabel,
//   FormGroup,
//   FormHelperText,
//   TextField,
//   Typography,
//   styled,
//   Container,
// } from "@mui/material";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { literal, object, string, TypeOf } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useEffect, useState } from "react";
// import { LoadingButton } from "@mui/lab";
// import Checkbox from "@mui/material/Checkbox";
// import Layout from "@/components/layout/layout";

// const MainContent = styled(Box)(
//   () => `
//       height: 100%;
//       display: flex;
//       flex: 1;
//       flex-direction: column;
//   `,
// );

// const TopWrapper = styled(Box)(
//   ({ theme }) => `
//     display: flex;
//     width: 100%;
//     flex: 1;
//     align-items: center;
//     justify-content: center;
//     padding: 5%;
//  `,
// );

// const registerSchema = object({
//   name: string()
//     .nonempty("Name is required")
//     .max(32, "Name must be less than 100 characters"),
//   email: string().nonempty("Email is required").email("Email is invalid"),
//   password: string()
//     .nonempty("Password is required")
//     .min(8, "Password must be more than 8 characters")
//     .max(32, "Password must be less than 32 characters"),
//   passwordConfirm: string().nonempty("Please confirm your password"),
//   terms: literal(true, {
//     invalid_type_error: "Accept Terms is required",
//   }),
// }).refine((data) => data.password === data.passwordConfirm, {
//   path: ["passwordConfirm"],
//   message: "Passwords do not match",
// });

// type RegisterInput = TypeOf<typeof registerSchema>;

// const RegisterPage = () => {
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     formState: { errors, isSubmitSuccessful },
//     reset,
//     handleSubmit,
//   } = useForm<RegisterInput>({
//     resolver: zodResolver(registerSchema),
//   });

//   useEffect(() => {
//     if (isSubmitSuccessful) {
//       reset();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isSubmitSuccessful]);

//   const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
//     try {
//       console.log(values);
//       // await directus.request(createUser(["directory_users"], {}));
//       // await directus.login(values.email, values.password, { mode: "json" });
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   console.log(errors);

//   return (
//     <Layout>
//       <MainContent>
//         <TopWrapper>
//           <Container maxWidth="md">
//             <Container maxWidth="sm">
//               <Box sx={{ maxWidth: "30rem" }}>
//                 <Typography variant="h4" component="h1" sx={{ mb: "2rem" }}>
//                   Register
//                 </Typography>
//                 <Box
//                   component="form"
//                   noValidate
//                   autoComplete="off"
//                   onSubmit={handleSubmit(onSubmitHandler)}
//                 >
//                   <TextField
//                     sx={{ mb: 2 }}
//                     label="Name"
//                     fullWidth
//                     required
//                     error={!!errors["name"]}
//                     helperText={errors["name"] ? errors["name"].message : ""}
//                     {...register("name")}
//                   />
//                   <TextField
//                     sx={{ mb: 2 }}
//                     label="Email"
//                     fullWidth
//                     required
//                     type="email"
//                     error={!!errors["email"]}
//                     helperText={errors["email"] ? errors["email"].message : ""}
//                     {...register("email")}
//                   />
//                   <TextField
//                     sx={{ mb: 2 }}
//                     label="Password"
//                     fullWidth
//                     required
//                     type="password"
//                     error={!!errors["password"]}
//                     helperText={
//                       errors["password"] ? errors["password"].message : ""
//                     }
//                     {...register("password")}
//                   />
//                   <TextField
//                     sx={{ mb: 2 }}
//                     label="Confirm Password"
//                     fullWidth
//                     required
//                     type="password"
//                     error={!!errors["passwordConfirm"]}
//                     helperText={
//                       errors["passwordConfirm"]
//                         ? errors["passwordConfirm"].message
//                         : ""
//                     }
//                     {...register("passwordConfirm")}
//                   />

//                   <FormGroup>
//                     <FormControlLabel
//                       control={<Checkbox required />}
//                       {...register("terms")}
//                       label={
//                         <Typography
//                           color={errors["terms"] ? "error" : "inherit"}
//                         >
//                           Accept Terms and Conditions
//                         </Typography>
//                       }
//                     />
//                     <FormHelperText error={!!errors["terms"]}>
//                       {errors["terms"] ? errors["terms"].message : ""}
//                     </FormHelperText>
//                   </FormGroup>

//                   <LoadingButton
//                     variant="contained"
//                     fullWidth
//                     type="submit"
//                     loading={loading}
//                     sx={{ py: "0.8rem", mt: "1rem" }}
//                   >
//                     Register
//                   </LoadingButton>
//                 </Box>
//               </Box>
//             </Container>
//           </Container>
//         </TopWrapper>
//       </MainContent>
//     </Layout>
//   );
// };

// export default RegisterPage;

import React from "react";

const index = () => {
  return <div>index</div>;
};

export default index;
