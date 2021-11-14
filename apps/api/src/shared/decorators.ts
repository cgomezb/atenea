// eslint-disable-next-line @typescript-eslint/ban-types
export const Delay = (ms: number) => (target: Object, key: string, descriptor: PropertyDescriptor) => {
  const originalMethod = descriptor.value;
  descriptor.value = async function (...args) {
    const timeout = (time: number) => new Promise((resolve) => setTimeout(resolve, time));
    await timeout(ms);
    const result = originalMethod.apply(this, args);
    return result;
  };

  return descriptor;
}
