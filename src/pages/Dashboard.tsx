import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFiles, mockInsights } from '@/lib/mockData';
import { File } from 'lucide-react';
import { BarChart2, AlertTriangle, MessageSquare } from 'lucide-react';

const iconMap = {
  pdf: <File className='w-6 h-6 text-red-500' />,
  word: <File className='w-6 h-6 text-blue-500' />,
  ppt: <File className='w-6 h-6 text-orange-500' />,
  excel: <File className='w-6 h-6 text-green-500' />,
  image: <File className='w-6 h-6 text-purple-500' />,
};

const insightIconMap = {
  summary: <BarChart2 className='w-5 h-5 text-blue-500' />,
  risk: <AlertTriangle className='w-5 h-5 text-red-500' />,
  recommendation: <MessageSquare className='w-5 h-5 text-green-500' />,
  data: <BarChart2 className='w-5 h-5 text-yellow-500' />,
};

export default function Dashboard() {
  return (
    <>
        <h1 className='text-xl font-semibold md:text-2xl'>Dashboard</h1>
          <div className='grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-lg font-medium'>Recent Files</CardTitle>
                <Button size='sm' asChild><Link to='/'>View All</Link></Button>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {mockFiles.slice(0, 4).map((file) => (
                    <Link to={`/documents/${file.id}`} key={file.id} className='block p-2 rounded-lg hover:bg-muted'>
                      <div className='flex items-center justify-between'>
                          <div className='flex items-center gap-3'>
                            {iconMap[file.type as keyof typeof iconMap]}
                              <div>
                                  <p className='font-medium text-sm sm:text-base'>{file.name}</p>
                                  <p className='text-xs sm:text-sm text-muted-foreground'>{file.date} - {file.size}</p>
                              </div>
                          </div>
                          <Badge variant='outline' className='text-xs sm:text-sm'>{file.insights} Insights</Badge>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between pb-2'>
                <CardTitle className='text-lg font-medium'>Latest Insights</CardTitle>
                 <Button size='sm' asChild><Link to='/'>View All</Link></Button>
              </CardHeader>
              <CardContent>
                 <div className='space-y-4'>
                  {mockInsights.map((insight) => (
                     <div key={insight.id} className='flex items-start gap-3 p-2 rounded-lg hover:bg-muted'>
                        {insightIconMap[insight.type as keyof typeof insightIconMap]}
                        <div className='flex-1'>
                             <p className='font-medium text-sm sm:text-base'>{insight.title}</p>
                             <p className='text-xs sm:text-sm text-muted-foreground'>{insight.description}</p>
                        </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
      </>
  );
}