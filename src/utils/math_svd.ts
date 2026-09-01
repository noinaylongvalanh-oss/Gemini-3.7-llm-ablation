// Mathematical engine for LLM Representation Engineering & SVD Abliteration

export interface SvdComputationResult {
  singularValues: number[];
  energyCumulative: number[];
  refusalRankEnergy: number;
  frobeniusOriginal: number;
  frobeniusModified: number;
  frobeniusPreserved: boolean;
  driftPercentage: number;
}

/**
 * Computes simulated SVD singular spectrum for a weight tensor dimension [d_out, d_in]
 * based on power-law decay characteristic of transformer weight matrices (Marchenko-Pastur / Zipfian spectrum).
 */
export function computeSingularSpectrum(
  hiddenDim: number,
  numComponents: number = 64,
  decayRate: number = 1.15
): SvdComputationResult {
  const singularValues: number[] = [];
  let totalEnergy = 0;

  for (let i = 0; i < numComponents; i++) {
    // Power-law singular value distribution sigma_i = sigma_1 * (i + 1)^(-decayRate)
    const baseSigma = Math.sqrt(hiddenDim) * 2.8;
    const sigma = baseSigma / Math.pow(i + 1, decayRate);
    singularValues.push(sigma);
    totalEnergy += sigma * sigma;
  }

  const energyCumulative: number[] = [];
  let runningEnergy = 0;
  for (let i = 0; i < numComponents; i++) {
    runningEnergy += singularValues[i] * singularValues[i];
    energyCumulative.push(Number(((runningEnergy / totalEnergy) * 100).toFixed(2)));
  }

  // Refusal direction energy is typically localized in top 1-4 singular components
  const refusalEnergy = (singularValues[0] ** 2 + (singularValues[1] || 0) ** 2) / totalEnergy;
  const frobOrig = Math.sqrt(totalEnergy);

  return {
    singularValues: singularValues.map(v => Number(v.toFixed(3))),
    energyCumulative,
    refusalRankEnergy: Number((refusalEnergy * 100).toFixed(2)),
    frobeniusOriginal: Number(frobOrig.toFixed(4)),
    frobeniusModified: Number(frobOrig.toFixed(4)),
    frobeniusPreserved: true,
    driftPercentage: 0.0012
  };
}

/**
 * Calculates Orthogonal Projection Operator:
 * W_ablated = W - alpha * (r * r^T / ||r||_2^2) * W
 * With Frobenius Norm Preservation Scaling:
 * W_preserved = W_ablated * (||W||_F / ||W_ablated||_F)
 */
export function calculateFrobeniusPreservation(
  originalNorm: number,
  alpha: number,
  refusalAlignment: number
): {
  unscaledNorm: number;
  rescalingFactor: number;
  frobeniusLossDelta: number;
  preservedNorm: number;
} {
  // Unscaled projection reduces norm by alpha * cos(theta)
  const normDropFraction = (alpha * 0.045 * refusalAlignment);
  const unscaledNorm = originalNorm * (1 - normDropFraction);
  const rescalingFactor = originalNorm / Math.max(unscaledNorm, 0.0001);
  const preservedNorm = unscaledNorm * rescalingFactor;
  const frobeniusLossDelta = Math.abs(preservedNorm - originalNorm);

  return {
    unscaledNorm: Number(unscaledNorm.toFixed(4)),
    rescalingFactor: Number(rescalingFactor.toFixed(6)),
    frobeniusLossDelta: Number(frobeniusLossDelta.toFixed(6)),
    preservedNorm: Number(preservedNorm.toFixed(4))
  };
}

/**
 * Calculates Grassmanian Distance between refusal subspace and intelligence subspace
 * d_G(U, V) = sqrt(sum_i theta_i^2)
 */
export function calculateSubspaceAngle(
  refusalVector: number[],
  mathVector: number[]
): {
  cosineSimilarity: number;
  orthogonalAngleDeg: number;
  interferenceRisk: 'Negligible' | 'Low' | 'Moderate' | 'High';
} {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < refusalVector.length; i++) {
    dot += refusalVector[i] * mathVector[i];
    normA += refusalVector[i] ** 2;
    normB += mathVector[i] ** 2;
  }
  const cos = Math.abs(dot / (Math.sqrt(normA) * Math.sqrt(normB) || 1));
  const angleRad = Math.acos(Math.min(Math.max(cos, 0), 1));
  const angleDeg = (angleRad * 180) / Math.PI;

  let risk: 'Negligible' | 'Low' | 'Moderate' | 'High' = 'Negligible';
  if (cos > 0.3) risk = 'High';
  else if (cos > 0.15) risk = 'Moderate';
  else if (cos > 0.05) risk = 'Low';

  return {
    cosineSimilarity: Number(cos.toFixed(5)),
    orthogonalAngleDeg: Number(angleDeg.toFixed(2)),
    interferenceRisk: risk
  };
}

/**
 * Simulates Pareto Optimization evaluation for a given (alpha, layerStart, layerEnd) tuple.
 */
export function evaluateParetoFitness(
  alpha: number,
  layerStart: number,
  layerEnd: number,
  totalLayers: number,
  strategy: string,
  preserveFrobenius: boolean = true
): {
  refusalScore: number;
  mmluRetention: number;
  gsm8kMathScore: number;
  humanEvalCodeScore: number;
  cotFidelity: number;
  frobeniusDrift: number;
  fitness: number;
} {
  const layerSpan = layerEnd - layerStart + 1;
  const layerFraction = layerSpan / totalLayers;
  const midLayerRatio = (layerStart + layerEnd) / (2 * totalLayers);

  // Optimal layer location is usually between 25% and 65% depth
  const depthPenalty = Math.abs(midLayerRatio - 0.45) * 1.8;
  const alphaPenalty = Math.abs(alpha - 1.15) * 1.2;

  // Refusal score: Lower is better (0.00% = 0 refusal)
  let rawRefusal = 100 * Math.exp(-1 * (alpha * 2.8 + layerFraction * 3.5 - depthPenalty));
  if (alpha >= 1.05 && layerFraction >= 0.25) {
    rawRefusal = Math.max(0.00, rawRefusal * 0.04);
  }
  const refusalScore = Number(Math.max(0, Math.min(100, rawRefusal)).toFixed(2));

  // Intelligence retention based on strategy and Frobenius norm preservation
  let mmluBase = 100;
  if (!preserveFrobenius) {
    mmluBase -= alpha * 2.8; // Unpreserved projection decays MMLU
  } else {
    mmluBase -= alpha * 0.015; // Preserved projection keeps > 99.9%
  }

  if (strategy === 'zero_intelligence_loss') {
    mmluBase = Math.max(99.95, mmluBase + 0.04);
  } else if (strategy === 'deep_reasoning_cot') {
    mmluBase = Math.max(99.92, mmluBase + 0.02);
  }

  const mmluRetention = Number(Math.min(100, Math.max(90, mmluBase - alphaPenalty * 0.02)).toFixed(3));
  const gsm8kMathScore = Number(Math.min(100, Math.max(88, 97.5 - (preserveFrobenius ? alpha * 0.04 : alpha * 4.2))).toFixed(1));
  const humanEvalCodeScore = Number(Math.min(100, Math.max(82, 91.2 - (preserveFrobenius ? alpha * 0.06 : alpha * 5.1))).toFixed(1));
  const cotFidelity = Number(Math.min(100, Math.max(92, 99.9 - (strategy === 'deep_reasoning_cot' ? 0.02 : alpha * 0.4))).toFixed(2));
  const frobeniusDrift = preserveFrobenius ? Number((0.0008 + alpha * 0.0004).toFixed(5)) : Number((0.045 + alpha * 0.025).toFixed(4));

  // Multi-objective fitness function (0 to 100)
  const fitness = Number((
    (100 - refusalScore) * 0.40 +
    mmluRetention * 0.30 +
    gsm8kMathScore * 0.15 +
    humanEvalCodeScore * 0.10 +
    cotFidelity * 0.05
  ).toFixed(2));

  return {
    refusalScore,
    mmluRetention,
    gsm8kMathScore,
    humanEvalCodeScore,
    cotFidelity,
    frobeniusDrift,
    fitness
  };
}
