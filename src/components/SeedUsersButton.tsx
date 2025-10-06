import { useState } from 'react';
import { Button } from './ui/button';
import { Users, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function SeedUsersButton() {
  const [isSeeding, setIsSeeding] = useState(false);

  const seedUsers = async () => {
    setIsSeeding(true);
    try {
      const supabaseUrl = `https://${projectId}.supabase.co`;
      const supabase = createClient(supabaseUrl, publicAnonKey);

      const demoUsers = [
        {
          email: 'student@ndg.com',
          password: 'student123',
          name: 'Alex Student',
          role: 'student'
        },
        {
          email: 'consultant@ndg.com',
          password: 'consultant123',
          name: 'Dr. Sarah Wilson',
          role: 'consultant'
        },
        {
          email: 'instructor@ndg.com',
          password: 'instructor123',
          name: 'Prof. Mike Chen',
          role: 'instructor'
        },
        {
          email: 'member@ndg.com',
          password: 'member123',
          name: 'Jamie Member',
          role: 'member'
        }
      ];

      const createdUsers = [];
      let errors = [];

      for (const userData of demoUsers) {
        try {
          const { data, error } = await supabase.auth.signUp({
            email: userData.email,
            password: userData.password,
            options: {
              data: {
                name: userData.name,
                role: userData.role,
                isActive: true,
                emailVerified: true,
                createdAt: new Date().toISOString()
              }
            }
          });

          if (error) {
            errors.push(`${userData.email}: ${error.message}`);
          } else {
            createdUsers.push({ 
              email: userData.email, 
              name: userData.name, 
              role: userData.role 
            });
          }
        } catch (userError: any) {
          errors.push(`${userData.email}: ${userError.message}`);
        }
      }

      if (createdUsers.length > 0) {
        toast.success(`Demo users created! ${createdUsers.length} users ready to use.`);
        console.log('Demo users created:', createdUsers);
      }

      if (errors.length > 0) {
        console.log('Some users failed to create (they might already exist):', errors);
        toast.info('Some users already exist. You can use existing demo credentials.');
      }

      // Always show available credentials
      setTimeout(() => {
        toast.info('Demo credentials available - check console for details', {
          description: 'student@ndg.com / student123, consultant@ndg.com / consultant123, etc.'
        });
      }, 1000);

    } catch (error: any) {
      console.error('Error seeding users:', error);
      toast.error('Failed to create demo users. You can still try manual registration.');
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      onClick={seedUsers}
      disabled={isSeeding}
      variant="outline"
      size="sm"
      className="gap-2"
    >
      {isSeeding ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating Users...
        </>
      ) : (
        <>
          <Users className="h-4 w-4" />
          Create Demo Users
        </>
      )}
    </Button>
  );
}