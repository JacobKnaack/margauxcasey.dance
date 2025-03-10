describe('Entities', () => {
  const formState = new FormState();
  it('should have a song property', () => {
    expect(formState.song).to.equal(null);
  });
  it('should have a request property', () => {
    expect(formState.request).to.equal(null);
  });
  it('should have a loading property', () => {
    expect(formState.loading).to.equal(false);
  });
  it('should have a submitted property', () => {
    expect(formState.submitted).to.equal(false);
  });
  it('should have an error property', () => {
    expect(formState.error).to.equal(null);
  });
  it('should have an events property', () => {
    expect(formState).to.have.property('events');
  });
});