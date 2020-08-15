declare interface Preload {
    fetch(list: string[]): Promise<void>,
    cancel(): void,
    loaded: boolean,
    onprogress: (event: {progress: number}) => void,
    oncomplete: () => void,
    onfetched: () => void,
    onerror: () => void,
    oncancel: () => void,
}

declare function Preload(options?: any): Preload