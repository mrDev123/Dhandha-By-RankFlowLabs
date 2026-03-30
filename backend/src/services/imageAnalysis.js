import sharp from 'sharp';

function clampScore(value) {
  return Math.max(0, Math.min(1, Number(value.toFixed(3))));
}

function getBrightnessScore(meanLuma) {
  // ideal brightness range for business listing photos
  const idealMin = 105;
  const idealMax = 190;

  if (meanLuma >= idealMin && meanLuma <= idealMax) {
    return 1;
  }

  const distance = meanLuma < idealMin ? idealMin - meanLuma : meanLuma - idealMax;
  return clampScore(1 - distance / 120);
}

function getBlurScore(variance) {
  // higher local variance generally means sharper edges
  const minVar = 12;
  const maxVar = 140;

  if (variance <= minVar) return 0;
  if (variance >= maxVar) return 1;

  return clampScore((variance - minVar) / (maxVar - minVar));
}

function getFramingScore(grayPixels, width, height) {
  // Compare edge energy in center vs border regions
  const centerLeft = Math.floor(width * 0.2);
  const centerRight = Math.floor(width * 0.8);
  const centerTop = Math.floor(height * 0.2);
  const centerBottom = Math.floor(height * 0.8);

  let centerEnergy = 0;
  let borderEnergy = 0;

  for (let y = 1; y < height; y += 1) {
    for (let x = 1; x < width; x += 1) {
      const idx = y * width + x;
      const gx = Math.abs(grayPixels[idx] - grayPixels[idx - 1]);
      const gy = Math.abs(grayPixels[idx] - grayPixels[idx - width]);
      const edge = gx + gy;

      const inCenter = x >= centerLeft && x <= centerRight && y >= centerTop && y <= centerBottom;
      if (inCenter) {
        centerEnergy += edge;
      } else {
        borderEnergy += edge;
      }
    }
  }

  const total = centerEnergy + borderEnergy;
  if (!total) return 0;

  const centerRatio = centerEnergy / total;
  // ideal: meaningful detail in center while not clipping too much to edges
  const score = 1 - Math.abs(centerRatio - 0.62) / 0.62;
  return clampScore(score);
}

function buildSuggestions(metrics) {
  const suggestions = [];

  if (metrics.brightnessScore < 0.7) {
    suggestions.push('Adjust lighting: avoid dark shadows and reduce harsh backlight.');
  }

  if (metrics.blurScore < 0.7) {
    suggestions.push('Photo looks blurry: hold steady, clean lens, or retake with better focus.');
  }

  if (metrics.framingScore < 0.7) {
    suggestions.push('Improve framing: center storefront/signage and keep vertical lines straight.');
  }

  if (suggestions.length === 0) {
    suggestions.push('Great shot. Minor tweaks only: try one wider angle for context.');
  }

  return suggestions;
}

export async function analyzeImageQuality(buffer) {
  const { data, info } = await sharp(buffer)
    .grayscale()
    .resize(640, 640, { fit: 'inside', withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = data;
  const { width, height } = info;

  let sum = 0;
  let gradientSum = 0;
  let gradientSqSum = 0;
  let gradientCount = 0;

  for (let y = 1; y < height; y += 1) {
    for (let x = 1; x < width; x += 1) {
      const idx = y * width + x;
      const value = pixels[idx];
      sum += value;

      const gx = Math.abs(value - pixels[idx - 1]);
      const gy = Math.abs(value - pixels[idx - width]);
      const grad = gx + gy;

      gradientSum += grad;
      gradientSqSum += grad * grad;
      gradientCount += 1;
    }
  }

  const pixelCount = (width - 1) * (height - 1);
  const meanBrightness = pixelCount > 0 ? sum / pixelCount : 0;
  const meanGrad = gradientCount > 0 ? gradientSum / gradientCount : 0;
  const gradVariance = gradientCount > 0 ? gradientSqSum / gradientCount - meanGrad * meanGrad : 0;

  const metrics = {
    brightnessScore: getBrightnessScore(meanBrightness),
    blurScore: getBlurScore(gradVariance),
    framingScore: getFramingScore(pixels, width, height)
  };

  return {
    metrics,
    suggestions: buildSuggestions(metrics)
  };
}
