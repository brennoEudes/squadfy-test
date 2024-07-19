export const fetchPayloadData = async () => {
    const response = await fetch('/api/payload');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  };
  