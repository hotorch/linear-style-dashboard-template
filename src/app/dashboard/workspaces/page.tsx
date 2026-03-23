import { PageContainer } from '@/widgets/app-shell';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/shared/ui/card';
import { workspacesInfoContent } from '@/shared/config/infoconfig';
import { Building2 } from 'lucide-react';

const mockWorkspaces = [
  { id: '1', name: 'My Workspace', role: 'Owner' },
  { id: '2', name: 'Team Project', role: 'Member' }
];

export default function WorkspacesPage() {
  return (
    <PageContainer
      pageTitle='Workspaces'
      pageDescription='Manage your workspaces and switch between them'
      infoContent={workspacesInfoContent}
    >
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {mockWorkspaces.map((workspace) => (
          <Card key={workspace.id} className='hover:bg-accent cursor-pointer'>
            <CardHeader className='flex flex-row items-center gap-4'>
              <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-lg'>
                <Building2 className='text-primary h-6 w-6' />
              </div>
              <div>
                <CardTitle className='text-lg'>{workspace.name}</CardTitle>
                <CardDescription>{workspace.role}</CardDescription>
              </div>
            </CardHeader>
          </Card>
        ))}
        <Card className='hover:bg-accent cursor-pointer border-dashed'>
          <CardContent className='flex h-full min-h-[100px] items-center justify-center'>
            <p className='text-muted-foreground text-sm'>+ Create Workspace</p>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
