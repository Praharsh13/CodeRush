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

  const LoginSchema=z.Schema({
    email:z.string().email("Enter valid email")
  })

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login