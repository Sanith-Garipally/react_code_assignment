export const calculatePoints = (data=[]) => {
  const total = data.reduce(
    (pre, cur) => {
      pre.points += cur.points;
      return pre;
    },
    { points: 0 }
  );
  return total.points || 0;
};

export const calculateRewardPointsWithSlabs = (amount=0) => {
  let points = 0;
  if (amount > 100) {
    points += 2 * (amount - 100) + 50; // 2 points over $100, plus 1 point for $50-$100
  } else if (amount > 50) {
    points += amount - 50;
  }

  return Math.floor(points);
};
