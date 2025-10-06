import { useEffect, useState } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { adminAPI } from '../../../lib/mock-api';
import { Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import { Badge } from '../../ui/badge';
import { toast } from 'sonner@2.0.3';

export function AdminContentView() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const { blogs: blogData } = await adminAPI.getBlogs();
      setBlogs(blogData);
    } catch (error) {
      console.error('Failed to load blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await adminAPI.deleteBlog(blogId);
      setBlogs(blogs.filter((b) => b.id !== blogId));
      toast.success('Blog deleted successfully');
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Content Management
          </h1>
          <p className="text-muted-foreground">Manage blog posts and pages</p>
        </div>
        <Button className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Blog Post
        </Button>
      </div>

      <Card className="border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Author</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Views</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Published</th>
                <th className="text-right p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b border-border last:border-0 hover:bg-muted-bg/50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{blog.title}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">{blog.excerpt}</p>
                    </div>
                  </td>
                  <td className="p-4 text-sm">{blog.author}</td>
                  <td className="p-4">
                    <Badge
                      className={blog.status === 'published' ? 'bg-green-500' : 'bg-gray-500'}
                    >
                      {blog.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-sm">{blog.views?.toLocaleString() || 0}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString()
                      : '-'}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
