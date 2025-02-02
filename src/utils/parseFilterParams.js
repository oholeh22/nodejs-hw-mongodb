const parseType = (type) => {
    if (typeof type !== 'string') return;

    const control = type.toLowerCase();
    const validTypes = ['work', 'home', 'personal'];

    if (validTypes.includes(control)) {
      return control;
    }

    return undefined;
  };

  const parseIsFavourite = (isFavourite) => {
    if (typeof isFavourite === 'string') {
      const control = isFavourite.toLowerCase();

      if (control === 'true') {
        return true;
      }
      if (control === 'false') {
        return false;
      }
    }
    return undefined;
  };

  export const parseFilterParams = (query) => {
    const { type, isFavourite } = query;

    const parsedType = parseType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);

    return {
      type: parsedType,
      isFavourite: parsedIsFavourite,
    };
  };
