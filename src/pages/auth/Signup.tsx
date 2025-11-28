import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Signup() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4'>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <Card className='mx-auto max-w-sm w-full'>
        <CardHeader>
          <div className='flex justify-center mb-4'>
            <img src='https://storage.googleapis.com/dala-prod-public-storage/generated-images/03ebbed2-8ce6-43b7-a1d5-e3d7d802c70d/logo-5nvhmli-1764327060471.webp' alt='SomaScribe Logo' className='w-24 h-24' />
          </div>
          <CardTitle className='text-2xl text-center'>Create an account</CardTitle>
          <CardDescription className='text-center'>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor='full-name'>Full Name</Label>
              <Input id='full-name' placeholder='Jina Mtu' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='email'>Email</Label>
              <Input id='email' type='email' placeholder='m@example.com' required />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input id='password' type='password' required />
            </div>
            <Button type='submit' className='w-full'>
              Create account
            </Button>
            <Button variant='outline' className='w-full'>
              Sign up with Google
            </Button>
          </div>
          <div className='mt-4 text-center text-sm'>
            Already have an account?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}