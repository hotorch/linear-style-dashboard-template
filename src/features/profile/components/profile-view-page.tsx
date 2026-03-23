import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';

const mockUser = {
  fullName: 'Dev User',
  email: 'dev@example.com'
};

export default function ProfileViewPage() {
  return (
    <div className='flex w-full flex-col gap-6 p-4'>
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Manage your profile settings</CardDescription>
        </CardHeader>
        <CardContent className='flex items-center gap-4'>
          <Avatar className='h-20 w-20'>
            <AvatarFallback className='text-2xl'>DU</AvatarFallback>
          </Avatar>
          <div>
            <h3 className='text-lg font-semibold'>{mockUser.fullName}</h3>
            <p className='text-muted-foreground text-sm'>{mockUser.email}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
