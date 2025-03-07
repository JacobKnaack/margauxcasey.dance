class Song {
  constructor(songData) {
    this.title = songData.title;
    this.artist = songData.artist;
    this.name = songData.name;
    this.dedication = songData.dedication;
  }
}
class FormState {
  constructor() {
    this.song = null;
    this.loading = false;
    this.submitted = false;
    this.error = null;
  }
  onSubmit(song) {
    this.song = song;
    this.loading = true;
  }
  onSuccess(data) {
    this.save(data);
  }
  onFail(error) {
    this.error = error;
  }
  onComplete() {
    this.loading = false;
    this.submitted = true;
  }
  save() {
    const payload = {
      submission: this.song,
      timestamp: new Date().toISOString(),
    }
    window.localStorage.setItem('mcd-state', JSON.stringify(payload));
  }
  clear() {
    window.localStorage.removeItem('mcd-state');
  }
  get() {
    return window.localStorage.getItem('mcd-state');
  }
}