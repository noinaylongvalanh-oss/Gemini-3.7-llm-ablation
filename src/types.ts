export type ArchitectureSuite = 'gpt-oss' | 'gemma' | 'muse-nvidia' | 'reasoning-frontier';

export interface TargetTensorMapping {
  tensorName: string;
  category: 'mlp_down' | 'attn_o' | 'gate_up' | 'moe_expert' | 'vision_proj' | 'router';
  description: string;
  dimension: string;
  guardedForIntelligence: boolean;
}

export interface ModelProfile {
  id: string;
  name: string;
  suite: ArchitectureSuite;
  hfRepo: string;
  parameterCount: string;
  activeParameters?: string;
  layerCount: number;
  hiddenDimension: number;
  numAttentionHeads: number;
  numKeyValueHeads?: number;
  vocabSize: number;
  contextLength: string;
  architectureType: 'Dense Transformer' | 'Sparse MoE' | 'Multimodal Vision-Language' | 'Dual-State SWA Reasoning';
  specialFeatures: string[];
  recommendedAblationLayers: [number, number];
  defaultAlpha: number;
  targetTensors: TargetTensorMapping[];
  vramFp16Gb: number;
  vram4bitGb: number;
  supportsColabT4: boolean;
  reasoningCoTTags?: string[];
  softCappingScale?: number;
}

export type OptimizationStrategy = 
  | 'pareto_optimal'
  | 'zero_intelligence_loss'
  | 'deep_reasoning_cot'
  | 'genetic_subspace_search'
  | 'colab_free_t4_sweep';

export interface TuningConfig {
  modelId: string;
  strategy: OptimizationStrategy;
  epochs: number;
  alphaRange: [number, number];
  layerRange: [number, number];
  selectedTensors: string[];
  preserveFrobeniusNorm: boolean;
  whitenedSvd: boolean;
  protectCoTTokens: boolean;
  protectMathCodeSubspaces: boolean;
  offloadToCpu: boolean;
  quantization: 'none' | '8bit' | '4bit_nf4';
  numContrastivePairs: number;
}

export interface ParetoEpochRecord {
  epoch: number;
  alpha: number;
  layerStart: number;
  layerEnd: number;
  refusalScore: number; // 0% = 0.00 refusal (fully abliterated)
  mmluRetention: number; // e.g. 99.98%
  gsm8kMathScore: number; // e.g. 96.4%
  humanEvalCodeScore: number; // e.g. 88.2%
  cotFidelity: number; // e.g. 99.9%
  frobeniusDrift: number; // e.g. 0.0014
  fitness: number;
  isParetoFrontier: boolean;
}

export interface SingularSpectrumPoint {
  index: number;
  singularValue: number;
  cumulativeEnergy: number;
  isRefusalDominant: boolean;
  isIntelligenceSubspace: boolean;
}

export interface LayerSensitivityData {
  layer: number;
  refusalAlignment: number; // 0 to 1
  mathAlignment: number; // 0 to 1
  codeAlignment: number; // 0 to 1
  reasoningAlignment: number; // 0 to 1
  recommendedForAblation: boolean;
}

export interface ActivationGeometryPoint {
  id: string;
  prompt: string;
  type: 'harmful_refusal' | 'benign_helpful' | 'math_gsm8k' | 'code_humaneval' | 'reasoning_cot';
  pca1: number;
  pca2: number;
  pca3: number;
  refusalDistance: number;
  isAblatedShift: boolean;
  shiftedPca1?: number;
  shiftedPca2?: number;
  shiftedPca3?: number;
}

export interface ProbeTestPrompt {
  id: string;
  category: 'Safety Edge-Case' | 'GSM8K Math' | 'HumanEval Code' | 'Deep Reasoning CoT' | 'General Knowledge';
  prompt: string;
  stockModelResponse: string;
  ablatedModelResponse: string;
  refusalProbabilityStock: number;
  refusalProbabilityAblated: number;
  cotTokenPreserved: boolean;
  status: 'passed' | 'refused' | 'degraded';
}
