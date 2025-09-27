import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Calculator, BookOpen, BarChart3, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Calculator",
    url: createPageUrl("Calculator"),
    icon: Calculator,
  },
  {
    title: "My Scenarios",
    url: createPageUrl("Scenarios"),
    icon: BarChart3,
  },
  {
    title: "Learning Center",
    url: createPageUrl("Learn"),
    icon: BookOpen,
  },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <SidebarProvider>
      <style>{`
        :root {
          --primary: 220 91% 20%;
          --primary-foreground: 210 40% 98%;
          --secondary: 210 40% 96%;
          --secondary-foreground: 220 9% 46%;
          --accent: 210 40% 94%;
          --accent-foreground: 220 9% 15%;
          --background: 0 0% 100%;
          --foreground: 220 9% 9%;
          --muted: 210 40% 96%;
          --muted-foreground: 220 9% 46%;
          --card: 0 0% 100%;
          --card-foreground: 220 9% 9%;
          --border: 220 13% 91%;
          --input: 220 13% 91%;
          --ring: 220 91% 20%;
        }
      `}</style>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-green-50/20">
        <Sidebar className="border-r border-slate-200/60 backdrop-blur-xl bg-white/80">
          <SidebarHeader className="border-b border-slate-200/60 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-lg">PayoffOptimizer</h2>
                <p className="text-xs text-slate-500 font-medium">Smart Financial Decisions</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 py-3">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="space-y-2">
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-slate-900 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-gradient-to-r from-blue-100 to-green-100 text-slate-900 shadow-sm' : 'text-slate-600'
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-semibold">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-slate-200/60 p-6">
            <div className="text-center space-y-2">
              <div className="text-xs text-slate-400 font-medium">
                Educational Use Only
              </div>
              <div className="text-xs text-slate-400">
                Not financial advice. Consult professionals for major decisions.
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/60 backdrop-blur-xl border-b border-slate-200/60 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-slate-100 p-2 rounded-xl transition-colors duration-300" />
              <h1 className="text-xl font-bold text-slate-900">PayoffOptimizer</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}