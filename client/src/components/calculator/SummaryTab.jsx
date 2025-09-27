
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Calendar, DollarSign, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const strategyNames = {
  pay_more: "Pay More on Loan",
  invest_more: "Invest More",
  split: "Split Strategy"
};

const strategyIcons = {
  pay_more: TrendingDown,
  invest_more: TrendingUp,
  split: Target
};

export default function SummaryTab({ results }) {
  if (!results || !results.strategies || !results.recommendation) {
    return (
      <div className="text-center p-8">
        <p className="text-slate-500">Analysis data is not complete. Please try calculating again.</p>
      </div>
    );
  }

  const { strategies, recommendation } = results;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatMonths = (months) => {
    if (!months || months <= 0) return "Beyond horizon";
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years}y ${remainingMonths}m`;
  };

  return (
    <div className="space-y-6">
      {/* Recommendation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-600" />
              Recommended Strategy
              <Badge className="ml-2 bg-gradient-to-r from-blue-600 to-green-600 text-white">
                {strategyNames[recommendation.strategy]}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed mb-4">{recommendation.rationale}</p>
            
            {recommendation.key_insights && (
              <div className="space-y-2">
                <h4 className="font-semibold text-slate-900">Key Insights:</h4>
                <ul className="space-y-1">
                  {recommendation.key_insights.map((insight, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-2 flex-shrink-0" />
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Strategy Comparison */}
      <div className="grid md:grid-cols-3 gap-4">
        {Object.entries(strategies).map(([key, strategy], index) => {
          const Icon = strategyIcons[key];
          const isRecommended = key === recommendation.strategy;
          
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card className={`relative ${isRecommended ? 'ring-2 ring-blue-500 bg-blue-50/30' : 'bg-white/80'}`}>
                {isRecommended && (
                  <div className="absolute -top-2 -right-2">
                    <Badge className="bg-blue-600 text-white shadow-lg">Recommended</Badge>
                  </div>
                )}
                
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="w-5 h-5 text-slate-600" />
                    {strategyNames[key]}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-500">Payoff Time</p>
                      <p className="font-semibold text-slate-900">
                        {formatMonths(strategy.months_to_zero)}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-slate-500">Interest Saved</p>
                      <p className="font-semibold text-green-600">
                        {formatCurrency(strategy.interest_saved || 0)}
                      </p>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="text-slate-500">Investment Value (Range)</p>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-red-600">Conservative</span>
                          <span className="font-medium">{formatCurrency(strategy.investment_conservative || 0)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-700">Expected</span>
                          <span className="font-semibold">{formatCurrency(strategy.investment_median || 0)}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">Optimistic</span>
                          <span className="font-medium">{formatCurrency(strategy.investment_optimistic || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Key Financial Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {recommendation.breakeven_month ? `${recommendation.breakeven_month}mo` : "N/A"}
                </p>
                <p className="text-sm text-slate-500">Breakeven Point</p>
              </div>
              
              <div className="text-center">
                <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {formatCurrency(results.inputs.principal)}
                </p>
                <p className="text-sm text-slate-500">Initial Loan</p>
              </div>
              
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {(results.inputs.expected_return_annual * 100).toFixed(1)}%
                </p>
                <p className="text-sm text-slate-500">Expected Return</p>
              </div>
              
              <div className="text-center">
                <Target className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-slate-900">
                  {results.inputs.horizon_years}yr
                </p>
                <p className="text-sm text-slate-500">Time Horizon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
