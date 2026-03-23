import { PageContainer } from '@/widgets/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { Avatar, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { teamInfoContent } from '@/shared/config/infoconfig';

const mockMembers = [
  { id: '1', name: 'Dev User', email: 'dev@example.com', role: 'Owner' },
  { id: '2', name: 'Jane Doe', email: 'jane@example.com', role: 'Admin' },
  { id: '3', name: 'John Smith', email: 'john@example.com', role: 'Member' }
];

export default function TeamPage() {
  return (
    <PageContainer
      pageTitle='Team Management'
      pageDescription='Manage your workspace team, members, roles, security and more.'
      infoContent={teamInfoContent}
    >
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage your team members and their roles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {mockMembers.map((member) => (
              <div
                key={member.id}
                className='flex items-center justify-between rounded-lg border p-4'
              >
                <div className='flex items-center gap-4'>
                  <Avatar>
                    <AvatarFallback>
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className='font-medium'>{member.name}</p>
                    <p className='text-muted-foreground text-sm'>
                      {member.email}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={member.role === 'Owner' ? 'default' : 'secondary'}
                >
                  {member.role}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
