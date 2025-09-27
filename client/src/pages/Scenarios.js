    import React, { useState, useEffect } from "react";
import { Scenario } from "@/entities/Scenario";
import { User } from "@/entities/User";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { BarChart3, Calendar, DollarSign, TrendingUp, Trash2, Download, Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function ScenariosPage() {
  const [scenarios, setScenarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = async () => {
    try {
      const user = await User.me();
      const userScenarios = await Scenario.filter({ created_by: user.email }, '-created_date');
      setScenarios(userScenarios);
    } catch (error) {
      console.error("Failed to load scenarios:", error);
    }
    setIsLoading(false);
  };

  const deleteScenario = async (id) => {
    try {
      await Scenario.delete(id);
      setScenarios(scenarios.filter(s => s.id !== id));
    } catch (error) {
      console.error("Failed to delete scenario:", error);
    }
  };

  const exportScenario = (scenario) => {
    const exportData = {
      timestamp: new Date().toISOString(),
      scenario: scenario
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `scenario-${scenario.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 p-6 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded-lg w-64"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                My Scenarios
              </h1>
              <p className="text-slate-600 text-lg">
                View and manage your saved loan vs investment analyses
              </p>
            </div>
            <Link to={createPageUrl("Calculator")}>
              <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg text-white font-semibold">
                <Plus className="w-5 h-5 mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>
        </motion.div>

        {scenarios.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="bg-white/80 backdrop-blur-xl border-slate-200/60">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-10 h-10 text-slate-400" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-700 mb-3">No Scenarios Yet</h3>
                <p className="text-slate-500 mb-6 max-w-md mx-auto">
                  Start by creating your first loan vs investment analysis. Your saved scenarios will appear here.
                </p>
                <Link to={createPageUrl("Calculator")}>
                  <Button className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg text-white font-semibold px-6 py-3">
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-slate-200/60 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg text-slate-900">{scenario.name}</CardTitle>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => exportScenario(scenario)}
                          className="hover:bg-slate-100"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteScenario(scenario.id)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(scenario.created_date).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-slate-500">Loan Amount</p>
                        <p className="font-semibold text-slate-900">{formatCurrency(scenario.principal)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Interest Rate</p>
                        <p className="font-semibold text-slate-900">{(scenario.apr_annual * 100).toFixed(2)}%</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Extra Payment</p>
                        <p className="font-semibold text-slate-900">{formatCurrency(scenario.extra_payment)}</p>
                      </div>
                      <div>
                        <p className="text-slate-500">Expected Return</p>
                        <p className="font-semibold text-slate-900">{(scenario.expected_return_annual * 100).toFixed(1)}%</p>
                      </div>
                    </div>

                    {/* Recommendation */}
                    {scenario.results?.recommendation && (
                      <div className="pt-3 border-t border-slate-200">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-slate-700">Recommendation</span>
                        </div>
                        <Badge className="bg-gradient-to-r from-blue-100 to-green-100 text-slate-800 border-slate-300">
                          {scenario.results.recommendation.strategy === 'pay_more' ? 'Pay More on Loan' :
                           scenario.results.recommendation.strategy === 'invest_more' ? 'Invest More' : 'Split Strategy'}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}