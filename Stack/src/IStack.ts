export interface IStack<T> {
    push: (value: T) => void;

    pop: (index: number) => void;

    valueOf: (index: number) => any;

    lenght: () => number;
}