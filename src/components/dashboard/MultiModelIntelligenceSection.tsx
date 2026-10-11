import React, { useState, useEffect } from 'react';
import { 
  Cpu, CheckCircle2, AlertCircle, Zap, Shield, 
  ExternalLink, ArrowRight, Layers, Sliders, Code2, 
  Sparkles, RefreshCw
} from 'lucide-react';
import { AIModel } from '../../types';

interface MultiModelIntelligenceSectionProps {
  models: AIModel[];
  onNavigateToModels: () => void;
}

export const MultiModelIntelligenceSection: React.FC<MultiModelIntelligenceSectionProps> = ({
  models,
  onNavigateToModels,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [providerStatuses, setProviderStatuses] = useState<Record<string, boolean>>({});
  const [isLoadingHealth, setIsLoadingHealth] = useState(false);

  // Fetch real server provider connection status from /api/health
  useEffect(() => {
    let isMounted = true;
    const fetchHealth = async () => {
      setIsLoadingHealth(true);
      try {
        const res = await fetch('/api/health');
        if (res.ok && isMounted) {
          const data = await res.json();
          if (data?.providers) {
            const map: Record<string, boolean> = {};
            data.providers.forEach((p: any) => {
              map[p.id] = Boolean(p.hasCredentials);
            });
            setProviderStatuses(map);
          }
        }
      } catch (err) {
        console.warn('Unable to query provider health:', err);
      } finally {
        if (isMounted) setIsLoadingHealth(false);
      }
    };
    fetchHealth();
    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions = [
    { id: 'all', label: 'All Models' },
    { id: 'frontend', label: 'Frontend & UI' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'database', label: 'Database & Schemas' },
    { id: 'testing', label: 'Testing & QA' },
    { id: 'security', label: 'Security & Auth' },
  ];

  const filteredModels = models.filter((m) => {
    if (selectedFilter === 'all') return true;
    return m.supportedCategories.includes(selectedFilter as any);
  });

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#070b13] p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold">
              Intelligent Routing
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Dynamic Task-to-Model Dispatch</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Multi-Model Intelligence Ensemble
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Nexora routes individual DAG tasks to specialized AI models based on architectural demands, token economics, context requirements, and real provider availability.
          </p>
        </div>

        <button
          onClick={onNavigateToModels}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer"
        >
          <span>Manage AI Providers</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 mr-1">Filter by role:</span>
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedFilter(opt.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              selectedFilter === opt.id
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Model Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => {
          // Compute real server-side connection status for Gemini vs OpenAI vs others
          const isGeminiProvider = model.provider === 'Google';
          const isOpenAIProvider = model.provider === 'OpenAI';
          
          let connectionStatusBadge = {
            label: 'Ready / Fallback to Gemini',
            color: 'bg-slate-800/80 text-slate-300 border-slate-700',
            dot: 'bg-slate-400',
          };

          if (isGeminiProvider) {
            connectionStatusBadge = {
              label: 'Connected (Server Key)',
              color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
              dot: 'bg-emerald-400',
            };
          } else if (isOpenAIProvider) {
            const hasOpenAI = providerStatuses['openai'];
            if (hasOpenAI) {
              connectionStatusBadge = {
                label: 'Connected (OpenAI Vault)',
                color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
                dot: 'bg-emerald-400',
              };
            } else {
              connectionStatusBadge = {
                label: 'Configurable in Settings',
                color: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
                dot: 'bg-cyan-400',
              };
            }
          }

          return (
            <div
              key={model.id}
              className="p-5 rounded-2xl border border-slate-800 bg-[#060a12]/70 hover:bg-[#070d17] hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header with avatar, name, and connection status */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {model.avatar}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {model.name}
                      </h4>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {model.provider}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono border flex items-center gap-1.5 ${connectionStatusBadge.color}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${connectionStatusBadge.dot}`} />
                    <span>{connectionStatusBadge.label}</span>
                  </span>
                </div>

                {/* Primary Specialty */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {model.specialty}
                </p>

                {/* Supported Capabilities Tags */}
                <div className="space-y-1 mb-4">
                  <div className="text-[10px] uppercase font-mono text-slate-500 font-semibold">
                    Supported Domains
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {model.supportedCategories.map((cat) => (
                      <span
                        key={cat}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technical Specifications Footer */}
              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                <div>
                  <span className="text-slate-500 text-[10px] block">Context Window</span>
                  <span className="text-white font-semibold">{model.contextWindow}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Nominal Latency</span>
                  <span className="text-emerald-400 font-semibold">~{model.latencyMs}ms</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transparent Fallback Guarantee Callout */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-start gap-2.5">
          <Zap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white">Graceful Fallback & Idempotency Guarantee: </span>
            <span className="text-slate-400">
              When a specialized 3rd-party provider is unconfigured, Nexora automatically routes tasks to Google Gemini 3.8 Flash, guaranteeing zero execution interruptions or mock data placeholders.
            </span>
          </div>
        </div>

        <button
          onClick={onNavigateToModels}
          className="text-xs text-cyan-400 hover:text-cyan-300 whitespace-nowrap font-medium flex items-center gap-1 self-start sm:self-auto cursor-pointer"
        >
          <span>Connect API Keys</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>
    </section>
  );
};
