'use strict';

class Song {
  constructor(songData) {
    this.title = songData.title;
    this.artist = songData.artist;
    this.name = songData.name;
    this.dedication = songData.dedication;
  }
}
class FormState {
  constructor({ song, request, loading, submitted, error } = {}) {
    this.song = song || null;
    this.request = request || null;
    this.loading = loading || false;
    this.submitted = submitted || false;
    this.error = error || null;
    this.events = {};
  }
  subscribe = (event, callback) => {
    this.events[event] = callback;
  }
  onSubmit = (song) => {
    this.set({ song: song, loading: true });
    if (this.events.submit) this.events.submit(song);
  }
  onSuccess = (response) => {
    let { requestId } = typeof response === 'string'
      ? JSON.parse(response).$metadata
      : response.$metadata;
    this.handleRequest(requestId);
    if (this.events.success) this.events.success(response);
  }
  onFail = (error) => {
    this.set({ error });
    if (this.events.fail) this.events.fail(error);
  }
  onComplete = () => {
    this.set({ loading: false, submitted: true });
    if (this.events.complete) this.events.complete();
  }
  handleRequest = (requestId) => {
    const payload = {
      id: requestId,
      timestamp: new Date().toISOString(),
    }
    this.set({ request: payload });
  }
  save = () =>{
    window.localStorage.setItem('mcd-state', JSON.stringify({
      song: this.song,
      request: this.request,
      loading:  this.loading,
      submitted: this.submitted,
      error: this.error
    }));
  }
  load = () =>{
    const formState = this.get();
    if (formState) this.set(formState);
  }
  clear = () => {
    window.localStorage.removeItem('mcd-state');
  }
  set = (state) => {
    if (state.song) this.song = state.song;
    if (state.request) this.request = state.request;
    if (state.loading) this.loading = state.loading; 
    if (state.submitted) this.submitted = state.submitted;
    if (state.error) this.error = state.error;
    this.save();
  }
  reset = () => {
    this.set({
      song: null,
      request: null,
      loading: false,
      submitted: false,
      error: null
    });
  }
  get = () => {
    return JSON.parse(window.localStorage.getItem('mcd-state'));
  }
}
