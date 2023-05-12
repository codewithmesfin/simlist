const groupData = {
  group(data) {
    // return data.groupByToMap((item) => {
    //   return item.category.id;
    // });
    const result = data.reduce(
      (group, arr) => {
        const { categoryId } = arr;

        group[categoryId] = group[categoryId] ?? [];

        group[categoryId].push(arr);

        return group;
      },

      {}
    );
    let items = [];
    for (const key in result) {
      let item = {
        id: key,
        title: result[key][0].category.name,
        items: result[key].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        ),
      };
      items.push(item);
    }

    return items;
  },
};

export default groupData;
