"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CustomInput from "@/components/common/CustomInput";
import { authFormSchema } from "@/lib/schemas/auth.schema";
import { signIn, signUp } from "@/lib/actions/user.action";


const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();

  const [user, setUser] = useState(null);

  const formSchema = authFormSchema(type);
  type formType = z.infer<typeof formSchema>;

  // 1. Define your form.
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  // 2. Define a submit handler.
  const onSubmit = async (values: formType) => {
    try {
      /* Sign up with Appwrite & create plaid token */
      if (type === "sign-up") {
        const newUser = await signUp(values);
        setUser(newUser);
      }

      if (type === "sign-in") {
        const response = await signIn({
          email: values.email,
          password: values.password,
        });
        console.log(response);

        if (response) router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      form.reset();
    }
  };


  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link
          href="/"
          className="mb-5 cursor-pointer flex items-center gap-1 px-4"
        >
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="BankZest logo"
          />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
            BankZest
          </h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-1">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your deatils"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">{/* PlaidLink */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      formControl={control}
                      name="firstName"
                      label="First Name"
                      placeholder="ex: Super"
                    />
                    <CustomInput
                      formControl={control}
                      name="lastName"
                      label="Last Name"
                      placeholder="ex: Section"
                    />
                  </div>
                  <CustomInput
                    formControl={control}
                    name="address1"
                    label="Address"
                    placeholder="Enter your specific address"
                  />
                  <CustomInput
                    formControl={control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      formControl={control}
                      name="state"
                      label="State"
                      placeholder="Example: NY"
                    />
                    <CustomInput
                      formControl={control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="Example: 1101"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      formControl={control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                    />
                    <CustomInput
                      formControl={control}
                      name="ssn"
                      label="SSN"
                      placeholder="Example: 1234"
                    />
                  </div>
                </>
              )}

              <CustomInput
                formControl={control}
                name="email"
                label="Email"
                placeholder="Enter your email addess"
              />
              <CustomInput
                formControl={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="form-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <footer className="flex items-center justify-center gap-1">
            <p>
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="form-link"
            >
              <p className="font-semibold">
                {type === "sign-in" ? "Sign Up" : "Sign In"}
              </p>
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};


export default AuthForm;