import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';

export default function Chat() {
  return (
    <div className='flex flex-col h-full'>
         <h1 className='text-xl font-semibold md:text-2xl mb-4 flex-shrink-0'>Chat with your documents</h1>
        <div className='flex-1 overflow-y-auto p-4 bg-muted/40 rounded-lg space-y-4'>
            <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold flex-shrink-0'>U</div>
                <div className='bg-background p-3 rounded-lg max-w-[80%]'>
                    <p>What are the key risks in the Q4 financial report?</p>
                </div>
            </div>
             <div className='flex items-start gap-3 justify-end'>
                <div className='bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%]'>
                    <p>The Q4 financial report highlights a 15% YoY revenue increase, but a 2% decrease in net profit margin. The main risk identified is increased market competition.</p>
                </div>
                 <div className='w-8 h-8 rounded-full bg-background flex items-center justify-center font-bold flex-shrink-0 border'>A</div>
            </div>
        </div>
        <div className='mt-4 flex items-center gap-2 flex-shrink-0'>
            <Input placeholder='Ask a question...' />
            <Button size='icon' aria-label='Send message'>
                <Send className='w-4 h-4' />
            </Button>
        </div>
    </div>
  );
}