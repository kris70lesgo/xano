'use client';

import React from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Check, Zap, Shield, Star } from 'lucide-react';

export default function PricingPage() {
    const plans = [
        {
            name: 'Starter',
            price: '$49',
            period: '/month',
            description: 'Perfect for independent contractors',
            features: [
                '50 AI-Parsed RFQs / mo',
                'Basic Pricing Engine',
                'Standard Proposals',
                'Email Support'
            ],
            cta: 'Get Started',
            popular: false
        },
        {
            name: 'Professional',
            price: '$99',
            period: '/month',
            description: 'For growing contracting businesses',
            features: [
                'Unlimited AI-Parsed RFQs',
                'Advanced Pricing Rules',
                'Custom Branding',
                'Priority Support',
                'Analytics Dashboard'
            ],
            cta: 'Start Free Trial',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            description: 'For large firms and agencies',
            features: [
                'Custom Integration',
                'Dedicated Account Manager',
                'SLA Support',
                'Multi-User Access',
                'White Labeling'
            ],
            cta: 'Contact Sales',
            popular: false
        }
    ];

    return (
        <DashboardLayout>
            <div className="text-center mb-12">
                <h1 className="text-4xl font-serif font-bold text-dark mb-4">Pricing Engine</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Choose the plan that fits your business needs. Upgrade or downgrade at any time.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {plans.map((plan) => (
                    <Card
                        key={plan.name}
                        className={`p-8 relative flex flex-col ${plan.popular ? 'border-2 border-primary shadow-xl scale-105' : ''}`}
                    >
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                Most Popular
                            </div>
                        )}

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-500 uppercase tracking-widest mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-dark">{plan.price}</span>
                                <span className="text-gray-500">{plan.period}</span>
                            </div>
                            <p className="text-gray-600 mt-4">{plan.description}</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <Check className="w-3 h-3 text-green-600" />
                                    </div>
                                    <span className="text-gray-700">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            variant={plan.popular ? 'primary' : 'outline'}
                            className="w-full justify-center"
                        >
                            {plan.cta}
                        </Button>
                    </Card>
                ))}
            </div>

            <div className="mt-16 text-center">
                <h2 className="text-2xl font-bold text-dark mb-4">Frequently Asked Questions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                    <Card className="p-6">
                        <h4 className="font-bold text-lg mb-2">Can I switch plans later?</h4>
                        <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time from your settings.</p>
                    </Card>
                    <Card className="p-6">
                        <h4 className="font-bold text-lg mb-2">Is there a free trial?</h4>
                        <p className="text-gray-600">We offer a 14-day free trial on the Professional plan. No credit card required.</p>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}
