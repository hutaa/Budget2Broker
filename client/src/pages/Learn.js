import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calculator, TrendingUp, DollarSign, AlertCircle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

export default function LearnPage() {
  const topics = [
    {
      icon: Calculator,
      title: "Understanding Interest Rates",
      level: "Beginner",
      content: "Learn how compound interest works on loans vs investments and why the rates matter for your decision.",
      keyPoints: [
        "Compound interest works against you on loans",
        "Higher loan rates favor paying off debt first",
        "Lower loan rates may favor investing instead"
      ]
    },
    {
      icon: TrendingUp,
      title: "Investment Risk & Returns",
      level: "Intermediate",
      content: "Understand the relationship between risk and expected returns in different investment vehicles.",
      keyPoints: [
        "Stock market averages 7-10% annually over long periods",
        "Past performance doesn't guarantee future results",
        "Diversification helps manage risk"
      ]
    },
    {
      icon: DollarSign,
      title: "Tax Considerations",
      level: "Advanced",
      content: "How taxes affect your loan vs investment decision, including tax-advantaged accounts.",
      keyPoints: [
        "401(k) contributions reduce taxable income",
        "Roth accounts grow tax-free",
        "Student loan interest may be tax deductible"
      ]
    }
  ];

  const strategies = [
    {
      name: "Debt Avalanche",
      description: "Pay minimums on all debts, then put extra money toward the highest interest rate debt first.",
      pros: ["Saves the most money mathematically", "Fastest debt payoff"],
      cons: ["May feel slow if highest rate debt is large", "Less psychological wins"]
    },
    {
      name: "Debt Snowball", 
      description: "Pay minimums on all debts, then put extra money toward the smallest balance first.",
      pros: ["Quick psychological wins", "Builds momentum", "Simplifies finances faster"],
      cons: ["May cost more in interest", "Not mathematically optimal"]
    },
    {
      name: "Balanced Approach",
      description: "Split extra money between debt payoff and investing based on interest rates vs expected returns.",
      pros: ["Hedges your bets", "Builds wealth while reducing debt", "Good for moderate risk tolerance"],
      cons: ["May not be optimal for either goal", "More complex to manage"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-green-50/30 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Learning Center
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Master the fundamentals of debt payoff vs investing to make informed financial decisions
            </p>
          </div>
        </motion.div>

        {/* Key Concepts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Key Concepts
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-slate-200/60 h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <topic.icon className="w-8 h-8 text-blue-600" />
                      <Badge variant="outline" className={
                        topic.level === 'Beginner' ? 'border-green-300 text-green-700' :
                        topic.level === 'Intermediate' ? 'border-yellow-300 text-yellow-700' :
                        'border-red-300 text-red-700'
                      }>
                        {topic.level}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl text-slate-900">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4">{topic.content}</p>
                    <div className="space-y-2">
                      {topic.keyPoints.map((point, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm">
                          <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                          <span className="text-slate-600">{point}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Common Strategies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-green-600" />
            Common Strategies
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6">
            {strategies.map((strategy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-white/80 backdrop-blur-xl border-slate-200/60 h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">{strategy.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-slate-600 text-sm">{strategy.description}</p>
                    
                    <div>
                      <h4 className="font-semibold text-green-700 text-sm mb-2">Pros:</h4>
                      <ul className="space-y-1">
                        {strategy.pros.map((pro, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-red-700 text-sm mb-2">Cons:</h4>
                      <ul className="space-y-1">
                        {strategy.cons.map((con, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Reminders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-800">
                <AlertCircle className="w-6 h-6" />
                Important Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6 text-sm text-amber-800">
                <div>
                  <h4 className="font-semibold mb-2">Emergency Fund First</h4>
                  <p>Before aggressive debt payoff or investing, ensure you have 3-6 months of expenses saved for emergencies.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Employer Match</h4>
                  <p>Always contribute enough to get your full employer 401(k) match - it's free money with guaranteed returns.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Personal Factors</h4>
                  <p>Your risk tolerance, job security, and personal goals matter more than mathematical optimization alone.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Professional Advice</h4>
                  <p>Consider consulting a financial advisor for personalized advice, especially for complex situations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}