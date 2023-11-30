// 1st iteration with mock data
const funds = [
  {
    id: 1,
    name: "Fund 1",
    description: "Description of Fund 1",
    investmentType: "Equity",
    performanceHistory: [10, 12, 8, 15, 10],
    nav: 100,
  },
  {
    id: 2,
    name: "Fund 2",
    description: "Description of Fund 2",
    investmentType: "Fixed Income",
    performanceHistory: [5, 8, 6, 10, 7],
    nav: 150,
  },
];

export const getFunds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(funds);
    }, 500);
  });
};

export const getFundDetails = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fund = funds.find((fund) => fund.id === id);
      resolve(fund);
    }, 500);
  });
};
