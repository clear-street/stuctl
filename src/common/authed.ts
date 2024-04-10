export const authed = (func: (...args: any[]) => any) => {
  return async (...args: any[]) => {
    const auth = process.env.AUTH;
    if (!auth) {
      console.error('error: you must run "stuctl login" first');
      return;
    }

    return await func(auth, ...args);
  };
};
