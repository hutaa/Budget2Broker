import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function ChartsTab({ results }) {
  const { strategies, recommendation } = results;

  // Format data for loan balance chart
  const loanBalanceData = [];
  const maxLength = Math.max(
    strategies.pay_more?.loan_progression?.length || 0,
    strategies.invest_more?.loan_progression?.length || 0,
    strategies.split?.loan_progression?.length || 0
  );

  for (let i = 0; i < maxLength; i++) {
    const dataPoint = { month: i };
    
    if (strategies.pay_more?.loan_progression?.[i]) {
      dataPoint.pay_more = strategies.pay_more.loan_progression[i].balance;
    }
    if (strategies.invest_more?.loan_progression?.[i]) {
      dataPoint.invest_more = strategies.invest_more.loan_progression[i].balance;
    }
    if (strategies.split?.loan_progression?.[i]) {
      dataPoint.split = strategies.split.loan_progression[i].balance;
    }
    
    loanBalanceData.push(dataPoint);
  }

  // Format data for investment growth chart
  const investmentData = [];
  for (let i = 0; i < maxLength; i++) {
    const dataPoint = { month: i };
    
    if (strategies.pay_more?.investment_progression?.[i]) {
      dataPoint.pay_more = strategies.pay_more.investment_progression[i].value;
    }
    if (strategies.invest_more?.investment_progression?.[i]) {
      dataPoint.invest_more = strategies.invest_more.investment_progression[i].value;
    }
    if (strategies.split?.investment_progression?.[i]) {
      dataPoint.split = strategies.split.investment_progression[i].value;
    }
    
    investmentData.push(dataPoint);
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    
    return (
      <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
        <p className="font-medium text-slate-900">Month {label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.name === 'pay_more' ? 'Pay More' : 
             entry.name === 'invest_more' ? 'Invest More' : 'Split'}: {formatCurrency(entry.value)}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Loan Balance Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Loan Balance Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={loanBalanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Area
                    type="monotone"
                    dataKey="pay_more"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    name="Pay More"
                  />
                  <Area
                    type="monotone"
                    dataKey="invest_more"
                    stackId="2"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.2}
                    name="Invest More"
                  />
                  <Area
                    type="monotone"
                    dataKey="split"
                    stackId="3"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.2}
                    name="Split"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Investment Growth Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Investment Growth Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={investmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis 
                    tickFormatter={formatCurrency}
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Line
                    type="monotone"
                    dataKey="pay_more"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="Pay More"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="invest_more"
                    stroke="#10b981"
                    strokeWidth={3}
                    name="Invest More"
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="split"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    name="Split"
                    dot={false}
                  />
                  
                  {/* Breakeven marker */}
                  {recommendation.breakeven_month && (
                    <Line
                      type="monotone"
                      dataKey={() => null}
                      stroke="#ef4444"
                      strokeDasharray="5 5"
                      name="Breakeven"
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            {recommendation.breakeven_month && (
              <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>Breakeven Point:</strong> Month {recommendation.breakeven_month} - 
                  This is when the investment strategy starts outperforming the loan payoff strategy.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}