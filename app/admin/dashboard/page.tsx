'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  content: string;
  approved: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  banned: boolean;
}

export default function AdminDashboard() {
  const [tab, setTab] = useState('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [postsRes, usersRes] = await Promise.all([
        fetch('/api/admin/get-all-posts'),
        fetch('/api/admin/get-all-users'),
      ]);
      const postsData = await postsRes.json();
      const usersData = await usersRes.json();
      setPosts(postsData);
      setUsers(usersData);
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleApprovePost(id: string) {
    const res = await fetch(`/api/admin/posts/${id}/approve`, { method: 'PATCH' });
    if (res.ok) {
      setPosts(posts.map(p => (p.id === id ? { ...p, approved: true } : p)));
      toast.success('Post approved');
    }
  }

  async function handleDeletePost(id: string) {
    const res = await fetch(`/api/admin/delete-post?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Post deleted');
    }
  }

  async function handleToggleBanUser(id: string) {
    const res = await fetch(`/api/admin/delete-user?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setUsers(users.map(u => (u.id === id ? { ...u, banned: !u.banned } : u)));
      toast.success('User status DELETED');
    }
  }
  

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          {loading ? (
            <p>Loading posts...</p>
          ) : posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            <div className="grid gap-4 mt-4">
              {posts.map(post => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-lg font-semibold">{post.title}</h2>
                        <p>{post.content}</p>
                        <div className="mt-2">
                          {post.approved ? (
                            <Badge variant="default">Approved</Badge>
                          ) : (
                            <Badge variant="destructive">Pending</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {!post.approved && (
                          <Button
                            onClick={() => handleApprovePost(post.id)}
                            size="sm"
                            variant="outline"
                          >
                            Approve
                          </Button>
                        )}
                        <Button
                          onClick={() => handleDeletePost(post.id)}
                          size="sm"
                          variant="destructive"
                        >
                          Delete
                        </Button>
                        <Button
                          
                          size="sm"
                          variant="secondary"
                        >
                          <Link href={`/admin/blogs/${post.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="users">
          {loading ? (
            <p>Loading users...</p>
          ) : users.length === 0 ? (
            <p>No users available.</p>
          ) : (
            <div className="grid gap-4 mt-4">
              {users.map(user => (
                <Card key={user.id}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h2 className="font-semibold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      <div className="mt-1">
                        {user.banned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : (
                          <Badge variant="default">Active</Badge>
                        )}
                      </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                    <Button
                      onClick={() => handleToggleBanUser(user.id)}
                      variant={user.banned ? 'outline' : 'destructive'}
                      size="sm"
                    >Delete
                      
                    </Button>
                    <Button
                      
                      variant="outline"
                      size="sm"
                    ><Link href={`/admin/users/${user.id}`}>View</Link>
                      
                    </Button>
                    </div>
                    
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
  <div className="space-y-6 mt-4">
    <h3 className="text-2xl font-semibold">Settings</h3>

    {/* Site Title and Description */}
    <div className="space-y-4">
      <h4 className="text-lg">Site Information</h4>
      <div>
        <label htmlFor="site-title" className="block text-sm font-medium">Site Title</label>
        <input
          type="text"
          id="site-title"
          className="mt-2 p-2 border rounded-md w-full"
          defaultValue="My Awesome Site"
        />
      </div>

      <div>
        <label htmlFor="site-description" className="block text-sm font-medium">Site Description</label>
        <textarea
          id="site-description"
          className="mt-2 p-2 border rounded-md w-full"
          rows={3}
          defaultValue="A place to share awesome content"
        />
      </div>
    </div>

    {/* About Us Section */}
    <div className="space-y-4">
      <h4 className="text-lg">About Us</h4>
      <div>
        <label htmlFor="about-title" className="block text-sm font-medium">Title</label>
        <input
          type="text"
          id="about-title"
          className="mt-2 p-2 border rounded-md w-full"
          defaultValue="Welcome to My Awesome Site"
        />
      </div>

      <div>
        <label htmlFor="about-description" className="block text-sm font-medium">Description</label>
        <textarea
          id="about-description"
          className="mt-2 p-2 border rounded-md w-full"
          rows={4}
          defaultValue="We are passionate about providing a space for great content and connecting people with similar interests. Explore our site and enjoy the experience."
        />
      </div>
    </div>

    {/* Contact Us Section */}
    <div className="space-y-4">
      <h4 className="text-lg">Contact Us</h4>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          id="contact-email"
          className="mt-2 p-2 border rounded-md w-full"
          defaultValue="contact@awesome-site.com"
        />
      </div>

      <div>
        <label htmlFor="contact-phone" className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          id="contact-phone"
          className="mt-2 p-2 border rounded-md w-full"
          defaultValue="+1 (234) 567-890"
        />
      </div>
    </div>

    {/* Maintenance Mode Toggle */}
    <div className="space-y-4">
      <h4 className="text-lg">Maintenance Mode</h4>
      <div>
        <label htmlFor="maintenance-toggle" className="block text-sm font-medium">Enable Maintenance Mode</label>
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="maintenance-toggle"
            className="mr-2"
            checked={isMaintenanceMode}
            onChange={() => setIsMaintenanceMode(!isMaintenanceMode)}
          />
          <span>{isMaintenanceMode ? "Site is in Maintenance Mode" : "Site is live"}</span>
        </div>
      </div>

      {isMaintenanceMode && (
        <div className="mt-4 p-2 bg-yellow-200 text-yellow-800 border border-yellow-500 rounded-md">
          <p>Warning: The site is currently in maintenance mode. Users will not be able to access the site until it is back online.</p>
        </div>
      )}
    </div>

    {/* Save Settings Button */}
    <div className="flex justify-end mt-4">
      <Button variant="outline">Save Settings</Button>
    </div>
  </div>
</TabsContent>

      </Tabs>
    </div>
  );
}
