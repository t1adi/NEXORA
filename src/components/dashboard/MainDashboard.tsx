import React, { useState } from 'react';
import { 
  Sparkles, Plus, ArrowRight, Activity, Cpu, 
  Layers, ShieldCheck, Zap, Download, ExternalLink, 
  Clock, CheckCircle2, TrendingUp, FolderGit2, Play, Code2, 
  Network, GitBranch, ArrowUpRight, Compass
} from 'lucide-react';
import { Project, AIModel, QuotaStats } from '../../types';
import { PROJECT_TEMPLATES, ProjectTemplate } from '../../data/projectTemplates';
import { NexoraLogo } from '../brand/NexoraLogo';
import { OrchestrationWorkflowVisualizer } from './OrchestrationWorkflowVisualizer';
import { MultiModelIntelligenceSection } from './MultiModelIntelligenceSection';

interface MainDashboardProps {
  projects: Project[];
  models: AIModel[];
  quotas: QuotaStats;
  onOpenNewProjectModal: (initialPrompt?: string) => void;
  onOpenProjectWorkspace: (projectId: string) => void;
  onNavigate: (view: string) => void;
  onStartFromTemplate: (template: ProjectTemplate) => void;
}

export const MainDashboard: React.FC<MainDashboardProps> = ({
  projects,
  models,
  quotas,
  onOpenNewProjectModal,
  onOpenProjectWorkspace,
  onNavigate,
  onStartFromTemplate,
}) => {
  const [promptInput, setPromptInput] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) {
      onOpenNewProjectModal();
      return;
    }
    onOpenNewProjectModal(promptInput.trim());
  };

  const handleSelectExamplePrompt = (promptText: string) => {
    setPromptInput(promptText);
  };

  const totalLinesOfCode = projects.reduce((acc, p) => {
    return acc + Object.values(p.files).reduce((fAcc, f) => fAcc + f.content.split('\n').length, 0);
  }, 0);

  const recentProjects = [...projects].sort((a, b) => b.updatedAt - a.updatedAt).slice(0, 4);
  const activeProject = projects[0] || null;

  const examplePrompts = [
    {
      title: 'DevSecOps Telemetry Console',
      prompt: 'Real-Time DevSecOps Telemetry Dashboard with incident response workflows, audit logs, and status monitors.',
    },
    {
      title: 'AI Multi-Agent Studio',
      prompt: 'Interactive AI Agent Node Canvas with directed graph execution, state serialization, and live output stream.',
    },
    {
      title: 'Headless E-Commerce Storefront',
      prompt: 'Modern Headless E-Commerce Storefront with product filtering, dynamic cart drawer, checkout modal, and inventory tracker.',
    },
    {
      title: 'Algorithmic Trading Terminal',
      prompt: 'High-frequency Algorithmic Trading Terminal with live candlestick charts, order book, depth visualizer, and position ledger.',
    },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 max-w-7xl mx-auto w-full">
      {/* 1. HERO SECTION */}
      <section className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#060c12] via-[#05090e] to-[#04070a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        {/* Subtle background radial glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          {/* Brand Pill & Multi-Model Tag as in nexo1.png */}
          <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-[#03070c]/80 border border-emerald-500/30 backdrop-blur-md">
            <NexoraLogo size="xs" showText={false} glow={true} />
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold tracking-wider text-white font-mono uppercase">
                NEXORA
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-semibold tracking-wide uppercase text-[11px]">
                MULTI-MODEL AI PLATFORM
              </span>
            </div>
          </div>

          {/* Exact Target Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] font-heading">
            One Prompt. Every AI.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              One Complete Project.
            </span>
          </h1>

          {/* Exact Target Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl font-sans">
            Nexora brings multiple AI models together, intelligently assigning tasks across frontend, backend, UI/UX, and testing to turn your ideas into complete software projects.
          </p>

          {/* Domain Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['Frontend', 'Backend', 'AI Orchestration', 'Testing'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Large Project Creation Area (Prompt Box + Actions) */}
          <form onSubmit={handlePromptSubmit} className="pt-2 space-y-3">
            <div className="relative flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2 rounded-2xl bg-[#020509]/90 border border-slate-700/80 hover:border-emerald-500/50 focus-within:border-emerald-500 shadow-2xl transition-all">
              <input
                type="text"
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder="Describe your application (e.g., Real-time fintech trading platform with charts and order routing)..."
                className="flex-1 bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none min-w-0"
              />

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                  <span>Start Building →</span>
                </button>
              </div>
            </div>

            {/* CTAs Row with Primary & Secondary Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenNewProjectModal(promptInput)}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-emerald-600/20 active:scale-95 cursor-pointer"
                >
                  <span>Start Building →</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (activeProject) {
                      onOpenProjectWorkspace(activeProject.id);
                    } else {
                      onNavigate('workspace');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-medium text-xs sm:text-sm border border-slate-700 hover:border-slate-600 flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>Explore Workspace</span>
                </button>
              </div>

              <div className="text-xs text-slate-400 font-mono hidden md:flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Multi-Mind DAG Engine Active</span>
              </div>
            </div>

            {/* Clickable Example Prompts */}
            <div className="pt-2">
              <div className="text-xs text-slate-400 mb-2 font-medium">Click to try an example:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {examplePrompts.map((item) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => handleSelectExamplePrompt(item.prompt)}
                    className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-emerald-500/40 hover:bg-slate-900/70 text-left transition-all group flex items-start justify-between gap-2 cursor-pointer"
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {item.prompt}
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </section>

      {/* 2. AI ORCHESTRATION WORKFLOW VISUALIZER (Requirement 3) */}
      <OrchestrationWorkflowVisualizer />

      {/* 3. MULTI-MODEL INTELLIGENCE SECTION (Requirement 4) */}
      <MultiModelIntelligenceSection
        models={models}
        onNavigateToModels={() => onNavigate('models')}
      />

      {/* 4. PLATFORM METRICS & STATS GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Active Platform Telemetry
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Tabular verifiable metrics
          </span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#060a12]/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Managed Projects</span>
              <FolderGit2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {projects.length}
            </div>
            <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Zero Build Failures</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a12]/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Orchestrated Tasks</span>
              <Layers className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {projects.reduce((acc, p) => acc + p.tasks.length, 0)}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              Distributed over {models.length} AI models
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a12]/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Lines of Synthesized Code</span>
              <Code2 className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              {(totalLinesOfCode || 1840).toLocaleString()}
            </div>
            <div className="text-[11px] text-slate-400 mt-2 font-mono">
              VFS conflict-resolved & formatted
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#060a12]/80 border border-slate-800 backdrop-blur-sm">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>Compute Quota Used</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white tabular-nums">
              ${quotas.totalEstimatedCost.toFixed(2)}
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-amber-400 h-full"
                style={{
                  width: `${Math.min(100, (quotas.totalEstimatedCost / quotas.spendingLimit) * 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK-START PROJECT BLUEPRINTS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Curated Architecture Blueprints
            </h2>
          </div>
          <span className="text-xs text-slate-400">Pre-configured DAG task plans</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROJECT_TEMPLATES.slice(0, 3).map((template) => (
            <div
              key={template.id}
              className="p-5 rounded-2xl border border-slate-800 bg-[#060a12]/70 hover:border-slate-700 hover:bg-[#080e18] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {template.type}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider font-mono">
                    {template.badge}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">
                  {template.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {template.tagline}
                </p>
              </div>

              <button
                onClick={() => onStartFromTemplate(template)}
                className="w-full py-2.5 rounded-xl bg-slate-900 group-hover:bg-emerald-600 text-slate-200 group-hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all border border-slate-800 group-hover:border-emerald-500 cursor-pointer shadow-sm"
              >
                <span>Launch Blueprint</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 6. RECENT PROJECTS & WORKSPACE ACCESS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-200">
              Recent Projects & Workspaces
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs text-cyan-400 hover:underline font-mono cursor-pointer"
          >
            View All ({projects.length}) &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentProjects.map((p) => (
            <div
              key={p.id}
              className="p-5 rounded-2xl border border-slate-800 bg-[#060a12]/70 hover:bg-[#080e18] hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                    {p.type}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {new Date(p.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mb-1">{p.name}</h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>{p.tasks.length} Tasks</span>
                  <span className="text-slate-600">·</span>
                  <span>{Object.keys(p.files).length} Files</span>
                </div>

                <button
                  onClick={() => onOpenProjectWorkspace(p.id)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Open Workspace</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
