// Mock данные телефонных номеров победителей.
const getMockWinnersData = () => {
  const getWinners = () => {
    const VALUE_OF_WINNERS = 20;
    const winners = new Set();
    while (winners.size < VALUE_OF_WINNERS) {
      const newWinnersGroupArray = Math.random().toString(10).match(/(\d{4})(?=(\d{4})|$)/g);
      for (let i = 0; i < newWinnersGroupArray.length && winners.size < VALUE_OF_WINNERS; i++) {
        winners.add(newWinnersGroupArray[i]);
      }
    }
    return winners;
  };
  const getWinnersPhoneNumbers = () => {
    const winners = getWinners();
    const winnersArray = [];
    winners.forEach((value) => {
      winnersArray.push(`7XXXXXX${value}`);
    });
    return winnersArray;
  };
  // Mock данные победителей.
  const PRIZE_DRAW_WEEKS = 7;
  const allWinnersMockData = [];
  for (let i = 0; i < PRIZE_DRAW_WEEKS; i++) {
    const weekWinners = getWinnersPhoneNumbers().map((winnerPhone) => {
      return {
        name: 'Владислав',
        phone: winnerPhone,
        prize: 'Сертификат на покупки в «Пятёрочке»',
      };
    });
    allWinnersMockData.push(weekWinners);
  }
  return allWinnersMockData;
};

export {getMockWinnersData};
