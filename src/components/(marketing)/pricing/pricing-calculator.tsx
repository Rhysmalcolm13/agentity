'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

export function PricingCalculator() {
  const [agents, setAgents] = useState(5);
  const [users, setUsers] = useState(10);
  const [isAnnual, setIsAnnual] = useState(true);

  // Pricing tiers
  const starter = {
    basePrice: 49,
    maxAgents: 5,
    maxUsers: 10,
    agentPrice: 15, // Price per additional agent
    userPrice: 8,   // Price per additional user
  };

  const professional = {
    basePrice: 99,
    maxAgents: 20,
    maxUsers: Infinity,
    agentPrice: 10, // Price per additional agent
    userPrice: 5,   // Price per additional user
  };

  const calculatePrice = () => {
    let monthlyPrice;

    // Determine which tier based on number of agents and users
    if (agents <= starter.maxAgents && users <= starter.maxUsers) {
      // Starter tier
      monthlyPrice = starter.basePrice;
    } else if (agents <= professional.maxAgents) {
      // Professional tier
      monthlyPrice = professional.basePrice;
      
      // Add cost for additional agents if exceeding starter tier
      if (agents > starter.maxAgents) {
        monthlyPrice += (agents - starter.maxAgents) * professional.agentPrice;
      }
      
      // Add cost for additional users if exceeding starter tier
      if (users > starter.maxUsers) {
        monthlyPrice += (users - starter.maxUsers) * professional.userPrice;
      }
    } else {
      // Enterprise tier - return null to show "Contact Sales"
      return null;
    }

    // Apply annual discount
    if (isAnnual) {
      monthlyPrice = monthlyPrice * 0.8; // 20% discount
    }

    return monthlyPrice.toFixed(2);
  };

  const price = calculatePrice();
  const tier = agents <= starter.maxAgents && users <= starter.maxUsers
    ? 'Starter'
    : agents <= professional.maxAgents
    ? 'Professional'
    : 'Enterprise';

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Custom Pricing Calculator</h3>
          <p className="text-sm text-muted-foreground">
            Estimate your monthly cost based on your needs
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Number of AI Agents</Label>
              <span className="text-sm font-medium">{agents}</span>
            </div>
            <Slider
              value={[agents]}
              onValueChange={(value) => setAgents(value[0])}
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>1 agent</span>
              <span>50 agents</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Number of Users</Label>
              <span className="text-sm font-medium">{users}</span>
            </div>
            <Slider
              value={[users]}
              onValueChange={(value) => setUsers(value[0])}
              min={1}
              max={100}
              step={1}
              className="w-full"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>1 user</span>
              <span>100 users</span>
            </div>
          </div>

          <div className="flex items-center justify-between space-x-2">
            <div className="space-y-0.5">
              <Label>Annual Billing</Label>
              <p className="text-xs text-muted-foreground">
                Save 20% with annual billing
              </p>
            </div>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Recommended Plan</span>
                <Badge variant="secondary">{tier}</Badge>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">Estimated Cost</span>
                <div className="text-right">
                  {price ? (
                    <>
                      <span className="text-2xl font-bold">${price}</span>
                      <span className="ml-1 text-sm text-muted-foreground">
                        /month
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-medium">Contact Sales</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 