import React, { useCallback, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Spinner,

} from "@material-tailwind/react";
import jwtDecode from "jwt-decode";
import { login } from "@/app/services/auth";
import { snackBar } from "@/utils/snackbar";
import { getBackgroundColor } from "@/utils/general";

export function SignIn() {
  const [username, setUseraname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const payload = {
      username: username,
      password: password
    }

    login(payload).then((data) => {

      if (data) {
        const access = data?.access;
        const token = data?.token;
        localStorage.setItem('token', token);
        localStorage.setItem('access', JSON.stringify(access));
        const decoded = jwtDecode(token);
        const decodedWithColor = Object.assign({ bgColor: getBackgroundColor() }, decoded);
        localStorage.setItem('decoded', JSON.stringify(decodedWithColor));
        window.location.replace('/dashboard');
      } else {
        snackBar('error', data?.errorMessage);
      }

    }).finally(() => {
      setLoading(false);
    })
  }

  const toogleShowPassword = useCallback((e) => {
    e.preventDefault()
    setShowPassword(!showPassword)
  }, [showPassword])

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-tl from-green-900 via-green-300 to-green-900">
      <img
        src='/img/signin-icon.webp'
        className="hidden lg:flex absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-1/2 left-1/2 lg:left-3/4 w-5/6 max-w-[26rem] max-w-xs[22rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="green"
            className="mb-4 grid h-28 place-items-center"          >
            <img src='/img/logos/icon_logo.webp' alt="" width={250} />
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <form className="flex flex-col gap-4" onSubmit={handleLogin}>
              <Input required onChange={(e) => setUseraname(e.target.value)} color='green' type="input" label="Username" size="lg" crossOrigin={undefined} />
              <div className="input-login">
                <Input required onChange={(e) => setPassword(e.target.value)} color='green' type={showPassword ? "input" : "password"} label="Password" size="lg" crossOrigin={undefined} />
                <button onClick={(e) => toogleShowPassword(e)}>
                  {showPassword ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  }
                </button>
              </div>
              <Typography color="blue-gray" className={'text-xs'}>
                Forgot Password? {' '}
                <a href={'reset-password'} color="green" className="hover:underline font-medium hover:text-green-500"> Reset Password</a>
              </Typography>

              <Button type={'submit'} disabled={loading || !password || !username} onClick={handleLogin} className={'flex justify-center mt-2'} variant="gradient" fullWidth color="green">
                {loading ? <Spinner color="green" /> : 'Sign In'}
              </Button>
            </form>

          </CardBody>
        </Card>
      </div>
    </div>
  );
}