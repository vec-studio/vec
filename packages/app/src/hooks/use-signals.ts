import { effect, signal } from 'alien-signals'
import { useCallback, useSyncExternalStore } from 'react'

type Signal<T> = ReturnType<typeof signal<T>>
type FunctionValue<T> = (value: T) => T
type Value<T> = T | FunctionValue<T>
type SetState<T> = (value: T) => void

export function useSignal<T>(signal: Signal<T>): [T, SetState<T>] {
  const state = useSyncExternalStore(
    onStoreChange =>
      effect(() => {
        signal()
        onStoreChange()
      }),
    () => signal(),
    () => signal()
  )

  const setState = useCallback(
    (value: Value<T>) => {
      if (typeof value === 'function') signal((value as FunctionValue<T>)(signal()))
      else signal(value)
    },
    [signal]
  )

  return [state, setState] as const
}
