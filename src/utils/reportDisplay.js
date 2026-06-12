const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const normalizeReport = (payload) =>
  payload?.report ?? payload?.data?.report ?? payload?.data ?? payload;

export const findValue = (source, keys = [], seen = new WeakSet()) => {
  if (source === null || source === undefined) return undefined;
  if (seen.has(source)) return undefined;
  if (!isObject(source) && !Array.isArray(source)) return undefined;

  seen.add(source);

  if (Array.isArray(source)) {
    for (const item of source) {
      const result = findValue(item, keys, seen);
      if (result !== undefined && result !== null) return result;
    }
    return undefined;
  }

  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      if (value !== undefined && value !== null) return value;
    }
  }

  for (const value of Object.values(source)) {
    const result = findValue(value, keys, seen);
    if (result !== undefined && result !== null) return result;
  }

  return undefined;
};

export const getNumber = (source, keys, fallback = 0) => {
  const value = findValue(source, keys);
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^0-9.\-]/g, "");
    const parsed = Number(cleaned);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

export const getString = (source, keys, fallback = "Unknown") => {
  const value = findValue(source, keys);
  if (value === undefined || value === null) return fallback;
  return String(value);
};

export const buildDashboardDisplay = (report) => {
  const normalized = normalizeReport(report);

  return {
    wellnessScore: getNumber(normalized, [
      "wellnessScore",
      "wellness_score",
      "aiWellnessScore",
      "wellness",
      "overallScore",
      "overall_score"
    ]),
    riskLevel: getString(normalized, [
      "riskLevel",
      "risk_level",
      "risk",
      "riskCategory"
    ], "Unknown"),
    biologicalAge: getNumber(normalized, [
      "biologicalAge",
      "biological_age",
      "bioAge",
      "bio_age",
      "age"
    ]),
    longevityIndex: getNumber(normalized, [
      "longevityIndex",
      "longevity_index",
      "longevity",
      "longevity_score"
    ]),
    patientName: getString(normalized, [
      "patientName",
      "patient_name",
      "patient",
      "name"
    ], "Demo Patient"),
    sleepScore: getNumber(normalized, [
      "sleepScore",
      "sleep_score",
      "sleep"
    ]),
    heartScore: getNumber(normalized, [
      "heartScore",
      "heart_score",
      "heart"
    ]),
    stressScore: getNumber(normalized, [
      "stressScore",
      "stress_score",
      "stress"
    ]),
    recoveryScore: getNumber(normalized, [
      "recoveryScore",
      "recovery_score",
      "recovery"
    ]),
    suggestions: getString(normalized, [
      "suggestions",
      "suggestion",
      "recommendations",
      "recommendation",
      "notes"
    ], "No recommendations available"),
    diseaseRisks: getString(normalized, [
      "diseaseRisks",
      "disease_risks",
      "riskFactors",
      "risk_factors",
      "disease_risk",
      "diseaseRisk"
    ], "No disease risks identified"),
    rawReport: normalized
  };
};
