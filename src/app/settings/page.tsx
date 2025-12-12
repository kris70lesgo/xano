'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { User, Bell, Lock, CreditCard, Mail, Save } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: 'John Contractor',
    email: 'john@example.com',
    company: 'Contractor Solutions Inc.',
    phone: '+1-555-0123',
    notifications: {
      email_on_new_rfq: true,
      email_on_proposal_viewed: true,
      email_on_won: true,
    },
    payment_terms: '50% deposit, 50% on completion',
    warranty_period: '1 year',
    deposit_percentage: 50,
  });

  const handleSave = () => {
    console.log('Saving settings:', settings);
    // Show success message
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-dark mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account and preferences</p>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Profile Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-dark">Profile Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Full Name"
              value={settings.name}
              onChange={(e) => setSettings({ ...settings, name: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
            <Input
              label="Company Name"
              value={settings.company}
              onChange={(e) => setSettings({ ...settings, company: e.target.value })}
            />
            <Input
              label="Phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-dark">Notifications</h2>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-4 bg-cream rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="font-semibold text-dark">New RFQ Received</span>
              <input
                type="checkbox"
                checked={settings.notifications.email_on_new_rfq}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email_on_new_rfq: e.target.checked }
                })}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-cream rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="font-semibold text-dark">Proposal Viewed by Client</span>
              <input
                type="checkbox"
                checked={settings.notifications.email_on_proposal_viewed}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email_on_proposal_viewed: e.target.checked }
                })}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>
            <label className="flex items-center justify-between p-4 bg-cream rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <span className="font-semibold text-dark">Proposal Accepted</span>
              <input
                type="checkbox"
                checked={settings.notifications.email_on_won}
                onChange={(e) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, email_on_won: e.target.checked }
                })}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>
          </div>
        </Card>

        {/* Proposal Defaults */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-dark">Proposal Defaults</h2>
          </div>

          <div className="space-y-6">
            <Input
              label="Payment Terms"
              value={settings.payment_terms}
              onChange={(e) => setSettings({ ...settings, payment_terms: e.target.value })}
              helperText="Default payment terms for proposals"
            />
            <Input
              label="Warranty Period"
              value={settings.warranty_period}
              onChange={(e) => setSettings({ ...settings, warranty_period: e.target.value })}
              helperText="Standard warranty period offered"
            />
            <Input
              label="Deposit Percentage"
              type="number"
              value={settings.deposit_percentage}
              onChange={(e) => setSettings({ ...settings, deposit_percentage: parseInt(e.target.value) })}
              helperText="Default deposit required (%)"
            />
          </div>
        </Card>

        {/* Integrations */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-dark">Integrations</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
              <div>
                <div className="font-semibold text-dark mb-1">Gmail</div>
                <div className="text-sm text-gray-600">Connected • Forward emails to process RFQs</div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-cream rounded-lg">
              <div>
                <div className="font-semibold text-dark mb-1">Google Calendar</div>
                <div className="text-sm text-gray-600">Not connected</div>
              </div>
              <Button variant="primary" size="sm">Connect</Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button variant="primary" onClick={handleSave}>
            <Save className="w-5 h-5 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
