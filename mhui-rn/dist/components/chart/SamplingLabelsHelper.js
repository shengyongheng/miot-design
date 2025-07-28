const samplingLabels = (labels, maxSplitNumber) => {
  if (maxSplitNumber <= 0 || labels.length <= 0) {
    return [];
  }

  if (maxSplitNumber === 1) {
    return [{
      value: labels[0],
      idx: 0
    }];
  }

  const increment = labels.length > maxSplitNumber ? Math.floor(labels.length / (maxSplitNumber - 1)) : 1;
  const sampleSize = Math.min(maxSplitNumber, labels.length);
  const sampledLabels = Array(sampleSize).fill(0).map((_value, idx) => ({
    value: labels[increment * idx],
    idx: increment * idx
  }));

  if (sampledLabels[sampleSize - 1].idx >= labels.length) {
    sampledLabels[sampleSize - 1] = {
      idx: labels.length - 1,
      value: labels[labels.length - 1]
    };
  }

  return sampledLabels;
};

export { samplingLabels };