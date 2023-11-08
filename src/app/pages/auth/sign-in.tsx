import React, { useState } from "react";
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

export function SignIn () {
  const [username, setUseraname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
              <Input required onChange={(e) => setPassword(e.target.value)} color='green' type="password" label="Password" size="lg" crossOrigin={undefined} />
              <Typography color="blue-gray" className={'text-xs'}>
                Forgot Password? {' '}
                <a href={'reset-password'} color="green" className="hover:underline font-medium hover:text-green-500"> Reset Password</a>
              </Typography>

              <Button type={'submit'} disabled={loading || !password || !username} onClick={handleLogin} className={'flex justify-center mt-2'} variant="gradient" fullWidth color="green">
                {loading ? <Spinner color="green" /> : 'Sign In' } 
              </Button>
            </form>
            
          </CardBody>
        </Card>
      </div>
    </div>
  );
}