import React, { ComponentType, createContext, useContext } from 'react';

type Store<V> = {
    Provider: ComponentType<{ children: React.ReactNode }>;
    useStore: () => V;
};

export function createStore<V, State = void>(
    useHook: (initialState?: State) => V,
    initialState?: State,
): Store<V> {
    const Context = createContext<V | null>(null);

    function Provider(props: { children: React.ReactNode }): JSX.Element {
        const value = useHook(initialState);
        return <Context.Provider value={value}>{props.children}</Context.Provider>;
    }

    function useStore(): V {
        const value = useContext(Context);
        if (value === null) {
            throw new Error('Component must be wrapped with <Provider>');
        }
        return value;
    }
    return {
        Provider,
        useStore,
    };
}
