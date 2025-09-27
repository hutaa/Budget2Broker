import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function InputPanel({ inputs, setInputs }) {
  const updateInput = (field, value) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const applyPreset = (preset) => {
    const presets = {
      conservative: {
        expected_return_annual: 0.05,
        volatility_annual: 0.10,
        tax_mode: "tax_advantaged"
      },
      moderate: {
        expected_return_annual: 0.07,
        volatility_annual: 0.15,
        tax_mode: "tax_advantaged"
      },
      aggressive: {
        expected_return_annual: 0.09,
        volatility_annual: 0.20,
        tax_mode: "taxable"
      }
    };
    
    setInputs(prev => ({ ...prev, ...presets[preset] }));
  };

  return (
    <div className="space-y-6">
      {/* Loan Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900">Loan Details</h3>
          <Badge variant="outline" className="text-xs">Required</Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Balance</Label>
            <Input
              id="principal"
              type="number"
              value={inputs.principal}
              onChange={(e) => updateInput('principal', parseFloat(e.target.value) || 0)}
              className="bg-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="apr">Interest Rate (%)</Label>
            <Input
              id="apr"
              type="number"
              step="0.01"
              value={(inputs.apr_annual * 100).toFixed(2)}
              onChange={(e) => updateInput('apr_annual', parseFloat(e.target.value) / 100 || 0)}
              className="bg-white/50"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="term">Loan Term (months)</Label>
            <Input
              id="term"
              type="number"
              value={inputs.term_months}
              onChange={(e) => updateInput('term_months', parseInt(e.target.value) || 0)}
              className="bg-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="min_payment">Min Payment ($)</Label>
            <Input
              id="min_payment"
              type="number"
              value={inputs.min_payment}
              onChange={(e) => updateInput('min_payment', parseFloat(e.target.value) || 0)}
              className="bg-white/50"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="extra_payment">Extra Payment Available ($)</Label>
          <Input
            id="extra_payment"
            type="number"
            value={inputs.extra_payment}
            onChange={(e) => updateInput('extra_payment', parseFloat(e.target.value) || 0)}
            className="bg-white/50"
          />
          <p className="text-xs text-slate-500">Additional money you could put toward loans or investments</p>
        </div>
      </div>

      <Separator className="bg-slate-200" />

      {/* Investment Assumptions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900">Investment Assumptions</h3>
          <div className="flex gap-2">
            {['conservative', 'moderate', 'aggressive'].map((preset) => (
              <Button
                key={preset}
                variant="outline"
                size="sm"
                onClick={() => applyPreset(preset)}
                className="text-xs capitalize"
              >
                {preset}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Expected Return (%)</Label>
              <span className="text-sm font-medium text-slate-600">
                {(inputs.expected_return_annual * 100).toFixed(1)}%
              </span>
            </div>
            <Slider
              value={[inputs.expected_return_annual * 100]}
              onValueChange={([value]) => updateInput('expected_return_annual', value / 100)}
              max={15}
              min={2}
              step={0.5}
              className="w-full"
            />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Volatility (%)</Label>
              <span className="text-sm font-medium text-slate-600">
                {(inputs.volatility_annual * 100).toFixed(1)}%
              </span>
            </div>
            <Slider
              value={[inputs.volatility_annual * 100]}
              onValueChange={([value]) => updateInput('volatility_annual', value / 100)}
              max={30}
              min={5}
              step={1}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label>Tax Treatment</Label>
          <Select value={inputs.tax_mode} onValueChange={(value) => updateInput('tax_mode', value)}>
            <SelectTrigger className="bg-white/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tax_advantaged">Tax-Advantaged (401k, IRA)</SelectItem>
              <SelectItem value="taxable">Taxable Account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="horizon">Time Horizon (years)</Label>
          <Input
            id="horizon"
            type="number"
            value={inputs.horizon_years}
            onChange={(e) => updateInput('horizon_years', parseInt(e.target.value) || 0)}
            className="bg-white/50"
          />
        </div>
      </div>
    </div>
  );
}