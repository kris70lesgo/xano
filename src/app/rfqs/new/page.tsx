'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '../../../components/layout/DashboardLayout';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { ArrowLeft, Mail, FileText, Sparkles, Loader2 } from 'lucide-react';

export default function NewRFQPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [aiParsing, setAiParsing] = useState(false);
  const [method, setMethod] = useState<'email' | 'manual'>('email');
  
  const [formData, setFormData] = useState({
    emailContent: '',
    clientName: '',
    clientEmail: '',
    projectType: '',
    budgetMin: '',
    budgetMax: '',
    timeline: '',
    scope: '',
  });

  const handleAIParse = async () => {
    if (!formData.emailContent.trim()) return;
    
    setAiParsing(true);
    try {
      console.log('Parsing email with AI...');
      const response = await fetch('/api/parse-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_body: formData.emailContent,
          email_subject: 'RFQ Request',
        }),
      });

      console.log('Parse response:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('Parsed data:', data);
        
        if (data.success) {
          setFormData(prev => ({
            ...prev,
            clientName: data.parsed_data?.client_name || '',
            clientEmail: data.parsed_data?.client_email || '',
            projectType: data.parsed_data?.project_type || '',
            budgetMin: data.parsed_data?.budget_range?.min?.toString() || '',
            budgetMax: data.parsed_data?.budget_range?.max?.toString() || '',
            timeline: data.parsed_data?.timeline || '',
            scope: data.parsed_data?.scope_of_work || '',
          }));
          setMethod('manual');
        } else {
          throw new Error(data.error || 'Parsing failed');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
      }
    } catch (error) {
      console.error('AI parsing error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to parse email: ${errorMessage}\n\nPlease check your OpenRouter API key and try again, or use manual entry.`);
    } finally {
      setAiParsing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock creation - in real app, call your Xano API
      await new Promise(resolve => setTimeout(resolve, 1000));
      router.push('/dashboard');
    } catch (error) {
      console.error('Error creating RFQ:', error);
      alert('Failed to create RFQ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-dark">Create New RFQ</h1>
            <p className="text-gray-600">Parse email with AI or enter details manually</p>
          </div>
        </div>

        {/* Method Selection */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setMethod('email')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              method === 'email'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Mail className={`w-6 h-6 mx-auto mb-2 ${method === 'email' ? 'text-primary' : 'text-gray-400'}`} />
            <div className="font-semibold text-dark">Parse Email with AI</div>
            <div className="text-xs text-gray-500 mt-1">Let AI extract details</div>
          </button>
          <button
            onClick={() => setMethod('manual')}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              method === 'manual'
                ? 'border-primary bg-primary/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className={`w-6 h-6 mx-auto mb-2 ${method === 'manual' ? 'text-primary' : 'text-gray-400'}`} />
            <div className="font-semibold text-dark">Manual Entry</div>
            <div className="text-xs text-gray-500 mt-1">Enter details yourself</div>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {method === 'email' && (
            <Card className="p-6 mb-6">
              <h3 className="text-lg font-bold text-dark mb-4">Paste Email Content</h3>
              <textarea
                value={formData.emailContent}
                onChange={(e) => setFormData({ ...formData, emailContent: e.target.value })}
                placeholder="Paste the RFQ email content here..."
                className="w-full h-64 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary transition-colors resize-none font-mono text-sm"
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleAIParse}
                disabled={!formData.emailContent.trim() || aiParsing}
                className="mt-4"
              >
                {aiParsing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Parsing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Parse with AI
                  </>
                )}
              </Button>
            </Card>
          )}

          {method === 'manual' && (
            <>
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-bold text-dark mb-4">Client Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client Name *
                    </label>
                    <Input
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Client Email *
                    </label>
                    <Input
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6">
                <h3 className="text-lg font-bold text-dark mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Project Type *
                    </label>
                    <Input
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      placeholder="Kitchen Renovation, Plumbing Repair, etc."
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Min ($)
                      </label>
                      <Input
                        type="number"
                        value={formData.budgetMin}
                        onChange={(e) => setFormData({ ...formData, budgetMin: e.target.value })}
                        placeholder="5000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Budget Max ($)
                      </label>
                      <Input
                        type="number"
                        value={formData.budgetMax}
                        onChange={(e) => setFormData({ ...formData, budgetMax: e.target.value })}
                        placeholder="15000"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Timeline
                    </label>
                    <Input
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      placeholder="2-3 weeks, ASAP, etc."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Scope of Work *
                    </label>
                    <textarea
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                      placeholder="Describe the work to be done..."
                      className="w-full h-32 px-4 py-3 rounded-lg border-2 border-gray-200 focus:outline-none focus:border-primary transition-colors resize-none"
                      required
                    />
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/dashboard')}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create RFQ'
                  )}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </DashboardLayout>
  );
}
