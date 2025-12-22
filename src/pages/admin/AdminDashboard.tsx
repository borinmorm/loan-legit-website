import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Save, Building, MapPin, FileText, Globe, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useSiteContent } from '@/contexts/SiteContentContext';
import logo from '@/assets/logo.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { content, updateContent } = useSiteContent();
  const [formData, setFormData] = useState(content);

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    });
    navigate('/admin/login');
  };

  const handleSave = () => {
    updateContent(formData);
    toast({
      title: 'Changes Saved',
      description: 'Your changes have been saved successfully.',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getStringValue = (key: string) => {
    const v = (formData as any)[key];
    return typeof v === 'string' ? v : '';
  };

  const sections = [
    {
      title: 'Company Information',
      icon: Building,
      fields: [
        { key: 'companyName', label: 'Company Name', type: 'text' },
        { key: 'tagline', label: 'Tagline', type: 'text' },
        { key: 'email', label: 'Email', type: 'email' },
        { key: 'website', label: 'Website URL', type: 'url' },
      ],
    },
    {
      title: 'Hero Section',
      icon: Globe,
      fields: [
        { key: 'heroTitle', label: 'Hero Title', type: 'text' },
        { key: 'heroSubtitle', label: 'Hero Subtitle', type: 'textarea' },
        { key: 'heroImageUrl', label: 'Hero Image URL (leave empty for default)', type: 'url', placeholder: 'https://example.com/image.jpg' },
      ],
    },
    {
      title: 'About Section',
      icon: FileText,
      fields: [
        { key: 'aboutText', label: 'About Text', type: 'textarea' },
        { key: 'aboutImageUrl', label: 'About Image URL (leave empty for default)', type: 'url', placeholder: 'https://example.com/image.jpg' },
      ],
    },
    {
      title: 'Location & Contact',
      icon: MapPin,
      fields: [
        { key: 'address', label: 'Office Address', type: 'textarea' },
        { key: 'plusCode', label: 'Plus Code', type: 'text' },
        { key: 'googleMapsUrl', label: 'Google Maps URL', type: 'url' },
      ],
    },
    {
      title: 'SEC Registration',
      icon: FileText,
      fields: [
        { key: 'secNumber', label: 'SEC Registration Number', type: 'text' },
        { key: 'certAuthority', label: 'Certificate of Authority', type: 'text' },
        { key: 'registrationDate', label: 'Registration Date', type: 'text' },
        { key: 'secVerifyUrl', label: 'SEC Verification URL', type: 'url' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="THIND AND NANDHA Logo" className="h-10 w-auto" />
            <div>
              <h1 className="font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">Manage site content</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm text-secondary hover:underline">
              View Site →
            </a>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Save button */}
          <div className="flex justify-end">
            <Button variant="hero" onClick={handleSave} className="gap-2">
              <Save className="h-4 w-4" />
              Save All Changes
            </Button>
          </div>

          {/* Form sections */}
          {sections.map((section) => (
            <div key={section.title} className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
                  <section.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              </div>

              <div className="space-y-4">
                {section.fields.map((field) => (
                  <div key={field.key} className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <Textarea
                        value={getStringValue(field.key)}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    ) : (
                      <Input
                        type={field.type}
                        value={getStringValue(field.key)}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        placeholder={'placeholder' in field ? field.placeholder : ''}
                      />
                    )}
                    {field.key.includes('ImageUrl') && typeof (formData as any)[field.key] === 'string' && (
                      <div className="mt-2 rounded-lg overflow-hidden border border-border max-w-xs">
                        <img
                          src={getStringValue(field.key)}
                          alt="Preview"
                          className="w-full h-auto object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Image management tip */}
          <div className="bg-muted/50 rounded-2xl border border-border p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                <Mail className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Image Management Tip</h3>
                <p className="text-sm text-muted-foreground">
                  Paste any public image URL to update Hero and About section images. Use image hosting services like Imgur, Google Drive (public links), or any direct image URLs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
