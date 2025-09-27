import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Scenario } from "@/entities/Scenario";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Download, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import InputPanel from "../components/calculator/InputPanel";
import SummaryTab from "../components/calculator/SummaryTab";
import ChartsTab from "../components/calculator/ChartsTab";
import AssumptionsTab from "../components/calculator/AssumptionsTab";

export default function CalculatorPage() {
  const [inputs, setInputs] = useState({
    principal: 35000,
    apr_annual: 0.065,
    term_months: 120,
    min_payment: 400,
    extra_payment: 200,
    expected_return_annual: 0.07,
    volatility_annual: 0.15,
    tax_mode: "tax_advantaged",
    horizon_years: 10
  });

  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  const calculateScenarios = async () => {
    setIsCalculating(true);
    try {
      const prompt = `
You are a financial calculator that helps students optimize loan payoff vs investment strategies.

Calculate three scenarios for these inputs:
- Loan Principal: $${inputs.principal.toLocaleString()}
- Annual APR: ${(inputs.apr_annual * 100).toFixed(2)}%
- Loan Term: ${inputs.term_months} months
- Minimum Payment: $${inputs.min_payment}
- Extra Payment Available: $${inputs.extra_payment}
- Expected Investment Return: ${(inputs.expected_return_annual * 100).toFixed(2)}%
- Investment Volatility: ${(inputs.volatility_annual * 100).toFixed(2)}%
- Tax Mode: ${inputs.tax_mode}
- Time Horizon: ${inputs.horizon_years} years

Calculate these three strategies:
1. PAY_MORE: Put all extra payment toward loan
2. INVEST_MORE: Pay minimum on loan, invest extra payment
3. SPLIT: Split extra payment 50/50 between loan and investment

For each strategy, calculate:
- Months to pay off loan (null if beyond horizon)
- Total interest paid on loan
- Interest saved vs minimum payments
- Expected investment value at horizon (conservative, median, optimistic)
- Monthly progression data for charts

Also provide:
- A clear recommendation with rationale
- Breakeven analysis
- Key insights

Use realistic financial calculations with compound interest, amortization schedules, and investment growth projections.
`;

      const response = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            strategies: {
              type: "object",
              properties: {
                pay_more: {
                  type: "object",
                  properties: {
                    months_to_zero: { type: "number" },
                    total_interest: { type: "number" },
                    interest_saved: { type: "number" },
                    investment_conservative: { type: "number" },
                    investment_median: { type: "number" },
                    investment_optimistic: { type: "number" },
                    loan_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          balance: { type: "number" }
                        }
                      }
                    },
                    investment_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          value: { type: "number" }
                        }
                      }
                    }
                  }
                },
                invest_more: { 
                  type: "object",
                  properties: {
                    months_to_zero: { type: "number" },
                    total_interest: { type: "number" },
                    interest_saved: { type: "number" },
                    investment_conservative: { type: "number" },
                    investment_median: { type: "number" },
                    investment_optimistic: { type: "number" },
                    loan_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          balance: { type: "number" }
                        }
                      }
                    },
                    investment_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          value: { type: "number" }
                        }
                      }
                    }
                  }
                },
                split: { 
                  type: "object",
                  properties: {
                    months_to_zero: { type: "number" },
                    total_interest: { type: "number" },
                    interest_saved: { type: "number" },
                    investment_conservative: { type: "number" },
                    investment_median: { type: "number" },
                    investment_optimistic: { type: "number" },
                    loan_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          balance: { type: "number" }
                        }
                      }
                    },
                    investment_progression: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          month: { type: "number" },
                          value: { type: "number" }
                        }
                      }
                    }
                  }
                }
              }
            },
            recommendation: {
              type: "object",
              properties: {
                strategy: { type: "string" },
                rationale: { type: "string" },
                breakeven_month: { type: "number" },
                key_insights: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            }
          }
        }
      });

      setResults({ ...response, inputs });
      setActiveTab("summary");
    } catch (error) {
      console.error("Calculation failed:", error);
    }
    setIsCalculating(false);
  };

  const saveScenario = async () => {
    if (!results) return;
    
    try {
      const user = await User.me();
      await Scenario.create({
        name: `Scenario ${new Date().toLocaleDateString()}`,
        ...inputs,
        results,
        created_by: user.email
      });
    } catch (error) {
      console.error("Failed to save scenario:", error);
    }
  };

  const exportData = () => {
    if (!results) return;
    
    const exportData = {
      timestamp: new Date().toISOString(),
      inputs,
      results
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `payoff-analysis-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30">
      <div className="p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                Loan vs Investment Calculator
              </h1>
              <p className="text-slate-600 text-lg">
                Compare paying extra on student loans vs investing the same money
              </p>
            </div>
            <div className="flex gap-3">
              {results && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={exportData}
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={saveScenario}
                    className="border-slate-300 hover:bg-slate-50"
                  >
                    Save Scenario
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Input Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-slate-200/60">
              <CardHeader className="border-b border-slate-200/60">
                <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  Your Inputs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <InputPanel inputs={inputs} setInputs={setInputs} />
                <Button 
                  onClick={calculateScenarios}
                  disabled={isCalculating}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 shadow-lg text-white font-semibold py-6 rounded-xl"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Calculating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Calculate Strategies
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Panel */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <Card className="bg-white/80 backdrop-blur-xl shadow-xl border-slate-200/60 h-full">
              <CardHeader className="border-b border-slate-200/60">
                <CardTitle className="flex items-center gap-2 text-xl text-slate-900">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Results & Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {results ? (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-50/80 rounded-none border-b border-slate-200/60">
                      <TabsTrigger value="summary" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Summary</TabsTrigger>
                      <TabsTrigger value="charts" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Charts</TabsTrigger>
                      <TabsTrigger value="assumptions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="summary" className="p-6">
                      <SummaryTab results={results} />
                    </TabsContent>
                    
                    <TabsContent value="charts" className="p-6">
                      <ChartsTab results={results} />
                    </TabsContent>
                    
                    <TabsContent value="assumptions" className="p-6">
                      <AssumptionsTab inputs={inputs} results={results} />
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Calculator className="w-10 h-10 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Ready to Calculate</h3>
                    <p className="text-slate-500">
                      Enter your loan details and investment assumptions, then click "Calculate Strategies" to see your personalized comparison.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}