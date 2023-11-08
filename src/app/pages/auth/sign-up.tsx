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
import { login, resetPasswordEmail, resetPasswordPin } from "@/app/services/auth";
import { snackBar } from "@/utils/snackbar";
import { emailValidation, getBackgroundColor } from "@/utils/general";
import OtpInput from 'react-otp-input';

export function SignUp () {
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [otp, setOtp] = React.useState<string>('');
  const [newPassword, setNewPassword] = React.useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');
  const [isPin, setIsPin] = React.useState<boolean>(false);
  const [errorRePassword, setErrorRePassword] = React.useState<boolean>(false);
  const [errorEmail, setErrorEmail] = React.useState<boolean>(false);

  const handleResetSendEmail = async () => {
    setLoading(true);
    if(emailValidation(email)) {
      const payload = {
        email
      };

      try {
        const response = await resetPasswordEmail(payload);
        if(response) {
          setIsPin(true);
        }
        snackBar('success', response);
      } catch(e) {
        console.log('e', e);
      }
      

    } else {
      snackBar('error', 'Email not valid');
      setErrorEmail(true);
    }

    setLoading(false);
      
  }

  const handleSetPin = async () => {
    setLoading(true);
    if(newPassword === confirmNewPassword){
      const payload = {
        pin: otp,
        password: confirmNewPassword
      }

      const response = await resetPasswordPin(payload);
      if(response){
        snackBar('success', 'Success Reset Password');
        setTimeout(() => {
          window.location.replace('/signin');
        }, 1000);

      }
        
    } else {
      snackBar('error', 'Password Not same');
      setErrorRePassword(true);
    }

    setLoading(false);
  }

  React.useEffect(() => {
    if(email.length > 0)
      setErrorEmail(false)
    if(confirmNewPassword.length > 0)
      setErrorRePassword(false)
  },[confirmNewPassword, email])

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
              {isPin ? (
                <>
                  <Input value={newPassword} type="password" required onChange={(e) => setNewPassword(e.target.value)} color='green' label="New Password" size="lg" crossOrigin={undefined} /> 
                  <Input error={errorRePassword} type="password" value={confirmNewPassword} required onChange={(e) => setConfirmNewPassword(e.target.value)} color='green' label="Confirm New Password" size="lg" crossOrigin={undefined} /> 
                  <text className={'text-sm'}>
                    {'Input PIN'}
                  </text>  
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    inputStyle={{
                      border: "1px solid green",
                      borderRadius: "8px",
                      width: "54px",
                      height: "54px",
                      fontSize: "12px",
                      color: "#000",
                      fontWeight: "400",
                      caretColor: "green"
                    }}
                    renderSeparator={<span style={{ width: "8px" }}></span>}
                    renderInput={(props) => <input {...props} />}
                  />         
                </>
              ): (
                <Input error={errorEmail} value={email} required onChange={(e) => setEmail(e.target.value)} color='green' type="input" label="Email" size="lg" crossOrigin={undefined} />
              )} 
              <Button type={'submit'} disabled={loading || !email} onClick={isPin ? handleSetPin : handleResetSendEmail} className={'flex justify-center mt-2'} variant="gradient" fullWidth color="green">
                {loading ? <Spinner color="green" /> : 'Send' } 
              </Button>
            
          </CardBody>
        </Card>
      </div>
    </div>
  );
}