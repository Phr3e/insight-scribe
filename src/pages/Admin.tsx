import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const users = [
  { id: 1, name: 'Jina Mtu', email: 'jina@domain.com', role: 'Admin', status: 'Active' },
  { id: 2, name: 'Sana Wanjala', email: 'sana@domain.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Baraka Chumo', email: 'baraka@domain.com', role: 'User', status: 'Invited' },
];

export default function Admin() {
  return (
    <div>
        <h1 className='text-xl font-semibold md:text-2xl mb-4'>Admin Panel</h1>
        <Card>
            <CardHeader>
                <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
                <div className='overflow-x-auto'>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead className='hidden sm:table-cell'>Email</TableHead>
                                <TableHead className='hidden md:table-cell'>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map(user => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell className='hidden sm:table-cell'>{user.email}</TableCell>
                                    <TableCell className='hidden md:table-cell'>{user.role}</TableCell>
                                    <TableCell><Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>{user.status}</Badge></TableCell>
                                    <TableCell>
                                        <Button variant='outline' size='sm'>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}