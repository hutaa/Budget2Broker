import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, AlertTriangle, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

export default function AssumptionsTab({ inputs, results }) {
  const formatPercent = (value) => (value * 100).toFixed(2) + '%';
  const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);

  return (
    <div className="space-y-6">
      {/* Input Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-600" />
              Your Assumptions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Loan Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Principal Balance:</span>
                    <span className="font-medium">{formatCurrency(inputs.principal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Interest Rate:</span>
                    <span className="font-medium">{formatPercent(inputs.apr_annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Loan Term:</span>
                    <span className="font-medium">{inputs.term_months} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Minimum Payment:</span>
                    <span className="font-medium">{formatCurrency(inputs.min_payment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Extra Payment:</span>
                    <span className="font-medium">{formatCurrency(inputs.extra_payment)}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-900 mb-3">Investment Assumptions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Expected Return:</span>
                    <span className="font-medium">{formatPercent(inputs.expected_return_annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Volatility:</span>
                    <span className="font-medium">{formatPercent(inputs.volatility_annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Tax Treatment:</span>
                    <span className="font-medium capitalize">{inputs.tax_mode.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Time Horizon:</span>
                    <span className="font-medium">{inputs.horizon_years} years</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Methodology */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              How We Calculate
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Loan Calculations</h4>
              <p className="text-sm text-slate-600 mb-2">
                We use standard amortization formulas to calculate monthly payments, interest, and payoff timelines:
              </p>
              <ul className="text-xs text-slate-500 space-y-1 ml-4">
                <li>• Monthly interest rate = Annual rate ÷ 12</li>
                <li>• Monthly payment = Principal × [r(1+r)^n] / [(1+r)^n - 1]</li>
                <li>• Interest portion = Remaining balance × Monthly rate</li>
                <li>• Principal portion = Payment - Interest portion</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Investment Projections</h4>
              <p className="text-sm text-slate-600 mb-2">
                Investment growth is modeled using compound returns with the following considerations:
              </p>
              <ul className="text-xs text-slate-500 space-y-1 ml-4">
                <li>• Conservative: Expected return minus one standard deviation</li>
                <li>• Expected: Your input expected return with compound growth</li>
                <li>• Optimistic: Expected return plus one standard deviation</li>
                <li>• Tax adjustments applied based on account type</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Strategy Comparison</h4>
              <ul className="text-xs text-slate-500 space-y-1 ml-4">
                <li>• <strong>Pay More:</strong> All extra payment goes to loan principal</li>
                <li>• <strong>Invest More:</strong> Minimum loan payment, extra goes to investments</li>
                <li>• <strong>Split:</strong> Extra payment divided 50/50 between loan and investments</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Important Disclaimers */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-800">
              <AlertTriangle className="w-5 h-5" />
              Important Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-amber-800">
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Risk</Badge>
                <p>Investment returns are not guaranteed. Actual returns may vary significantly from projections.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Taxes</Badge>
                <p>Tax implications can vary based on income, filing status, and account types. Consult a tax professional.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Emergency Fund</Badge>
                <p>Consider maintaining 3-6 months of expenses in savings before aggressive loan payoff or investing.</p>
              </div>
              
              <div className="flex items-start gap-2">
                <Badge variant="outline" className="text-xs border-amber-300 text-amber-700">Personal</Badge>
                <p>Your personal financial situation, risk tolerance, and goals should guide your decision.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}