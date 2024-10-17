import i18next from 'i18next';

const i18nOn = (event: string, listener: (...args: any[]) => void) => {
  i18next.on(event, listener);
  return {
    destroy: () => {
      i18next.off(event, listener);
    }
  };
};

export default i18nOn;
