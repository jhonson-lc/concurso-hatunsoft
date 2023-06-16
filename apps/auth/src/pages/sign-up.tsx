import type { NextPage } from "next";
import type { SubmitHandler } from "react-hook-form";
import type { TypeOf } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "sonner";
import { Ring } from "@uiball/loaders";

import { api } from "../utils/api";
import { encrypt } from "../utils/encrypt";

import { FormGroup } from "@/components/form/FormGroup";

const registerSchema = z.object({
  cedula: z.string().min(1, "La cédula es requerido").max(100),
  email: z.string().email("El email no es válido"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(32, "La contraseña debe tener como máximo 32 caracteres"),
  name: z.string().min(4, "El nombre debe tener al menos 4 caracteres"),
  apellido: z.string().min(4, "El apellido debe tener al menos 4 caracteres"),
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const SignUp: NextPage = () => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const createUser = api.User.createUser.useMutation({
    onSuccess: () => {
      toast.success("Usuario creado correctamente");
      router.push("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    createUser.mutate({
      ...values,
      password: encrypt(values.password),
    });
  };

  return (
    <section className="flex h-screen w-full overflow-hidden">
      <section className="grid h-full w-screen place-items-center">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <section className="flex w-[600px] flex-col justify-start px-12 pt-10">
              <span className="text-md font-medium">Empecemos! 🚀</span>
              <span className="text-sm font-normal text-neutral-500">
                Por favor ingrese la información correcta
              </span>
              <FormGroup error={errors.cedula?.message} label="Cédula" name="cedula">
                <input
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="cedula"
                  type="text"
                  {...register("cedula")}
                />
              </FormGroup>
              <FormGroup error={errors.name?.message} label="Nombre" name="name">
                <input
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="cedula"
                  type="text"
                  {...register("name")}
                />
              </FormGroup>
              <FormGroup error={errors.apellido?.message} label="Apellido" name="apellido">
                <input
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="cedula"
                  type="text"
                  {...register("apellido")}
                />
              </FormGroup>
              <FormGroup error={errors.email?.message} label="Correo electrónico" name="email">
                <input
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="email"
                  type="text"
                  {...register("email")}
                />
              </FormGroup>
              <FormGroup error={errors.password?.message} label="Contraseña" name="password">
                <input
                  className="peer block min-h-[auto] w-full rounded border-0 bg-neutral-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="cedula"
                  type="text"
                  {...register("password")}
                />
              </FormGroup>
              {!createUser.isLoading ? (
                <input
                  className="mt-4 w-full cursor-pointer rounded-none bg-primary p-4 font-semibold text-neutral-100"
                  type="submit"
                  value="Registrarse"
                />
              ) : (
                <div className="mt-4 flex w-full items-center justify-center bg-primary p-4">
                  <Ring color="white" lineWeight={5} size={25} speed={2} />
                </div>
              )}
            </section>
          </form>
        </FormProvider>
        <div className="flex w-full justify-center gap-2 py-6">
          <span className="font-regular">Ya tienes cuenta?</span>
          <Link className="font-[700] text-blue-700 hover:underline" href="/">
            Inicia Sesión
          </Link>
        </div>
      </section>
    </section>
  );
};

export default SignUp;
