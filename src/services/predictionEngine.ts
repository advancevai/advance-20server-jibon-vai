import { DrawIssue, EngineState, HistoryRecord, MarketType, PredictionResult } from '../types';

const Big = 'Big';
const Small = 'Small';
const Even = 'Even';
const Odd = 'Odd';
const Red = 'Red';
const Green = 'Green';

function getPeriodDigits(period: string): number[] {
  return period.slice(-4).split('').map(Number);
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getColorChar(num: number): 'G' | 'R' {
  return num % 2 === 1 ? 'G' : 'R';
}

export function predictBigSmall(
  period: string,
  engineIndex: number,
  history: DrawIssue[] = []
): PredictionResult {
  const digits = getPeriodDigits(period);
  const p1 = digits[digits.length - 1] ?? 0;
  const p2 = digits[digits.length - 2] ?? 0;
  const p3 = digits[digits.length - 3] ?? 0;
  const p4 = digits[digits.length - 4] ?? 0;

  const lastNum = history.length > 0 ? history[0].number : 0;
  const prevNumbers = history.slice(0, 5).map((x) => x.number);
  const prevBS = history.slice(0, 3).map((x) => (x.number >= 5 ? 'B' : 'S'));

  let calcNumber: number;
  let type: 'Big' | 'Small';

  switch (engineIndex) {
    case 0: {
      const sum = p3 + p2 + p1;
      calcNumber = sum % 10;
      type = sum <= 13 ? Small : Big;
      break;
    }
    case 1: {
      const diff = Math.abs(p2 - p1);
      calcNumber = diff;
      type = diff % 2 === 0 ? Small : Big;
      break;
    }
    case 2: {
      const mult = p1 * 2;
      calcNumber = mult % 10;
      type = mult % 10 < 5 ? Small : Big;
      break;
    }
    case 3: {
      const weighted = p3 * 1 + p2 * 2 + p1 * 3;
      calcNumber = weighted % 10;
      type = weighted % 10 < 5 ? Small : Big;
      break;
    }
    case 4: {
      const sq = p1 * p1;
      calcNumber = sq % 10;
      type = (sq % 10) % 2 === 0 ? Small : Big;
      break;
    }
    case 5: {
      const mixed = p4 * 1 + p3 * 1 + p2 * 2 + p1 * 3;
      calcNumber = mixed % 10;
      type = (mixed % 10) % 2 === 0 ? Small : Big;
      break;
    }
    case 6: {
      const avg = (lastNum + p1) / 2;
      calcNumber = Math.round(avg) % 10;
      type = Number.isInteger(avg) ? Big : Small;
      break;
    }
    case 7: {
      const combined = (lastNum + p1) % 10;
      calcNumber = combined;
      type = combined < 5 ? Small : Big;
      break;
    }
    case 8: {
      const nextN = lastNum + 1;
      calcNumber = nextN % 10;
      type = nextN % 2 === 0 ? Small : Big;
      break;
    }
    case 9: {
      const formula = p2 * 3 + p1;
      calcNumber = formula % 10;
      type = (formula % 10) % 2 === 0 ? Big : Small;
      break;
    }
    case 10: {
      const cube = (lastNum * lastNum * lastNum) % 10;
      calcNumber = cube;
      type = cube > lastNum ? Big : Small;
      break;
    }
    case 11: {
      const root = Math.sqrt(lastNum > 0 ? lastNum : 1);
      const digit = Math.floor((root * 10) % 10);
      calcNumber = digit;
      type = digit >= 5 ? Big : Small;
      break;
    }
    case 12: {
      const mean =
        prevNumbers.length > 0
          ? prevNumbers.reduce((a, b) => a + b, 0) / prevNumbers.length
          : 4.5;
      calcNumber = Math.round(mean) % 10;
      type = mean > 4.5 ? Big : Small;
      break;
    }
    case 13: {
      const golden = Math.floor(lastNum * 1.618);
      calcNumber = golden % 10;
      type = golden % 2 === 0 ? Small : Big;
      break;
    }
    case 14: {
      const parity = (p1 % 2) + (lastNum % 2);
      calcNumber = parity;
      type = parity === 0 || parity === 2 ? Small : Big;
      break;
    }
    case 15: {
      if (prevBS.length >= 3) {
        const pattern = prevBS.join('');
        if (pattern === 'BSB') type = Small;
        else if (pattern === 'SBS') type = Big;
        else type = prevBS[0] === 'B' ? Small : Big;
      } else {
        type = lastNum >= 5 ? Small : Big;
      }
      calcNumber = type === Big ? 7 : 3;
      break;
    }
    case 16: {
      if (lastNum === 0 || lastNum === 5) {
        type = lastNum >= 5 ? Small : Big;
      } else {
        type = lastNum >= 5 ? Big : Small;
      }
      calcNumber = type === Big ? 6 : 4;
      break;
    }
    case 17: {
      const s17 = p1 + lastNum;
      calcNumber = s17 % 10;
      type = (s17 % 10) >= 5 ? Big : Small;
      break;
    }
    case 18: {
      const m18 = p1 * (lastNum || 1);
      calcNumber = m18 % 10;
      type = (m18 % 10) % 2 === 0 ? Small : Big;
      break;
    }
    case 19: {
      const x19 = p1 ^ lastNum;
      calcNumber = x19 % 10;
      type = x19 >= 5 ? Big : Small;
      break;
    }
    default:
      calcNumber = 5;
      type = Big;
  }

  const confidence = 75 + ((calcNumber * 3 + engineIndex * 7) % 24);
  return {
    type,
    calcNumber,
    logicName: `Logic ${engineIndex + 1}`,
    confidence,
  };
}

export function predictRedGreen(
  period: string,
  engineIndex: number,
  history: DrawIssue[] = []
): PredictionResult {
  const digits = getPeriodDigits(period);
  const p1 = digits[digits.length - 1] ?? 0;
  const p2 = digits[digits.length - 2] ?? 0;
  const p3 = digits[digits.length - 3] ?? 0;

  const h0 = history.length > 0 ? history[0].number : 0;
  const h1 = history.length > 1 ? history[1].number : 0;
  const h2 = history.length > 2 ? history[2].number : 0;

  const prevNums = history.slice(0, 5).map((x) => x.number);
  const colors = history.slice(0, 6).map((x) => getColorChar(x.number));

  const getStreak = (c: 'R' | 'G') => {
    let s = 0;
    for (const item of colors) {
      if (item === c) s++;
      else break;
    }
    return s;
  };

  const rStreak = getStreak('R');
  const gStreak = getStreak('G');

  let calcNumber: number;
  let type: 'Red' | 'Green';

  switch (engineIndex) {
    case 0:
      if (rStreak >= 2) {
        type = Green;
        calcNumber = 2;
      } else if (gStreak >= 2) {
        type = Red;
        calcNumber = 1;
      } else {
        type = h0 % 2 === 0 ? Green : Red;
        calcNumber = h0 % 10;
      }
      break;
    case 1: {
      const pat = colors.slice(0, 3).join('');
      if (pat === 'RGR') {
        type = Green;
        calcNumber = 4;
      } else if (pat === 'GRG') {
        type = Red;
        calcNumber = 3;
      } else if (pat.startsWith('RR')) {
        type = Green;
        calcNumber = 6;
      } else if (pat.startsWith('GG')) {
        type = Red;
        calcNumber = 5;
      } else {
        type = h0 % 2 === 0 ? Red : Green;
        calcNumber = p1;
      }
      break;
    }
    case 2: {
      const evens = prevNums.filter((n) => n % 2 === 0).length;
      type = evens > 2 ? Red : Green;
      calcNumber = evens;
      break;
    }
    case 3: {
      const weighted = (h0 % 2) * 3 + (h1 % 2) * 2 + (h2 % 2) * 1;
      type = weighted >= 3 ? Green : Red;
      calcNumber = weighted % 10;
      break;
    }
    case 4:
      type = colors[0] === 'R' ? Green : Red;
      calcNumber = p1;
      break;
    case 5: {
      const p1Even = p1 % 2 === 0;
      const h0Even = h0 % 2 === 0;
      if (p1Even === h0Even) {
        type = h0Even ? Red : Green;
      } else {
        type = h0Even ? Green : Red;
      }
      calcNumber = (p1 + h0) % 10;
      break;
    }
    case 6: {
      const sum = h0 + h1 + h2;
      const m = sum % 3;
      if (m === 0) type = Green;
      else if (m === 1) type = Red;
      else type = h0 % 2 === 0 ? Green : Red;
      calcNumber = sum % 10;
      break;
    }
    case 7:
      if (rStreak >= 3) {
        type = Green;
        calcNumber = 8;
      } else if (gStreak >= 3) {
        type = Red;
        calcNumber = 7;
      } else {
        const val = (p1 + p2 + h0) % 4;
        type = val < 2 ? Green : Red;
        calcNumber = val;
      }
      break;
    case 8: {
      const v = (h0 * 1 + h1 * 1 + h2 * 2) % 10;
      calcNumber = v;
      type = v % 2 === 0 ? Green : Red;
      if (rStreak >= 2) type = Green;
      if (gStreak >= 2) type = Red;
      break;
    }
    case 9: {
      const s4 = colors.slice(0, 4);
      const rCount = s4.filter((c) => c === 'R').length;
      const gCount = s4.filter((c) => c === 'G').length;
      if (rCount >= 3) {
        type = Green;
        calcNumber = 0;
      } else if (gCount >= 3) {
        type = Red;
        calcNumber = 9;
      } else {
        type = colors[0] === 'R' ? Green : Red;
        calcNumber = (h0 + p1) % 10;
      }
      break;
    }
    case 10: {
      const v10 = (p1 * 2 + h0) % 10;
      calcNumber = v10;
      type = v10 % 2 === 0 ? Red : Green;
      if (rStreak >= 2) type = Green;
      if (gStreak >= 2) type = Red;
      break;
    }
    case 11: {
      const v11 = Math.abs(h0 - h1) % 10;
      calcNumber = v11;
      type = v11 % 2 === 0 ? Red : Green;
      if (rStreak >= 3) type = Green;
      if (gStreak >= 3) type = Red;
      break;
    }
    case 12: {
      const v12 = (p3 + p2 * 2 + p1 * 3) % 10;
      calcNumber = v12;
      type = (v12 + h0) % 2 === 0 ? Red : Green;
      break;
    }
    case 13: {
      calcNumber = (h0 + 1) % 10;
      type = calcNumber % 2 === 0 ? Red : Green;
      if (colors.slice(0, 2).join('') === 'RR') type = Green;
      if (colors.slice(0, 2).join('') === 'GG') type = Red;
      break;
    }
    case 14: {
      calcNumber = (h0 * h0 * h0) % 10;
      type = calcNumber % 2 === 0 ? Red : Green;
      if (rStreak >= 2) type = Green;
      if (gStreak >= 2) type = Red;
      break;
    }
    case 15: {
      const m15 =
        prevNums.length > 0
          ? prevNums.reduce((a, b) => a + b, 0) / prevNums.length
          : 4.5;
      calcNumber = Math.round(m15) % 10;
      type = m15 > 4.5 ? Green : Red;
      break;
    }
    case 16: {
      const v16 = (p1 % 2) + (h0 % 2) + (h1 % 2);
      calcNumber = v16;
      type = v16 >= 2 ? Green : Red;
      break;
    }
    case 17: {
      const v17 = (p1 ^ h0) % 10;
      calcNumber = v17;
      type = v17 % 2 === 0 ? Red : Green;
      if (rStreak >= 2) type = Green;
      break;
    }
    case 18: {
      const v18 = (h0 * p1 + p2) % 10;
      calcNumber = v18;
      type = v18 % 2 === 0 ? Red : Green;
      if (gStreak >= 2) type = Red;
      break;
    }
    case 19: {
      calcNumber = (h0 + p2 + p3) % 10;
      const gC = colors.slice(0, 3).filter((c) => c === 'G').length;
      type = gC >= 2 ? Red : Green;
      break;
    }
    default:
      calcNumber = 5;
      type = Red;
  }

  const confidence = 78 + ((calcNumber * 3 + engineIndex * 5) % 20);
  return {
    type,
    calcNumber,
    logicName: `Logic ${engineIndex + 1}`,
    confidence,
  };
}

export function predictEvenOdd(period: string, engineIndex: number): PredictionResult {
  const seed = `${period}-SIG${engineIndex}-FIXED`;
  const hash = hashString(seed);
  const calcNumber = hash % 10;
  const confidence = 75 + (hash % 24);
  const type = calcNumber % 2 === 0 ? Even : Odd;

  return {
    type,
    calcNumber,
    logicName: `Logic ${engineIndex + 1}`,
    confidence,
  };
}

export function generatePrediction(
  period: string,
  engineIndex: number,
  market: MarketType,
  history: DrawIssue[] = []
): PredictionResult {
  switch (market) {
    case 'big-small':
      return predictBigSmall(period, engineIndex, history);
    case 'red-green':
      return predictRedGreen(period, engineIndex, history);
    case 'even-odd':
      return predictEvenOdd(period, engineIndex);
  }
}

export function calculateHistoryForEngine(
  history: DrawIssue[],
  engineIndex: number,
  market: MarketType,
  limit: number = 10
): {
  period: string;
  prediction: string;
  predictedNumber: number;
  actualNumber: number;
  confidence: number;
  result: 'WIN' | 'LOSS';
}[] {
  const results = [];
  const maxLen = Math.min(limit, history.length - 1);

  for (let i = 0; i < maxLen; i++) {
    const current = history[i];
    const pastSlice = history.slice(i + 1);
    const pred = generatePrediction(current.period, engineIndex, market, pastSlice);
    const actualNum = current.number;

    let isWin = false;
    let predLabel = '';
    let actualLabel = '';

    if (market === 'even-odd') {
      predLabel = pred.type === Even ? 'EVEN' : 'ODD';
      actualLabel = actualNum % 2 === 0 ? 'EVEN' : 'ODD';
      isWin = predLabel === actualLabel;
    } else if (market === 'red-green') {
      predLabel = pred.type === Red ? 'RED' : 'GREEN';
      actualLabel = getColorChar(actualNum) === 'G' ? 'GREEN' : 'RED';
      isWin = predLabel === actualLabel;
    } else {
      predLabel = pred.type === Big ? 'BIG' : 'SMALL';
      actualLabel = actualNum >= 5 ? 'BIG' : 'SMALL';
      isWin = predLabel === actualLabel;
    }

    results.push({
      period: current.period,
      prediction: predLabel,
      predictedNumber: pred.calcNumber,
      actualNumber: actualNum,
      confidence: pred.confidence || 80,
      result: isWin ? ('WIN' as const) : ('LOSS' as const),
    });
  }

  return results;
}

export function buildEnginesForMode(
  currentDraws: DrawIssue[],
  accumulatedDraws: DrawIssue[],
  market: MarketType
): EngineState[] {
  const engines: EngineState[] = Array.from({ length: 20 }, (_, idx) => ({
    id: idx + 1,
    name: `Logic ${idx + 1}`,
    wins: 0,
    losses: 0,
    currentPrediction: null,
    history: [],
    consecutiveWins: 0,
    maxConsecutiveWins: 0,
  }));

  if (!currentDraws.length) return engines;

  engines.forEach((engine, idx) => {
    const calculatedHistory = calculateHistoryForEngine(currentDraws, idx, market, 10);
    const mapped: HistoryRecord[] = calculatedHistory.map((item) => ({
      period: item.period,
      prediction:
        item.prediction === 'BIG'
          ? 'Big'
          : item.prediction === 'SMALL'
          ? 'Small'
          : item.prediction === 'RED'
          ? 'Red'
          : item.prediction === 'GREEN'
          ? 'Green'
          : item.prediction === 'EVEN'
          ? 'Even'
          : 'Odd',
      actual:
        market === 'red-green'
          ? item.actualNumber % 2 === 1
            ? 'Green'
            : 'Red'
          : market === 'even-odd'
          ? item.actualNumber % 2 === 0
            ? 'Even'
            : 'Odd'
          : item.actualNumber >= 5
          ? 'Big'
          : 'Small',
      result: item.actualNumber,
      status: item.result,
      predictedNumber: item.predictedNumber,
    }));

    engine.history = mapped;
    engine.wins = mapped.filter((x) => x.status === 'WIN').length;
    engine.losses = mapped.filter((x) => x.status === 'LOSS').length;

    let currentStreak = 0;
    for (const h of mapped) {
      if (h.status === 'WIN') currentStreak++;
      else break;
    }
    engine.consecutiveWins = currentStreak;
    engine.maxConsecutiveWins = Math.max(engine.maxConsecutiveWins, currentStreak);
  });

  const referenceHistory = accumulatedDraws.length > 0 ? accumulatedDraws : currentDraws;
  if (referenceHistory.length > 0) {
    const latestPeriod = referenceHistory[0].period;
    let nextPeriodStr: string;
    try {
      nextPeriodStr = (BigInt(latestPeriod) + 1n).toString();
    } catch {
      nextPeriodStr = String(parseInt(latestPeriod, 10) + 1);
    }

    engines.forEach((engine, idx) => {
      engine.currentPrediction = generatePrediction(nextPeriodStr, idx, market, referenceHistory);
    });
  }

  return engines;
}
