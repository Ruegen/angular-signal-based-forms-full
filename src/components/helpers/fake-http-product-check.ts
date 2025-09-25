function fakeHttpProductCheck(productId: string | undefined, success: boolean = true): Promise<boolean> {
  if(!productId) {
	return Promise.reject(false);
  }
  return new Promise((resolve) => {
	setTimeout(() => {
		console.log('fetching product id', productId)
	  resolve(success);
	}, 3000); // Simulate network delay
  });
}

export {fakeHttpProductCheck};