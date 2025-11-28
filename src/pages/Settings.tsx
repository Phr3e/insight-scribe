import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, CheckCircle } from 'lucide-react';

const plans = [
  {
    name: 'Individual',
    price: 'Free',
    features: [
      'Dashboard access',
      'File uploads',
      'AI reports',
      'Visualizations',
      'Shareable public links',
    ],
    cta: 'Current Plan',
    current: true,
  },
  {
    name: 'Business',
    price: '$49/mo',
    features: [
      'All Individual features',
      'Team management',
      'Database integrations',
      'Shared dashboards',
      'Role-based permissions',
      'Auto updates',
    ],
    cta: 'Upgrade',
  },
  {
    name: 'Enterprise',
    price: 'Contact Us',
    features: [
      'Everything in Business',
      'Custom integrations',
      'Dedicated support',
      'Onboarding services',
      'Custom connections',
    ],
    cta: 'Contact Sales',
  },
];

const skillLevels = [
  {
    name: 'Beginner',
    description: 'For those comfortable with Python basics who want to practice python and pandas fundamentals for data analytics.',
    topics: ['Python Basics', 'Control Flow', 'Data Structures', 'Pandas Essentials'],
  },
  {
    name: 'Intermediate',
    description: 'For those ready to contribute to more advanced Python & Pandas tools.',
    topics: ['Functions & Comprehensions', 'Data Structures & Utilities', 'Text and Time Processing', 'Pandas Transformations', 'Advanced Data Handling'],
  },
  {
    name: 'Expert',
    description: 'For those confident in structuring code, cleaning and transforming data, and building complete analysis solutions.',
    topics: ['Modular programming', 'Analytics', 'Functions Design', 'Requirement Analysis', 'Data preparation', 'Feature Engineering', 'Data Handling & Cleaning'],
  },
];

export default function Settings() {
  const [selectedSkill, setSelectedSkill] = useState('Beginner');

  return (
    <div>
      <h1 className='text-xl font-semibold md:text-2xl mb-4'>Settings</h1>
      <Tabs defaultValue='profile' className='w-full'>
        <div className='overflow-x-auto'>
          <TabsList className='inline-flex w-full sm:w-auto'>
            <TabsTrigger value='profile'>Profile</TabsTrigger>
            <TabsTrigger value='organization'>Organization</TabsTrigger>
            <TabsTrigger value='billing'>Billing</TabsTrigger>
            <TabsTrigger value='skills'>Skill Level</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value='profile' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your personal account settings.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='name'>Name</Label>
                <Input id='name' defaultValue='Jina Mtu' />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='email'>Email</Label>
                <Input id='email' type='email' defaultValue='m@example.com' />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='organization' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Manage your organization settings.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
               <div className='space-y-2'>
                <Label htmlFor='org-name'>Organization Name</Label>
                <Input id='org-name' defaultValue='SomaScribe Inc.' />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='billing' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Billing</CardTitle>
              <CardDescription>Manage your billing and subscription. You are currently on the <strong>Individual Plan</strong>.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {plans.map((plan) => (
                  <Card key={plan.name} className={`flex flex-col ${plan.current ? 'border-primary' : ''}`}>
                    <CardHeader>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription className='text-4xl font-bold'>{plan.price}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex-grow space-y-4'>
                      <ul className='space-y-2'>
                        {plan.features.map((feature) => (
                          <li key={feature} className='flex items-center'>
                            <Check className='h-4 w-4 text-green-500 mr-2' />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className='p-6 pt-0'>
                       <Button className='w-full' disabled={plan.current}>{plan.cta}</Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='skills' className='mt-4'>
          <Card>
            <CardHeader>
              <CardTitle>Select Your Skill Level</CardTitle>
              <CardDescription>Choose the level that best describes your current abilities.</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {skillLevels.map((level) => (
                  <Card key={level.name} onClick={() => setSelectedSkill(level.name)} className={`flex flex-col cursor-pointer ${selectedSkill === level.name ? 'border-primary' : ''}`}>
                    <CardHeader>
                      <CardTitle className='flex items-center justify-between'>
                        {level.name}
                        {selectedSkill === level.name && <CheckCircle className='h-6 w-6 text-primary' />}
                      </CardTitle>
                      <CardDescription>{level.description}</CardDescription>
                    </CardHeader>
                    <CardContent className='flex-grow space-y-4'>
                      <p className='font-semibold'>TOPICS COVERED</p>
                      <ul className='space-y-2 list-disc pl-5'>
                        {level.topics.map((topic) => (
                          <li key={topic}>{topic}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
               <Button>Save Skill Level</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}