import React from 'react'
import { useState } from 'react'
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {
    Code,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
  } from "lucide-react";
  import { Link } from 'react-router-dom'
  import {z} from "zod"
  import AuthImagePattern from "../Components/AuthImagePattern"

  //Creating zod Schema for the verifcation having form validation

  const RegisterSchema= z.object({
    email:z.string().email("Enter valid email"),
    password:z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number"
    ),
    username:z.string().min(3,"Name must be alteast 3 character")
  })

const Register = () => {
    const [showPassword, setShowPassword]=useState(false)
    const {
        register,
        handleSubmit,
        formState:{errors}}
        =useForm({resolver:zodResolver(RegisterSchema)})

    const onSubmit= async(data)=>{
        console.log(data)
    }    
  return (
    <div className='h-screen grid lg:grid-cols-2'>
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
    <div className="w-full max-w-md space-y-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <div className="flex flex-col items-center gap-2 group">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Code className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Welcome </h1>
          <p className="text-base-content/60">Sign Up to your account</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Name</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Code className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type="text"
              {...register("username")}
              className={`input input-bordered w-full pl-10 ${
                errors.username ? "input-error" : ""
              }`}
              placeholder="John Doe"
            />
          </div>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}              
        </div>

        {/* Email */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Email</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type="email"
              {...register("email")}
              className={`input input-bordered w-full pl-10 ${
                errors.email ? "input-error" : ""
              }`}
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">Password</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-base-content/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`input input-bordered w-full pl-10 ${
                errors.password ? "input-error" : ""
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-base-content/40" />
              ) : (
                <Eye className="h-5 w-5 text-base-content/40" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
        >Submit
        </button>
      </form>

      {/* Footer */}
      <div className="text-center">
        <p className="text-base-content/60">
          Already have an account?{" "}
          <Link to="/login" className="link link-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  </div>

   {/* Right Side - Image/Pattern */}
  <AuthImagePattern
    title={"Welcome to our platform!"}
    subtitle={
      "Sign up to access our platform and start using our services."
    }
  />
</div>
  )
}

export default Register