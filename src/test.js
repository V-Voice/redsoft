async function fetchData() {
    try {
      const response = await fetch('data.js', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/javascript'
        }
      });
  
      if (!response.ok) {
        throw new Error('Error occurred while fetching data');
      }
  
      const data = await response.text();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  fetchData();