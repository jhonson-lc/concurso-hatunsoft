import { useRouter } from "next/router";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z, type TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Ring } from "@uiball/loaders";

import { FormGroup } from "@/components/form/FormGroup";
import { LinkButton } from "@/components/Button/LinkButton";

const signInSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener como máximo 32 caracteres"),
});

export type SignInInput = TypeOf<typeof signInSchema>;

interface Props {}

const SignIn: React.FC<Props> = () => {
  const [status, setStatus] = React.useState("init");
  const router = useRouter();

  const methods = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmitHandler: SubmitHandler<SignInInput> = (values) => {
    setStatus("loading");
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    }).then((res) => {
      if (res?.status === 200) {
        toast.success("Bienvenido");
        // router.push(`http://localhost:8084`);
      }
      if (res?.status === 401) {
        toast.error("Credenciales incorrectas");
        setStatus("init");
      }
    });
  };
  return (
    <FormProvider {...methods}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmitHandler)}>
        <FormGroup error={errors.email?.message} label="Email" name="Email">
          <input
            className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="email"
            placeholder="Email"
            type="text"
            {...register("email")}
          />
        </FormGroup>

        <FormGroup error={errors.password?.message} label="Contraseña" name="password">
          <input
            className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            id="password"
            placeholder="Contraseña"
            type="password"
            {...register("password")}
          />
        </FormGroup>
        {status === "init" && (
          <input
            className="w-full cursor-pointer rounded-lg bg-primary py-2 font-semibold text-neutral-100"
            type="submit"
            value="Iniciar Sesión"
          />
        )}
        {status === "loading" && (
          <div className="flex w-full items-center justify-center rounded-lg bg-primary py-2 text-neutral-100">
            <Ring color="white" lineWeight={5} size={25} speed={2} />
          </div>
        )}

        <div className="flex flex-col items-center justify-between gap-0 pt-6">
          <p>No tienes una cuenta?</p>
          <LinkButton onClick={() => router.push("/sign-up")}>
            <span className="font-bold text-secondary hover:underline">Registrarse</span>
          </LinkButton>
        </div>
      </form>
    </FormProvider>
  );
};

export default SignIn;
