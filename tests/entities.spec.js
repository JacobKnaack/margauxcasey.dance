describe('Entities', () => {
  const testApp = new FormState();

  it('should have a song property', () => {
    expect(testApp.song).to.equal(null);
  });
  it('should have a request property', () => {
    expect(testApp.request).to.equal(null);
  });
  it('should have a loading property', () => {
    expect(testApp.loading).to.equal(false);
  });
  it('should have a submitted property', () => {
    expect(testApp.submitted).to.equal(false);
  });
  it('should have an error property', () => {
    expect(testApp.error).to.equal(null);
  });
  it('should have an events property', () => {
    expect(testApp).to.have.property('events');
  });
  it('should be able to parse a JSON response', () => {
    const response = {
      $metadata: {
        requestId: '12345'
      }
    }
    testApp.onSuccess(JSON.stringify(response));
    expect(testApp.request.id).to.equal('12345');
  });
  it('should be able to receive subscribe to success events', () => {
    const callback = response => {
      expect(response).to.be.an('object');
    }
    const response = {
      $metadata: {
        requestId: '12345'
      }
    }
    testApp.subscribe('success', callback);
    testApp.onSuccess(JSON.stringify(response));
  });
  it('Should call complete event when called with Promise.finally', () => {
    const mockRequest = () => new Promise((resolve, reject) => {
      const payload = JSON.stringify({$metadata: {
        requestId: '12345'
      }});
      resolve(payload);
    });
    const callback = () => {
      expect(testApp.loading).to.equal(true);
      expect(testApp.submitted).to.equal(false);
    }
    testApp.subscribe('submit', callback);
    testApp.onSubmit(new Song('test', 'test', 'test', 'test'));
    mockRequest().then(testApp.onSuccess).finally(testApp.onComplete);
  });
});