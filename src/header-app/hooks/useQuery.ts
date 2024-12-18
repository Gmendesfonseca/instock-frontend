import { useMemo, useState } from 'react';

export function useQuery() {
  const [forceState, setForceState] = useState(0);

  function updateState() {
    setForceState(old => old + 1);
  }

  function removeParam(key: string) {
    const regex = new RegExp(`${key}=.+?(?=&|$)`);
    const url = window.location.href
      .replace(regex, '')
      .replace(/&&/, '&')
      .replace(/(\?&)/g, '?')
      .replace(/&$/, '');

    window.history.pushState('', '', url);
  }

  const handler = useMemo(() => {
    return {
      get(queryName: string) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(queryName);
      },
      delete(params: string | string[]) {
        if (typeof params === 'string') {
          removeParam(params);
          return;
        }

        params.forEach(removeParam);
        updateState();
      },
    };
  }, [forceState]); // eslint-disable-line

  return handler;
}
