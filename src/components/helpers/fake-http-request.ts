function fakeHttpRequest(payload: any, fail = false) {
  console.log('Sending payload', payload);
  return new Promise((resolve, reject) => {
    if (fail) {
      reject('Request failed');
    }
    setTimeout(() => {
      console.log('Submitted payload', payload);
      resolve(true);
    }, 1000);
  });
}

export { fakeHttpRequest };