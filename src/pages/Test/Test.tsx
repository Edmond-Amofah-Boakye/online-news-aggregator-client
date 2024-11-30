// import React from 'react'

const Test = () => {
  //   const data = [
  //     { name: "Edmond" },
  //     { name: "Amofah" },
  //     { name: "Boakye" },
  //     { name: "Blaise" },
  //   ];

  const entries = [
    {
      type: "Yoga",
      duration: "< 30 minutes",
      frequency: "1 - 3 times a day",
    },
    {
      type: "Cardio",
      duration: "< 60 minutes",
      frequency: "once a day",
    },
    {
      type: "Aerobic",
      duration: "< 60 minutes",
      frequency: "once a day",
    },
  ];

  //   const filteredData = data.find(item => item.name === "Edmond")?.name

  const dt =
    Array.isArray(entries) &&
    entries.reduce((acc: any, curr: any) => {
      acc[curr?.type] = {
        duration: curr?.duration,
        frequency: curr?.frequency,
      };
      return acc;
    }, {});



  const transformed = (data: Record<string, {duration: string, frequency: string}>) => {
    if (!data){
        return {}
    }
    const entries = Object.keys(data).map((item) => ({
      item,
      duration: dt[item]?.duration,
      frequency: dt[item]?.frequency,
    }));

    return { entries }
  };

//   console.log(transformed(dt));

const findme = ["Yoga", "Cardio"]
// const fxs = entries.filter(item => findme.includes(item.type)).map(item => item.type)
// console.log(fxs)


const fsg = findme.some(item => item == "Cardio")
console.log(fsg)







































  return <div>Test</div>;
};

export default Test;
