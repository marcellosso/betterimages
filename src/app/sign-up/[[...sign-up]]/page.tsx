import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <SignUp
        signInUrl="/sign-in"
        redirectUrl={"/upload"}
        appearance={{
          variables: {
            colorPrimary: "#ea580c",
            colorBackground: "#0c0a09",
            colorText: "#EEEEEE",
            colorInputBackground: "#292524",
            colorInputText: "#EEEEEE",
          },
          layout: {
            shimmer: true,
            socialButtonsVariant: "blockButton",
          },
          elements: {
            rootBox: "mx-auto",
            formFieldInput__identifier: "border-border focus:border-detail",
            formFieldInput__username: "border-border focus:border-detail",
            formFieldInput__password: "border-border focus:border-detail",
            formFieldInput__confirmPassword:
              "border-border focus:border-detail",
            dividerLine: "bg-primary",
            socialButtonsBlockButton: "border-border",
            identityPreview: "border-border bg-secondary",
            otpCodeFieldInput: "border-b-border",
          },
        }}
      />
    </div>
  );
}
