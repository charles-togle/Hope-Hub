const setDataToStorage= (key, value) => {
    localStorage.setItem(
      [key],
      JSON.stringify(value),
    );
  };

  export default setDataToStorage