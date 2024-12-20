export const filterResults = (items: string[], searchTerm: string): string[] => {
    return items
      .filter(item => item.toLowerCase().startsWith(searchTerm.toLowerCase()))
      .slice(0, 10);
  };
  