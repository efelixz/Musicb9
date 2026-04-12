'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'

const registerSchema = z.object({
  fullName: z.string().min(3, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
})

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = (data: any) => {
    console.log('Register attempt:', data)
  }

  return (
    <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Criar sua conta</h2>
        <p className="mt-2 text-sm text-gray-600">
          Junte-se à revolução da música com IA.
        </p>
      </div>
      <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            {...register('fullName')}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.fullName && <p className="mt-1 text-xs text-red-500">{(errors.fullName as any).message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email')}
            type="email"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{(errors.email as any).message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            {...register('password')}
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-xs text-red-500">{(errors.password as any).message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirmar Senha</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          />
          {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{(errors.confirmPassword as any).message}</p>}
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Criar conta
          </button>
        </div>
      </form>
      <div className="text-center text-sm">
        <span className="text-gray-600">Já tem uma conta? </span>
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Fazer login
        </Link>
      </div>
    </div>
  )
}
