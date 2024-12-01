const useTraverseTree = () => {
  function insertNode(data, folderid, item, isFolder) {
    if (data.id === folderid && data.isFolder) {
      const newNode = {
        id: new Date().getTime(),
        name: item,
        isFolder,
        items: [],
      };

      return {
        ...data,
        items: [...data.items, newNode], // Add the new node at the end
      };
    }

    if (data.items) {
      const updatedItems = data.items.map((child) =>
        insertNode(child, folderid, item, isFolder)
      );

      return {
        ...data,
        items: updatedItems,
      };
    }

    // Return unchanged node if no match
    return data;
  }
  return { insertNode };
};

export default useTraverseTree;
