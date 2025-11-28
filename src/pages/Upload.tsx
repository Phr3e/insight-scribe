import { useState, ChangeEvent, FormEvent } from 'react';
import { UploadCloud, File, Database, Warehouse, Server, HardDrive } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Field {
  name: string;
  label: string;
  type: string;
  placeholder: string;
}

interface ConnectionFormProps {
  serviceName: string;
  fields: Field[];
}

type FormState = {
  [key: string]: string;
};

const ConnectionForm = ({ serviceName, fields }: ConnectionFormProps) => {
  const [formState, setFormState] = useState<FormState>(
    fields.reduce((acc: FormState, field: Field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.loading(`Connecting to ${serviceName}...`);
    console.log(`Connecting to ${serviceName} with:`, formState);

    // Simulate API call
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate
      if (isSuccess) {
        toast.success(`Successfully connected to ${serviceName}!`);
      } else {
        toast.error(`Failed to connect to ${serviceName}. Please check your credentials.`);
      }
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4 max-w-lg mx-auto'>
      {fields.map((field) => (
        <div key={field.name} className='grid gap-2'>
          <Label htmlFor={field.name}>{field.label}</Label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={formState[field.name]}
              onChange={handleChange}
              required
              className='flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
            />
          ) : (
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={formState[field.name]}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}
      <Button type='submit' className='w-full'>Connect to {serviceName}</Button>
    </form>
  );
};

const databaseFields: Field[] = [
  { name: 'host', label: 'Host', type: 'text', placeholder: 'e.g., localhost' },
  { name: 'port', label: 'Port', type: 'number', placeholder: 'e.g., 5432' },
  { name: 'user', label: 'Username', type: 'text', placeholder: 'e.g., admin' },
  { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
  { name: 'database', label: 'Database Name', type: 'text', placeholder: 'e.g., production_db' },
];

const bigQueryFields: Field[] = [
    { name: 'projectId', label: 'Project ID', type: 'text', placeholder: 'your-gcp-project-id' },
    { name: 'datasetId', label: 'Dataset ID', type: 'text', placeholder: 'your_dataset_id' },
    { name: 'keyfile', label: 'Service Account Key (JSON)', type: 'textarea', placeholder: 'Paste your JSON key file content here' },
];

const redshiftFields: Field[] = [
    { name: 'clusterId', label: 'Cluster Identifier', type: 'text', placeholder: 'your-redshift-cluster-id' },
    { name: 'database', label: 'Database Name', type: 'text', placeholder: 'your_database' },
    { name: 'dbUser', label: 'Database User', type: 'text', placeholder: 'your_db_user' },
    { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
    { name: 'serverlessWorkgroup', label: 'Serverless Workgroup', type: 'text', placeholder: 'your-workgroup-name (optional)' },
];


export default function Upload() {
  return (
    <div>
      <h1 className='text-xl font-semibold md:text-2xl'>Upload Document</h1>
      <div className='mt-8'>
        <Tabs defaultValue='files' className='w-full'>
          <TabsList className='grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10'>
            <TabsTrigger value='files' className='flex-col sm:flex-row gap-2'><File className='w-4 h-4'/> Files</TabsTrigger>
            <TabsTrigger value='databases' className='flex-col sm:flex-row gap-2'><Database className='w-4 h-4'/> Databases</TabsTrigger>
            <TabsTrigger value='warehouses' className='flex-col sm:flex-row gap-2'><Warehouse className='w-4 h-4'/> Warehouses</TabsTrigger>
          </TabsList>
          <TabsContent value='files'>
            <div className='flex items-center justify-center w-full mt-4'>
              <label
                htmlFor='dropzone-file'
                className='flex flex-col items-center justify-center w-full min-h-[300px] border-2 border-dashed rounded-lg cursor-pointer bg-muted hover:bg-muted/80 p-4 text-center'
              >
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <UploadCloud className='w-10 h-10 mb-4 text-muted-foreground' />
                  <p className='mb-2 text-sm text-muted-foreground
                  '>
                    <span className='font-semibold'>Click to upload</span> or drag and drop
                  </p>
                  <p className='text-xs text-muted-foreground'>CSV, XLSX, PDF, Word, PPT, or Image</p>
                </div>
                <input id='dropzone-file' type='file' className='hidden' />
              </label>
            </div>
          </TabsContent>
          <TabsContent value='databases'>
             <Tabs defaultValue='mysql' className='w-full mt-4'>
                <TabsList className='grid w-full grid-cols-1 sm:grid-cols-2 h-auto sm:h-10'>
                    <TabsTrigger value='mysql' className='flex-col sm:flex-row gap-2'><Server className='w-4 h-4'/> MySQL</TabsTrigger>
                    <TabsTrigger value='postgresql' className='flex-col sm:flex-row gap-2'><HardDrive className='w-4 h-4'/> PostgreSQL</TabsTrigger>
                </TabsList>
                <TabsContent value='mysql' className='p-4 border rounded-md mt-4'>
                    <ConnectionForm serviceName='MySQL' fields={databaseFields} />
                </TabsContent>
                <TabsContent value='postgresql' className='p-4 border rounded-md mt-4'>
                    <ConnectionForm serviceName='PostgreSQL' fields={databaseFields} />
                </TabsContent>
             </Tabs>
          </TabsContent>
          <TabsContent value='warehouses'>
            <Tabs defaultValue='bigquery' className='w-full mt-4'>
                <TabsList className='grid w-full grid-cols-1 sm:grid-cols-2 h-auto sm:h-10'>
                    <TabsTrigger value='bigquery' className='flex-col sm:flex-row gap-2'><Server className='w-4 h-4'/> BigQuery</TabsTrigger>
                    <TabsTrigger value='redshift' className='flex-col sm:flex-row gap-2'><HardDrive className='w-4 h-4'/> Redshift Serverless</TabsTrigger>
                </TabsList>
                <TabsContent value='bigquery' className='p-4 border rounded-md mt-4'>
                    <ConnectionForm serviceName='BigQuery' fields={bigQueryFields} />
                </TabsContent>
                <TabsContent value='redshift' className='p-4 border rounded-md mt-4'>
                    <ConnectionForm serviceName='Redshift Serverless' fields={redshiftFields} />
                </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 