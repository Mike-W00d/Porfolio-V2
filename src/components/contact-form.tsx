"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { sendEmail } from "@/app/api/_actions";
import { ContactFormSchema } from "@/lib/models/contactSchema";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

export default function ContactForm() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [submitMessage, setSubmitMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(ContactFormSchema),
  });

  const processForm: SubmitHandler<ContactFormInputs> = async (data) => {
    // ReCaptcha verification
    if (!executeRecaptcha) {
      console.log("ReCaptcha not available");
      return;
    }

    const gRecaptchaToken = await executeRecaptcha("submit_form");

    const recaptchaResponse = await axios({
      method: "post",
      url: "/api/reCaptchaSubmit",
      data: {
        gRecaptchaToken,
      },
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    });

    if (
      recaptchaResponse?.data?.success &&
      recaptchaResponse?.data?.score > 0.5
    ) {
      // ReCaptcha passed; proceed to send the email
      const result = await sendEmail(data);

      if (result?.success) {
        console.log({ data: result.data });
        toast.success("ReCaptcha Verified and Email sent!");
        reset();
        setSubmitMessage("Thank you for your Message!");
      } else {
        console.log(result?.error);
        toast.error("Something went wrong!");
      }
    } else {
      console.log(
        `ReCaptcha failed with score: ${recaptchaResponse?.data?.score}`,
      );
      setSubmitMessage("Failed to verify ReCaptcha! You must be a robot!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-5 px-4 text-gray-600"
    >
      <div>
        <input
          placeholder="Name"
          className="w-full rounded-lg border p-4"
          {...register("name")}
        />
        {errors.name?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Email"
          className="w-full rounded-lg border p-4"
          {...register("email")}
        />
        {errors.email?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input
          placeholder="Company"
          className="w-full rounded-lg border p-4"
          {...register("company")}
        />
        {errors.company?.message && (
          <p className="ml-1 mt-1 text-sm text-red-400">
            {errors.company.message}
          </p>
        )}
      </div>

      <div>
        <textarea
          rows={5}
          placeholder="Message"
          className="w-full rounded-lg border p-4"
          {...register("message")}
        />
        {errors.message?.message && (
          <p className="ml-1 text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        className="rounded-lg border border-fedblue bg-fedblue py-2.5 font-medium text-white transition-colors hover:bg-honblue disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      {submitMessage && <p className="text-center text-lg">{submitMessage}</p>}
    </form>
  );
}
