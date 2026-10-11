import React, { useState } from 'react';
import { 
  Sparkles, Layers, Cpu, GitFork, ShieldCheck, 
  CheckCircle2, Terminal, Play, ArrowRight, Database,
  Code2, Bug, Layout, Server, Calculator, RefreshCw,
  Info
} from 'lucide-react';

interface TaskNode {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'logic' | 'testing';
  icon: React.ComponentType<{ className?: string }>;
  bestFitModel: string;
  purpose: string;
  artifacts: string[];
  status: 'idle' | 'assigned' | 'running' | 'completed';
}

const ORCHESTRATION_STAGES = [
  {
    id: 'prompt',
    step: '01',
    label: 'User Prompt',
    description: 'Natural language specification parsed and normalized into structured requirements.',
  },
  {
    id: 'breakdown',
    step: '02',
    label: 'Task Breakdown',
    description: 'Autonomous DAG dependency graph generated with strict topological ordering.',
  },
  {
    id: 'selection',
    step: '03',
    label: 'Model Selection',
    description: 'Dynamic capability matching maps each task node to its optimal AI architecture.',
  },
  {
    id: 'parallel',
    step: '04',
    label: 'Parallel Execution',
    description: 'Independent task branches execute concurrently across sandboxed model agents.',
  },
  {
    id: 'integration',
    step: '05',
    label: 'VFS Integration',
    description: 'Virtual filesystem reconciles exports, AST interfaces, and dependency conflicts.',
  },
  {
    id: 'testing',
    step: '06',
    label: 'Verification & Repair',
    description: 'Self-healing test runner validates syntax, imports, and component rendering.',
  },
  {
    id: 'final',
    step: '07',
    label: 'Final Project',
    description: 'Production-ready full-stack application delivered with zero manual stitching.',
  },
];

const PARALLEL_TASK_NODES: TaskNode[] = [
  {
    id: 'node-ui',
    name: 'Frontend and UI/UX',
    category: 'frontend',
    icon: Layout,
    bestFitModel: 'Claude 3.7 / Gemini 3.8 Flash',
    purpose: 'Modular React 19 component trees, responsive Tailwind styling, micro-interactions, accessible UI controls.',
    artifacts: ['src/App.tsx', 'src/components/ui/Modal.tsx', 'src/index.css'],
    status: 'completed',
  },
  {
    id: 'node-api',
    name: 'Backend and APIs',
    category: 'backend',
    icon: Server,
    bestFitModel: 'GPT-4o / Gemini 3.8 Flash',
    purpose: 'REST & WebSocket route handlers, authentication middleware, request validation schemas, contract compliance.',
    artifacts: ['server.ts', 'server/routes/api.ts', 'server/middleware/auth.ts'],
    status: 'completed',
  },
  {
    id: 'node-db',
    name: 'Database',
    category: 'database',
    icon: Database,
    bestFitModel: 'DeepSeek R1 / GPT-4o',
    purpose: 'Entity schemas, relational integrity, migrations, indexed queries, client-side persistence adapters.',
    artifacts: ['src/db/schema.ts', 'src/services/storage.ts', 'src/types/models.ts'],
    status: 'completed',
  },
  {
    id: 'node-logic',
    name: 'Logic and Algorithms',
    category: 'logic',
    icon: Calculator,
    bestFitModel: 'DeepSeek R1 / Gemini 3.8 Flash',
    purpose: 'State machines, graph traversals, data transformation pipelines, mathematical computation routines.',
    artifacts: ['src/services/graphEngine.ts', 'src/utils/math.ts', 'src/services/aiRouter.ts'],
    status: 'completed',
  },
  {
    id: 'node-test',
    name: 'Testing and Debugging',
    category: 'testing',
    icon: Bug,
    bestFitModel: 'Gemini 3.1 Pro / Llama 3.3',
    purpose: 'Static AST analysis, import resolution verification, automated test suites, self-healing error patchers.',
    artifacts: ['src/services/testRunner.ts', 'tests/App.test.ts', 'server/integration/virtualFS.ts'],
    status: 'completed',
  },
];

export const OrchestrationWorkflowVisualizer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(3); // Default to Parallel Development
  const [selectedNode, setSelectedNode] = useState<TaskNode | null>(PARALLEL_TASK_NODES[0]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const handleSimulateStep = () => {
    setIsSimulating(true);
    let current = 0;
    const interval = setInterval(() => {
      current = (current + 1) % ORCHESTRATION_STAGES.length;
      setActiveStage(current);
      if (current === ORCHESTRATION_STAGES.length - 1) {
        clearInterval(interval);
        setTimeout(() => setIsSimulating(false), 800);
      }
    }, 1200);
  };

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#070b13] p-6 md:p-8 space-y-6 overflow-hidden">
      {/* Header & Simulation Status Note */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold">
              Engine Architecture
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Directed Acyclic Graph Orchestration</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            AI Orchestration Workflow
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            See how Nexora decomposes single-prompt ideas into parallel task graphs, assigns each domain to its optimal AI model, and integrates the results.
          </p>
        </div>

        {/* Clear Distinction Banner: Simulated vs Live Execution */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Interactive Workflow Preview (Simulation)</span>
          </div>

          <button
            onClick={handleSimulateStep}
            disabled={isSimulating}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
              isSimulating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 hover:border-emerald-500/50'
            }`}
          >
            {isSimulating ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Play Simulation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Seven-Stage Workflow Pipeline Stepper */}
      <div className="overflow-x-auto pb-2">
        <div className="grid grid-cols-7 min-w-[760px] gap-2">
          {ORCHESTRATION_STAGES.map((st, idx) => {
            const isCurrent = activeStage === idx;
            const isPassed = activeStage > idx;

            return (
              <button
                key={st.id}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-950/30 border-emerald-500/50 shadow-sm shadow-emerald-500/10'
                    : isPassed
                    ? 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                    : 'bg-slate-950/40 border-slate-800/60 text-slate-500 hover:text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                  <span className={isCurrent ? 'text-emerald-400 font-bold' : isPassed ? 'text-slate-400' : 'text-slate-600'}>
                    {st.step}
                  </span>
                  {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  {isCurrent && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />}
                </div>
                <div className={`text-xs font-semibold truncate ${isCurrent ? 'text-white' : isPassed ? 'text-slate-200' : 'text-slate-400'}`}>
                  {st.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Stage Explainer Bar */}
      <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <span className="font-mono text-emerald-400 font-semibold">Stage {ORCHESTRATION_STAGES[activeStage].step}:</span>
          <span className="font-medium text-white">{ORCHESTRATION_STAGES[activeStage].label}</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">{ORCHESTRATION_STAGES[activeStage].description}</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
          Step {activeStage + 1} of 7
        </span>
      </div>

      {/* Visual DAG Node Flow Representation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitFork className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Parallel Execution Graph Nodes
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Click any domain node to inspect model routing & artifacts
          </span>
        </div>

        {/* 5 Distinct Domain Nodes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {PARALLEL_TASK_NODES.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNode?.id === node.id;

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-emerald-950/25 border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-medium">
                      Verified
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-white mb-1">
                    {node.name}
                  </h4>
                  <div className="text-[11px] text-cyan-300 font-mono truncate mb-2">
                    {node.bestFitModel}
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {node.purpose}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>{node.artifacts.length} target files</span>
                  <span className={isSelected ? 'text-emerald-400' : 'text-slate-400'}>
                    {isSelected ? 'Selected' : 'Inspect →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Node Inspection Panel */}
        {selectedNode && (
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">
                Domain Specialization
              </div>
              <div className="font-semibold text-white text-sm mb-1">{selectedNode.name}</div>
              <p className="text-slate-400 leading-relaxed text-xs">{selectedNode.purpose}</p>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">
                Model Routing Rationale
              </div>
              <div className="text-emerald-400 font-mono font-medium mb-1">
                Primary: {selectedNode.bestFitModel}
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Task Router selects models based on token economics, AST parsing capabilities, context window volume, and real runtime latency.
              </p>
            </div>

            <div>
              <div className="text-[10px] uppercase font-mono text-slate-500 font-bold mb-1">
                Generated Target Files
              </div>
              <div className="space-y-1 font-mono text-[11px]">
                {selectedNode.artifacts.map((f) => (
                  <div key={f} className="text-cyan-300 flex items-center gap-1.5">
                    <Code2 className="w-3 h-3 text-slate-500" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Coordination Invariants Footer */}
      <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Concurrent Execution</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>Idempotent Synthesis</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            <span>AST Self-Healing</span>
          </span>
        </div>

        <span className="text-[11px] text-slate-500 font-mono">
          Nexora Task Dispatcher v2.4 · Server-authoritative DAG
        </span>
      </div>
    </section>
  );
};
